-- Create table for resources
CREATE TABLE IF NOT EXISTS resources (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    provider VARCHAR(50) NOT NULL,
    instance_type VARCHAR(100),
    size_gb INTEGER,
    cpu_util INTEGER,
    mem_util INTEGER,
    monthly_cost NUMERIC NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
