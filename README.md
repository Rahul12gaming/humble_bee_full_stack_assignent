🐝 BeeTrail Field Logger Backend API

This backend API powers the BeeTrail Field Logger App, enabling beekeepers to log hive placements and discover crop-pollination opportunities nearby. Built with Node.js, Express, MongoDB, and documented with Swagger UI.

🚀 Setup Instructions

Prerequisites
Node.js (v16+)
MongoDB (local or cloud)

Steps
1️⃣ Clone the repository:

git clone https://github.com/yourusername/beetrail-backend.git
cd beetrail-backend
2️⃣ Install dependencies:

npm install
3️⃣ Set up .env:

PORT=5001
MONGODB_URI=mongodb://localhost:27017/beetrail
4️⃣ Start the server:

npm run dev
5️⃣ Access Swagger UI at:

http://localhost:5001/docs


🧠 Explanation of Logic

Core APIs:
POST /hives: Add hive log with validation (unique hiveId, lat/lng range, valid date).
GET /hives: Retrieve hive logs with optional date filtering and pagination.
GET /crops/export: Export crops logs as a CSV file.
POST /crops: Add crop calendar entries with flowering dates and recommended density.
GET /crops/nearby: Find crops near a location within a given radius (default 100km) and flowering window.
GET /hives/export: Export hive logs as a CSV file.
Swagger UI: Documented APIs under /docs.
Validation:
Uses Joi for request validation.
Ensures latitude [-90,90] and longitude [-180,180].
Checks for unique hiveId.
Database:
MongoDB collections: hives, crops.
Uses Mongoose for schema modeling.

📂 Folder Structure
humble_bee_full_stack_assignent/
├── controller/
│   ├── hiveController.js
│   └── cropController.js
├── models/
│   ├── Hive.js
│   └── Crop.js
├── routes/
│   ├── hiveRoutes.js
│   └── cropRoutes.js
├── swagger/
│   └── swaggerConfig.js
├── postman/
│   └── BeeTrail.postman_collection.json
├── .env
├── server.js
├── README.md


Swagger Ui
![image](https://github.com/user-attachments/assets/7d95d1a8-df9d-424e-8c8f-637e0adb18d8)


CSV log file
![image](https://github.com/user-attachments/assets/56a50105-a15f-40ba-a15d-cdf0ca7fcdd9)





