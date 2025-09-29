from flask import Flask, request, jsonify
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from sklearn.preprocessing import MinMaxScaler
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Historical contamination data
historical_data = {
    "Village A Well": [0.008, 0.009, 0.010, 0.012, 0.011],
    "Village B Well": [0.012, 0.013, 0.014, 0.015, 0.016],
    "City Reservoir 1": [0.009, 0.010, 0.011, 0.012, 0.013],
    "City Reservoir 2": [0.015, 0.016, 0.017, 0.018, 0.019],
    "City B Well": [0.013, 0.012, 0.016, 0.015, 0.014]
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

# Train models at startup
train_models()

@app.route("/predict", methods=["GET"])
def predict():
    location = request.args.get("location")
    if location not in historical_data:
        return jsonify({"error": "Location not found"}), 404
    
    future = predict_next_values(location)
    return jsonify({
        "location": location,
        "historical": historical_data[location],
        "predicted": future
    })

if __name__ == "__main__":
    app.run(debug=True)