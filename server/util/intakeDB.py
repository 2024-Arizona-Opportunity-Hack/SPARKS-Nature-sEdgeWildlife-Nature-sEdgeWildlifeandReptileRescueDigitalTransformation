import psycopg2
import json
import os
from datetime import datetime
from dateutil.relativedelta import relativedelta
import base64


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
        json_data["intake_date"],  # intake_date (current timestamp)
        json_data["species"],
        json_data["breed"] if "breed" in json_data else None,
        json_data["gender"],
        (datetime.now()-relativedelta(years=int(json_data["estimated_age"]))),
        json_data["weight"],
        json_data["pickup_location"] if "pickup_location" in json_data else None,
        json_data["pickup_contact_name"] if "pickup_contact_name" in json_data else None,
        json_data["pickup_contact_phone"] if "pickup_contact_phone" in json_data else None,
        json_data["assigned_team_member"] if "assigned_team_member" in json_data else None,
        json_data["condition_upon_arrival"],
        json_data["injuries_or_health_issues"] if "injuries_or_health_issues" in json_data else None,
        json_data["behavioral_conditions"],
        json_data["transportation_method"] if "transportation_method" in json_data else None,
        json_data["transported_by"] if "transported_by" in json_data else None,
        json_data["adoption_status"] if "adoption_status" in json_data else False,
        json_data["intake_request_date"] if "intake_request_date" in json_data else None
    )

    # Insert query with RETURNING clause
    insert_query = """
    INSERT INTO public.animal_intake (
        intake_date, species, breed, gender, estimated_birthdate, 
        weight, pickup_location, pickup_contact_name, pickup_contact_phone, 
        assigned_team_member, condition_upon_arrival, injuries_or_health_issues, 
        behavioral_condition, transportation_method, transported_by, 
        adoption_status, intake_request_date)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    RETURNING animal_id;
    """

    # Execute query with the values and retrieve the inserted animal_id
    cur.execute(insert_query, values)
    inserted_id = cur.fetchone()[0]  # Fetch the first column of the first row

    insert_query_blob = """
    INSERT INTO public.animal_images (
        animal_id, image_data)
    VALUES (%s, %s)
    RETURNING animal_id;
    """

    if "photos_pickup" in json_data:
        for blob in json_data["photos_pickup"]:
            cur.execute(insert_query_blob, (inserted_id, blob))

    if "photos_arrival" in json_data:
        for blob in json_data["photos_arrival"]:
            cur.execute(insert_query_blob, (inserted_id, blob))

    
    # Commit the transaction
    conn.commit()

    # Close the cursor and connection
    cur.close()
    conn.close()

    # Print the inserted ID
    return inserted_id

def updateTableEntry(json_data):
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
        json_data["intake_date"],  # intake_date (current timestamp)
        json_data["species"],
        json_data["breed"] if "breed" in json_data else None,
        json_data["gender"],
        (datetime.now()-relativedelta(years=int(json_data["estimated_age"]))),
        json_data["weight"],
        json_data["pickup_location"] if "pickup_location" in json_data else None,
        json_data["pickup_contact_name"] if "pickup_contact_name" in json_data else None,
        json_data["pickup_contact_phone"] if "pickup_contact_phone" in json_data else None,
        json_data["assigned_team_member"] if "assigned_team_member" in json_data else None,
        json_data["condition_upon_arrival"],
        json_data["injuries_or_health_issues"] if "injuries_or_health_issues" in json_data else None,
        json_data["behavioral_conditions"],
        json_data["transportation_method"] if "transportation_method" in json_data else None,
        json_data["transported_by"] if "transported_by" in json_data else None,
        json_data["adoption_status"] if "adoption_status" in json_data else False,
        json_data["intake_request_date"] if "intake_request_date" in json_data else None,
        json_data["animal_id"]
    )

    # Insert query with RETURNING clause
    insert_query = """
    UPDATE public.animal_intake SET
        intake_date = %s, species = %s, breed = %s, gender = %s, estimated_birthdate = %s, 
        weight = %s, pickup_location = %s, pickup_contact_name = %s, pickup_contact_phone = %s, 
        assigned_team_member = %s, condition_upon_arrival = %s, injuries_or_health_issues = %s, 
        behavioral_condition = %s, transportation_method = %s, transported_by = %s, 
        adoption_status = %s, intake_request_date = %s
    WHERE animal_id=%s;
    """

    # Execute query with the values and retrieve the inserted animal_id
    cur.execute(insert_query, values)
    inserted_id = cur.fetchone()[0]  # Fetch the first column of the first row

    insert_query_blob = """
    INSERT INTO public.animal_images (
        animal_id, image_data)
    VALUES (%s, %s)
    RETURNING animal_id;
    """

    if "photos_pickup" in json_data:
        for blob in json_data["photos_pickup"]:
            cur.execute(insert_query_blob, (inserted_id, blob))

    if "photos_arrival" in json_data:
        for blob in json_data["photos_arrival"]:
            cur.execute(insert_query_blob, (inserted_id, blob))


    # Commit the transaction
    conn.commit()

    # Close the cursor and connection
    cur.close()
    conn.close()

    # Print the inserted ID
    return inserted_id

def getTableEntry(animal_id = None):
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

    if animal_id is None:
        query = "SELECT animal_id, species, breed, gender from animal_intake"
        cur.execute(query)
        data = cur.fetchall()
        return_data = []
        for d in data:
            cur.execute("SELECT image_data from animal_images where animal_id=%s", (d[0],))
            images = cur.fetchall()
            images = [base64.b64encode(blob[0]).decode("utf-8") for blob in images]
            return_data.append({
                "animal_id": d[0],
                "species": d[1],
                "breed": d[2],
                "gender": d[3],
                "images": images
            })
        return return_data

    query = "SELECT animal_id, species, breed, gender from animal_intake where animal_id=%s"
    cur.execute(query, (animal_id,))
    d = cur.fetchone()
    cur.execute("SELECT image_data from animal_images where animal_id=%s", (d[0],))
    images = cur.fetchall()
    return {
        "animal_id": d[0],
        "species": d[1],
        "breed": d[2],
        "gender": d[3],
        "images": images
    }

def deleteTableEntry(animal_id):
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

    cur.execute("DELETE FROM animal_intake WHERE animal_id = %s", (animal_id["animal_id"],))

    # Commit the changes
    conn.commit()

    # Close the cursor and connection
    cur.close()
    conn.close()
