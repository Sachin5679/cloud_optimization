import psycopg2
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set in environment")

conn = psycopg2.connect(DATABASE_URL)
cur = conn.cursor()

resources = [
    ("web-server-1", "instance", "AWS", "t3.xlarge", None, 15, 25, 150),
    ("api-server-2", "instance", "AWS", "m5.large", None, 12, 30, 90),
    ("worker-3", "instance", "Azure", "Standard_D2s_v3", None, 8, 20, 70),
    ("database-1", "instance", "AWS", "m5.xlarge", None, 75, 85, 180),
    ("cache-server", "instance", "GCP", "n1-standard-2", None, 65, 70, 50),
    ("backup-storage", "storage", "AWS", None, 1000, None, None, 100),
    ("log-storage", "storage", "AWS", None, 500, None, None, 75),
    ("database-storage", "storage", "AWS", None, 200, None, None, 25),
]

for r in resources:
    cur.execute("""
        INSERT INTO resources (name, type, provider, instance_type, size_gb, cpu_util, mem_util, monthly_cost, created_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, r + (datetime.now(),))

conn.commit()
cur.close()
conn.close()

print("Sample data inserted successfully!")
