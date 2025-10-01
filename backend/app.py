# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from twilio.rest import Client
import os

# ---------------------------------------------------------------------
# App Initialization
# ---------------------------------------------------------------------
app = Flask(__name__)
CORS(app)  # Allow frontend-backend communication

# ---------------------------------------------------------------------
# Twilio Credentials (replace with your own)
# ---------------------------------------------------------------------
TWILIO_ACCOUNT_SID = "ACe113e12727037b86775f531c0f24b8b0"
TWILIO_AUTH_TOKEN = "f2ae51e69f7c775487c65c3590faeca4"
TWILIO_PHONE_NUMBER = "+18145177571"

try:
    client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
except Exception as e:
    print(f"⚠️ TWILIO CLIENT INIT ERROR: {e}")
    client = None

# ---------------------------------------------------------------------
# Officer Contact Mapping
# ---------------------------------------------------------------------
OFFICER_CONTACTS = {
    "Mumbai": "+918977186820",  
    "Hyderabad": "+919494783433",
    "Kolkata": "+919948021183",
    "Delhi": "+918639086087",
    "Chennai": "+918639086087"
}

# ---------------------------------------------------------------------
# Historical Data
# ---------------------------------------------------------------------
historical_data = { 
    "Village A Well": [0.008, 0.009, 0.010, 0.012, 0.011],
    "Village B Well": [0.012, 0.013, 0.014, 0.015, 0.016],
    "City Reservoir 1": [0.009, 0.010, 0.011, 0.012, 0.013],
    "City Reservoir 2": [0.015, 0.016, 0.017, 0.018, 0.019],
    "City B Well": [0.013, 0.012, 0.016, 0.015, 0.014]
}

# ---------------------------------------------------------------------
# Dummy Prediction Function for Free Render Deployment
# ---------------------------------------------------------------------
def predict_next_values(location, n_future=5):
    """Returns dummy predictions (last value repeated)."""
    historical = historical_data[location]
    return [historical[-1]] * n_future

# ---------------------------------------------------------------------
# Alert Function
# ---------------------------------------------------------------------
def send_alert(location, hpi_value):
    """Sends SMS alert for critical HPI values."""
    if not client:
        return None, "Twilio client not initialized."

    recipient_number = OFFICER_CONTACTS.get(location)
    if not recipient_number:
        return None, f"No officer number configured for {location}."
    
    body_msg = (
        f"🚨 CRITICAL ALERT! "
        f"Location: {location}. "
        f"Current HMPI: {hpi_value:.2f}. "
        f"ACTION REQUIRED: Water is UNSAFE."
    )

    try:
        message = client.messages.create(
            body=body_msg,
            from_=TWILIO_PHONE_NUMBER,
            to=recipient_number
        )
        print(f"SMS Sent to {location} officer ({recipient_number}): {message.sid}")
        return message.sid, None
    except Exception as e:
        print(f"Twilio API Error: {e}")
        return None, f"Twilio send failed: {str(e)}"

# ---------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------
@app.route("/send_alert", methods=["POST"])
def manual_alert():
    data = request.get_json()
    site_name = data.get("site_name")
    hpi_value = data.get("hpi_value")

    if not site_name or site_name not in OFFICER_CONTACTS:
        return jsonify({"success": False, "message": "Invalid or missing site name."}), 400
    if hpi_value is None:
        return jsonify({"success": False, "message": "HPI value is required."}), 400

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

@app.route("/predict", methods=["GET"])
def predict():
    location = request.args.get("location")
    if not location or location not in historical_data:
        return jsonify({"error": "Invalid location"}), 400

    historical = historical_data[location]
    predicted = predict_next_values(location, n_future=5)

    return jsonify({
        "historical": historical,
        "predicted": predicted
    })

# ---------------------------------------------------------------------
# Main Entry
# ---------------------------------------------------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5174))  # Render provides PORT
    app.run(debug=True, host="0.0.0.0", port=port)
