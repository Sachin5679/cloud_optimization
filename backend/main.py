from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from database import SessionLocal
from models import CloudResource
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/resources")
def get_resources(db: Session = Depends(get_db)):
    try:
        resources = db.query(CloudResource).all()
        if not resources:
            raise HTTPException(status_code=404, detail="No resources found")
        return resources
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.get("/recommendations")
def get_recommendations(db: Session = Depends(get_db)):
    try:
        resources = db.query(CloudResource).all()
        if not resources:
            raise HTTPException(status_code=404, detail="No resources found")

        recommendations = []
        total_savings = 0

        for res in resources:
            if res.type == "instance" and res.cpu_util < 30 and res.mem_util < 50:
                savings = float(res.monthly_cost) * 0.5
                recommendations.append({
                    "id": res.id,
                    "name": res.name,
                    "recommendation": "Downsize instance",
                    "current_cost": float(res.monthly_cost),
                    "potential_saving": savings,
                    "confidence": "high"
                })
                total_savings += savings
            elif res.type == "storage" and res.size_gb > 500:
                savings = float(res.monthly_cost) * 0.3
                recommendations.append({
                    "id": res.id,
                    "name": res.name,
                    "recommendation": "Reduce storage size",
                    "current_cost": float(res.monthly_cost),
                    "potential_saving": savings,
                    "confidence": "medium"
                })
                total_savings += savings

        return {"total_potential_savings": total_savings, "recommendations": recommendations}

    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
