from pydantic import BaseModel
from datetime import date, datetime
from fastapi import FastAPI, File, UploadFile

class AdoptionRequest(BaseModel):
    full_name: str
    contact_address: str 
    contact_phone: str
    contact_email: str
    facility_type: str
    facility_license: str 
    license_number: str 
    experience_with_species: str 
    reason_for_adoption: str 
    animal_id: str
    