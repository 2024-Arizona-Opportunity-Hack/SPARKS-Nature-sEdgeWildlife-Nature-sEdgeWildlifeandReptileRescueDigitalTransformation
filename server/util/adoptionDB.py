import psycopg2
import json
import os
from datetime import datetime
#from dateutil.relativedelta import relativedelta




def createAdoptionTableEntry(json_data):
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
        str(json_data.get("full_name")),  # Convert to string if needed
        str(json_data.get("contact_address")),
        str(json_data.get("contact_phone")),
        str(json_data.get("contact_email")),
        str(json_data.get("facility_type")),
        str(json_data.get("facility_license")),
        str(json_data.get("license_number")),
        str(json_data.get("experience_with_species")),
        str(json_data.get("reason_for_adoption")),
        str(json_data.get("animal_id")),
        str(json_data.get("government_id")),
        "Pending" if "application_status" not in json_data else json_data.get("application_status")
    )

# Flatten any nested dictionaries or convert complex types to strings



    # Insert query with RETURNING clause
    insert_query = """
    INSERT INTO public.adoption_requests (
	 full_name, contact_address, contact_phone, contact_email, facility_type,
	facility_license, license_number, experience_with_species, reason_for_adoption, animal_id, government_id, application_status)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
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


def updateAdoptionTableEntry(json_data):
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
        str(json_data.get("request_id")),
        str(json_data.get("full_name")),  # Convert to string if needed
        str(json_data.get("contact_address")),
        str(json_data.get("contact_phone")),
        str(json_data.get("contact_email")),
        str(json_data.get("facility_type")),
        str(json_data.get("facility_license")),
        str(json_data.get("license_number")),
        str(json_data.get("experience_with_species")),
        str(json_data.get("reason_for_adoption")),
        str(json_data.get("animal_id")),
        str(json_data.get("government_id")),
        "Pending" if "application_status" not in json_data else json_data.get("application_status")

    )



    # Insert query with RETURNING clause
    insert_query = """
    UPDATE public.adoption_requests SET(
	 request_id=%s, full_name=%s, contact_address=%s, contact_phone=%s, contact_email=%s, facility_type=%s,
	facility_license=%s, license_number=%s, experience_with_species=%s, reason_for_adoption=%s, animal_id=%s, government_id=%s, application_status=%s);
    """

    # Execute query with the values and retrieve the inserted animal_id
    cur.execute(insert_query, values)




    # Commit the transaction
    conn.commit()

    # Close the cursor and connection
    cur.close()
    conn.close()

    # Print the inserted ID

def getAdoptionEntries(request_id: str=None):
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
        query = "SELECT * from adoption_requests"
        cur.execute(query)
        data = cur.fetchall()
        print(data)
        return_data = []
        for d in data:
            return_data.append({
                "request_id": d[0],
                "full_name": d[1],
                "contact_address": d[2],
                "contact_phone": d[3],
                "contact_email": d[4],
                "facility_type": d[5],
                "license_number": d[7],
                "experience_with_species": d[8],
                "reason_for_adoption": d[9],
                "animal_id": d[10],
                "application_status": d[11],
                "submission_date": d[12]
            })
        return return_data

    query = "SELECT * from adoption_requests where request_id=%s"
    cur.execute(query, (request_id,))
    d = cur.fetchone()
    return {
        "request_id": d[0],
        "full_name": d[1],
        "contact_address": d[2],
        "contact_phone": d[3],
        "contact_email": d[4],
        "facility_type": d[5],
        "facility_license": d[6],
        "license_number": d[7],
        "experience_with_species": d[8],
        "reason_for_adoption": d[9],
        "animal_id": d[10],
        "application_status": d[11],
        "submission_date": d[12],
        "government_id": d[13]
    }

def deleteAdoptionEntries(request_id):
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

    cur.execute("DELETE FROM adoption_requests WHERE animal_id = %s", (request_id["request_id"],))

    # Commit the changes
    conn.commit()

    # Close the cursor and connection
    cur.close()
    conn.close()

