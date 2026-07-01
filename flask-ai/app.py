from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

MODEL_PATH = os.path.join("..", "backend", "ml", "food_waste_model.pkl")

model = joblib.load(MODEL_PATH)


@app.route("/")
def home():
    return "🚀 SmartMess AI Flask Server Running"


@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    input_df = pd.DataFrame([{

        "menu_type": data["menu_type"],
        "breakfast": data["breakfast"],
        "lunch": data["lunch"],
        "dinner": data["dinner"],
        "day_of_week": data["day_of_week"],
        "holiday": data["holiday"],
        "rain": data["rain"],
        "exam_day": data["exam_day"],
        "festival": data["festival"],
        "students_present": int(data["students_present"])

    }])

    prediction = model.predict(input_df)

    return jsonify({
        "predictedWaste": round(float(prediction[0]), 2)
    })


if __name__ == "__main__":
    app.run(debug=True, port=5001)