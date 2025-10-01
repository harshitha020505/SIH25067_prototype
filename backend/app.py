# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from twilio.rest import Client 

# --- LSTM/ML imports are kept, but simplified for this demo context ---
import numpy as np
# NOTE: Using 'from tensorflow.keras...' is fine, assuming you have this library installed.
from tensorflow.keras.models import Sequential 
from tensorflow.keras.layers import LSTM, Dense
from sklearn.preprocessing import MinMaxScaler
# ---------------------------------------------------------------------

app = Flask(__name__)
# CHANGE 1: Kept CORS for frontend-backend communication
CORS(app) 

# =========================================================================
# ⚠ PROTOTYPE HARDCODED TWILIO CREDENTIALS (for demo only)
# =========================================================================
# CHANGE 2: Kept original hardcoded Twilio credentials (MUST BE REPLACED)
TWILIO_ACCOUNT_SID = "ACe113e12727037b86775f531c0f24b8b0"
TWILIO_AUTH_TOKEN = "f2ae51e69f7c775487c65c3590faeca4"
TWILIO_PHONE_NUMBER = "+18145177571"  # your Twilio phone number
# REMOVED: ALERT_PHONE_NUMBER is removed as contacts are now in a dictionary.
# =========================================================================

# Initialize Twilio Client
try:
    client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
except Exception as e:
    print(f"⚠ TWILIO CLIENT INIT ERROR: {e}. Check hardcoded credentials.")
    client = None

# =========================================================================
# CHANGE 3: NEW OFFICER CONTACT MAPPING (Crucial for HPI alert by location)
# This maps the city name from your frontend (HmpiMap.jsx) to the recipient's number.
# =========================================================================
OFFICER_CONTACTS = {
    # NOTE: Replace all these dummy numbers with a Twilio-verified mobile number for testing!
    "Mumbai": "+918977186820",  
    "Hyderabad": "+919494783433",
    "Kolkata": "+919948021183",
    "Delhi": "+918639086087",
    "Chennai": "+918639086087"
}
# =========================================================================

# --- Your existing ML code setup (kept for continuity) ---
historical_data = {
    # Telangana > Hyderabad
    "Hand Pump - Secunderabad": [0.011, 0.012, 0.013, 0.015, 0.014],
    "Community Borewell - Banjara Hills": [0.010, 0.011, 0.012, 0.013, 0.012],

    # West Bengal > Murshidabad
    "Tube Well - Berhampore": [0.012, 0.013, 0.014, 0.016, 0.015],
    "Hand Pump - Jiaganj": [0.013, 0.014, 0.015, 0.017, 0.016],

    # Uttar Pradesh > Ballia
    "Village Borewell 1": [0.010, 0.011, 0.013, 0.014, 0.013],
    "Hand Pump - Bairia": [0.014, 0.015, 0.016, 0.017, 0.018]
}

# Store pre-trained models for each location
models = {}
scalers = {}

def create_lstm_model(input_shape):
    model = Sequential()
    model.add(LSTM(50, activation='relu', input_shape=input_shape))
    model.add(Dense(1))
    model.compile(optimizer='adam', loss='mse')
    return model

def train_models():
    for location, data in historical_data.items():
        data_array = np.array(data).reshape(-1, 1)
        scaler = MinMaxScaler()
        data_scaled = scaler.fit_transform(data_array)
        
        # Prepare LSTM sequences
        X, y = [], []
        for i in range(len(data_scaled)-3):
            X.append(data_scaled[i:i+3])
            y.append(data_scaled[i+3])
        X, y = np.array(X), np.array(y)
        
        # Train model
        model = create_lstm_model((X.shape[1], 1))
        model.fit(X, y, epochs=200, verbose=0)
        
        # Save model and scaler
        models[location] = model
        scalers[location] = scaler

def predict_next_values(location, n_future=5):
    data = np.array(historical_data[location]).reshape(-1, 1)
    scaler = scalers[location]
    data_scaled = scaler.transform(data)
    
    # Start from last 3 points
    input_seq = data_scaled[-3:].reshape(1, 3, 1)
    predictions = []
    
    for _ in range(n_future):
        pred = models[location].predict(input_seq, verbose=0)
        predictions.append(pred[0,0])
        input_seq = np.append(input_seq[:,1:,:], pred.reshape(1,1,1), axis=1)
    
    return scaler.inverse_transform(np.array(predictions).reshape(-1,1)).flatten().tolist()
# ---------------------------------------------------------------------

# =========================================================================
# MODIFIED: Universal Alert Function (Simplified and focused on HPI)
# This replaces your original send_alert function.
# =========================================================================
def send_alert(location, hpi_value):
    """Sends SMS alert for critical HPI values."""
    if not client:
        return None, "Twilio client not initialized."

    # 1. Get the recipient number
    recipient_number = OFFICER_CONTACTS.get(location)
    if not recipient_number:
        return None, f"No officer number configured for {location}."
        
    # 2. Construct the alert message based on HPI value
    # CHANGE 4: Message body now uses HPI value from frontend request.
    body_msg = (
        f"🚨 CRITICAL ALERT! "
        f"Location: {location}. "
        f"Current HMPI: {hpi_value:.2f}. "
        f"ACTION REQUIRED: Water is UNSAFE."
    )
        
    # 3. Send the SMS
    try:
        message = client.messages.create(
            body=body_msg,
            from_=TWILIO_PHONE_NUMBER,
            to=recipient_number # CHANGE 5: Uses the location-specific recipient number.
        )
        print(f"SMS Sent to {location} officer ({recipient_number}): {message.sid}")
        return message.sid, None
    except Exception as e:
        print(f"Twilio API Error: {e}")
        return None, f"Twilio send failed: {str(e)}"
# =========================================================================

# Train models at startup
train_models()

# CHANGE 6: The /predict route is simplified and no longer tries to run the old auto-alert logic.
@app.route("/send_alert", methods=["POST"])
def manual_alert():
    data = request.get_json()
    # CHANGE 7: Expecting 'site_name' and 'hpi_value' from the React frontend fetch call.
    site_name = data.get("site_name") 
    hpi_value = data.get("hpi_value") 
    
    # 1. Validation (Checks if the site is a known city/officer)
    if not site_name or site_name not in OFFICER_CONTACTS:
        return jsonify({"success": False, "message": "Invalid or missing site name."}), 400
    if hpi_value is None:
        return jsonify({"success": False, "message": "HPI value is required."}), 400
        
    # 2. Trigger the SMS
    # CHANGE 8: Calls the new send_alert function with HPI data.
    alert_sid, error_msg = send_alert(site_name, float(hpi_value))

    if alert_sid:
        return jsonify({
            "success": True,
            "message": f"Critical SMS alert dispatched to officer for {site_name}.",
            "alert_sid": alert_sid
        }), 200
    else:
        return jsonify({
            "success": False,
            "message": f"Alert failed for {site_name}. Reason: {error_msg}"
        }), 500
# =========================================================================

@app.route("/predict", methods=["GET"])
def predict():
    location = request.args.get("location")
    if not location or location not in historical_data:
        return jsonify({"error": "Invalid location"}), 400

    # Historical values
    historical = historical_data[location]

    # Predicted values
    predicted = predict_next_values(location, n_future=5)

    return jsonify({
        "historical": historical,
        "predicted": predicted
    })


if __name__ == "__main__":
    # Ensure this runs on a port different from your React app
    app.run(debug=True, port=5174)
