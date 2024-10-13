import psycopg2
import json
import os
from datetime import datetime
#from dateutil.relativedelta import relativedelta




def createEmployeeEntry(json_data):
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

    # Flatten any nested dictionaries or convert complex types to strings
    values = (
        str(json_data.get("name")),  # Convert to string if needed
        str(json_data.get("email")),
        str(json_data.get("phone_number")),
        str(json_data.get("employee_type")),
        str(json_data.get("has_exotic_animal_license")),
        str(json_data.get("license_number")),
        str(json_data.get("license_expiration")),
        str(json_data.get("hire_date")),
        str(json_data.get("date_of_birth")),
        str(json_data.get("government_id")),
        str(json_data.get("password_hash"))
    )

    # Flatten any nested dictionaries or convert complex types to strings



    # Insert query with RETURNING clause
    insert_query = """
    INSERT INTO public.employees (
	 name, email, phone_number, employee_type, has_exotic_animal_license,
	license_number, license_expiration, hire_date, date_of_birth, government_id, password_hash)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    RETURNING request_id;
    """

    # Execute query with the values and retrieve the inserted animal_id
    cur.execute(insert_query, values)
    inserted_id = cur.fetchone()[0]  # Fetch the first column of the first row




    # Commit the transaction
    conn.commit()

    # Close the cursor and connection
    cur.close()
    conn.close()

    # Print the inserted ID
    return inserted_id


def updateEmployeeEntry(json_data):
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

    # Flatten any nested dictionaries or convert complex types to strings
    values = (
        str(json_data.get("employee_id")),
        str(json_data.get("name")),  # Convert to string if needed
        str(json_data.get("email")),
        str(json_data.get("phone_number")),
        str(json_data.get("employee_type")),
        str(json_data.get("has_exotic_animal_license")),
        str(json_data.get("license_number")),
        str(json_data.get("license_expiration")),
        str(json_data.get("hire_date")),
        str(json_data.get("date_of_birth")),
        str(json_data.get("government_id"))

    )



    # Insert query with RETURNING clause
    insert_query = """
    UPDATE public.employees SET(
	 employee_id=%s, name=%s, email=%s, phone_number=%s, employee_type=%s, has_exotic_animal_license=%s,
	license_number=%s, license_expiration=%s, hire_date=%s, date_of_birth=%s, government_id=%s);
    """

    # Execute query with the values and retrieve the inserted animal_id
    cur.execute(insert_query, values)




    # Commit the transaction
    conn.commit()

    # Close the cursor and connection
    cur.close()
    conn.close()

    # Print the inserted ID

def getEmployeeEntries(request_id: str=None):
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

    if request_id is None:
        query = "SELECT * from employees"
        cur.execute(query)
        data = cur.fetchall()
        return_data = []
        for d in data:
            return_data.append({
                "employee_id": d[0],
                "name": d[1],
                "email": d[2],
                "phone_number": d[3],
                "employee_type": d[4],
                "has_exotic_animal_license": d[5],
                "license_number": d[6],
                "license_expiration": d[7],
                "hire_date": d[8],
                "date_of_birth": d[9],
                "government_id": d[10]

            })
        return return_data

    query = "SELECT * from employees where request_id=%s"
    cur.execute(query, (request_id,))
    d = cur.fetchone()
    return {
        "employee_id": d[0],
        "name": d[1],
        "email": d[2],
        "phone_number": d[3],
        "employee_type": d[4],
        "has_exotic_animal_license": d[5],
        "license_number": d[6],
        "license_expiration": d[7],
        "hire_date": d[8],
        "date_of_birth": d[9],
        "government_id": d[10]
    }

def deleteEmployeeEntries(request_id):
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

    cur.execute("DELETE FROM employees WHERE employee_id = %s", (request_id["employee_id"],))

    # Commit the changes
    conn.commit()

    # Close the cursor and connection
    cur.close()
    conn.close()

