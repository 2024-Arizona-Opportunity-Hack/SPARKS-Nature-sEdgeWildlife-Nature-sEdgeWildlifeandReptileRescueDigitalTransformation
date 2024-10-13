import psycopg2
import json
import os
from datetime import datetime
from dateutil.relativedelta import relativedelta



def loginSuccessful(json_data):
    # Connection details
    DB_HOST = "autorack.proxy.rlwy.net"
    DB_NAME = "railway"
    DB_USER = "postgres"
    DB_PASSWORD = "dDsUMplJMZOoMPlddDqriJdMLUyyGadU"
    DB_PORT = 24108

    # Connect to the PostgreSQL database
    conn = psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        port=DB_PORT,
        user=DB_USER,
        password=DB_PASSWORD,
        sslmode='require'  # Ensure SSL is enabled
    )

    # Create a cursor object
    cur = conn.cursor()

    data = (
        json_data["username"],
        json_data["password"]
    )

    cur.execute("SELECT emp.name, emp.email, emp.employee_type FROM employee_login emp_l inner join employees as emp on emp_l.employee_id = emp.employee_id WHERE emp_l.email=%s and emp_l.password_hash=%s",
                       data)

    # Fetch the result
    result = cur.fetchone()

    # Close the cursor and connection
    cur.close()
    conn.close()

    # Return the result
    return result

