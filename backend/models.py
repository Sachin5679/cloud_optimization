from sqlalchemy import Column, Integer, String, Numeric, TIMESTAMP
from database import Base

class CloudResource(Base):
    __tablename__ = "cloud_resources"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)
    provider = Column(String, nullable=False)
    instance_type = Column(String)
    size_gb = Column(Integer)
    cpu_util = Column(Numeric(5, 2))
    mem_util = Column(Numeric(5, 2))
    monthly_cost = Column(Numeric(10, 2), nullable=False)
    created_at = Column(TIMESTAMP)
