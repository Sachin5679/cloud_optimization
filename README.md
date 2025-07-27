# Cloud Optimization Dashboard

A simple full-stack web application that shows cloud infrastructure resources, generates cost optimization recommendations, and allows users to track implemented recommendations.

---

## Features

- Displays cloud resources with utilization and cost data  
- Generates optimization recommendations based on CPU, memory, and storage usage  
- Calculates potential cost savings and confidence levels  
- Allows marking recommendations as implemented and updates savings accordingly  
- Responsive and professional React frontend with FastAPI backend  
- PostgreSQL database for persistent data storage

---

## Tech Stack

- **Backend:** FastAPI, SQLAlchemy, PostgreSQL  
- **Frontend:** React (Vite + TypeScript), TailwindCSS  
- **Database:** PostgreSQL

---

## Setup Instructions

### Prerequisites

- Node.js (v16+) and npm/yarn  
- Python 3.8+  
- PostgreSQL installed and running locally or remotely  

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/cloud_optimization.git
cd cloud_optimization
```
### 2. Configure Environment Variables
Copy .env.example to .env and update the DATABASE_URL with your PostgreSQL credentials:
```bash
cp .env.example .env
```
Edit .env file:
```bash
DATABASE_URL=postgresql://username:password@localhost:5432/your_database_name
```
### 3. Setup Database

- Run the SQL schema to create tables:

```bash
psql -d your_database_name -f db_setup.sql
```
Seed initial data:

```bash
python seed.py
```

### 4. Run Backend

Create and activate a Python virtual environment (optional but recommended):

```bash
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows
```

Install dependencies:
```bash
pip install -r requirements.txt
```

```bash
python -m uvicorn main:app --reload
```
API will be ready at http://127.0.0.1:8000

### 5. Run Frontend

```bash
cd frontend
npm install
npm run dev
```
Frontend will be ready at http://localhost:5173

## API Endpoints
-GET /resources - List all cloud resources with utilization and cost

-GET /recommendations - Get optimization recommendations with potential savings

## Database Schema

The database contains a single table `resources` with the following columns:

| Column        | Type       | Description                            |
| ------------- | ---------- | ------------------------------------ |
| id            | SERIAL     | Primary Key                          |
| name          | VARCHAR    | Resource name                       |
| type          | VARCHAR    | Resource type (`instance` or `storage`) |
| provider      | VARCHAR    | Cloud provider (`AWS`, `Azure`, `GCP`) |
| instance_type | VARCHAR    | Instance type (nullable)             |
| size_gb       | INTEGER    | Storage size in GB (nullable for storage) |
| cpu_util      | FLOAT      | CPU utilization % (nullable for storage) |
| mem_util      | FLOAT      | Memory utilization % (nullable for storage) |
| monthly_cost  | FLOAT      | Monthly cost in USD                  |
| created_at    | TIMESTAMP  | Timestamp of record creation        |


## How It Works

- Backend analyzes resource utilization and storage size to generate recommendations:
  - Downsize instances with CPU < 30% and memory < 50%
  - Reduce storage volumes larger than 500GB
- Recommendations include confidence levels and estimated cost savings
- Frontend shows a dashboard with resource info, summary stats, and actionable recommendations
- Users can mark recommendations as implemented, dynamically updating the savings and costs displayed

## Demo
[Google Drive](https://drive.google.com/file/d/1824HPVMvYK_fnY_vl-kcMvxviX6rdMIn/view?usp=sharing)
