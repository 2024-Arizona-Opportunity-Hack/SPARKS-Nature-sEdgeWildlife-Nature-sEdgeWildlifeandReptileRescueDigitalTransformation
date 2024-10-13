import psycopg2
import json
import os
from datetime import datetime
#from dateutil.relativedelta import relativedelta




def createTableEntry(json_data):
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

    # Prepare values tuple
    values = (
        json_data["full_name"],  # intake_date (current timestamp)
        json_data["contact_address"],
        json_data["contact_phone"],
        json_data["contact_email"],
        json_data["facility_type"],
        json_data["facility_license"],
        json_data["license_number"],
        json_data["experience_with_species"],
        json_data["reason_for_adoption"],
        json_data["animal_id"],
        json_data["government_id"]
    )

    # Insert query with RETURNING clause
    insert_query = """
    INSERT INTO public.adoption_requests(
	 full_name, contact_address, contact_phone, contact_email, facility_type,
	facility_license, license_number, experience_with_species, reason_for_adoption, animal_id, government_id)
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



