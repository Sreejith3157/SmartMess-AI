import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
import joblib
import os

# Load Dataset
dataset_path = os.path.join("..", "dataset", "food_waste_dataset.csv")
df = pd.read_csv(dataset_path)

# Input Features
X = df.drop("waste_kg", axis=1)

# Target
y = df["waste_kg"]

# Categorical Columns
categorical = [
    "menu_type",
    "breakfast",
    "lunch",
    "dinner",
    "day_of_week",
    "holiday",
    "rain",
    "exam_day",
    "festival",
]

# Numerical Columns
numerical = [
    "students_present"
]

preprocessor = ColumnTransformer([
    (
        "cat",
        OneHotEncoder(handle_unknown="ignore"),
        categorical
    ),
    (
        "num",
        "passthrough",
        numerical
    )
])

model = RandomForestRegressor(
    n_estimators=200,
    random_state=42
)

pipeline = Pipeline([
    ("preprocessor", preprocessor),
    ("model", model)
])

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

pipeline.fit(X_train, y_train)

score = pipeline.score(X_test, y_test)

joblib.dump(pipeline, "food_waste_model.pkl")

print("✅ Model Trained Successfully")
print(f"Accuracy (R² Score): {score:.4f}")
print("✅ Model Saved as food_waste_model.pkl")