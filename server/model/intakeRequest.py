from pydantic import BaseModel
from datetime import date, datetime
from fastapi import FastAPI, File, UploadFile

class IntakeRequest(BaseModel):
    species: str
    breed: str = None
    gender: str
    estimated_age: int
    weight: int
    pickup_location: str = None
    pickup_contact_name: str = None
    pickup_contact_phone: str = None
    assigned_team_member: str = None
    intake_date: datetime
    intake_request_date: datetime = None
    condition_upon_arrival: str
    injuries_or_health_issues: str = None
    behavioral_conditions: str
    photos_pickup: list[UploadFile]
    transportation_method: str
    transported_by: str
    photos_arrival: list[UploadFile]
    adoption_status: bool
