import pandas as pd
import random
import os

breakfasts = [
    "Idli", "Pongal", "Poori", "Dosa", "Upma",
    "Rava Kichadi", "Appam", "Chapathi"
]

lunches = [
    "Meals", "Veg Biryani", "Sambar Rice",
    "Lemon Rice", "Curd Rice",
    "Tomato Rice", "Fried Rice"
]

dinners = [
    "Dosa", "Chapathi", "Parotta",
    "Idiyappam", "Poori",
    "Veg Fried Rice", "Curd Rice"
]

days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]

rows = []

for i in range(1000):

    students = random.randint(350, 650)

    holiday = random.choice(["Yes", "No"])
    rain = random.choice(["Yes", "No"])
    exam = random.choice(["Yes", "No"])
    festival = random.choice(["Yes", "No"])

    breakfast = random.choice(breakfasts)
    lunch = random.choice(lunches)
    dinner = random.choice(dinners)

    menu_type = random.choice([
        "Regular",
        "Special",
        "Festival"
    ])

    day = random.choice(days)

    waste = students * 0.02

    if holiday == "Yes":
        waste -= 3

    if exam == "Yes":
        waste += 4

    if rain == "Yes":
        waste += 2

    if festival == "Yes":
        waste += 5

    if menu_type == "Special":
        waste += 2

    waste += random.uniform(-1.5, 1.5)

    waste = round(max(waste, 2), 2)

    rows.append([
        menu_type,
        breakfast,
        lunch,
        dinner,
        students,
        day,
        holiday,
        rain,
        exam,
        festival,
        waste
    ])

df = pd.DataFrame(
    rows,
    columns=[
        "menu_type",
        "breakfast",
        "lunch",
        "dinner",
        "students_present",
        "day_of_week",
        "holiday",
        "rain",
        "exam_day",
        "festival",
        "waste_kg"
    ]
)

dataset_folder = os.path.join("..", "dataset")
os.makedirs(dataset_folder, exist_ok=True)

output_path = os.path.join(
    dataset_folder,
    "food_waste_dataset.csv"
)

df.to_csv(output_path, index=False)

print("✅ Dataset Created Successfully")
print(output_path)
print(df.head())