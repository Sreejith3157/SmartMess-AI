import pandas as pd
import joblib
import sys
import os

# Load trained model
model_path = os.path.join(os.path.dirname(__file__), "food_waste_model.pkl")
model = joblib.load(model_path)

# Read command-line arguments
menu_type = sys.argv[1]
breakfast = sys.argv[2]
lunch = sys.argv[3]
dinner = sys.argv[4]
students = int(sys.argv[5])
day = sys.argv[6]
holiday = sys.argv[7]
rain = sys.argv[8]
exam = sys.argv[9]
festival = sys.argv[10]

# Create dataframe
data = pd.DataFrame([{
    "menu_type": menu_type,
    "breakfast": breakfast,
    "lunch": lunch,
    "dinner": dinner,
    "students_present": students,
    "day_of_week": day,
    "holiday": holiday,
    "rain": rain,
    "exam_day": exam,
    "festival": festival
}])

# Predict
prediction = model.predict(data)

print(round(prediction[0], 2))