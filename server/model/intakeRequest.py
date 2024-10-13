from pydantic import BaseModel
from datetime import date, datetime
from fastapi import FastAPI, File, UploadFile

class IntakeRequest(BaseModel):
    species: str
    breed: str = None
    gender: str
    estimatedAge: int
    weight: int
    pickupLocation: str = None
    pickupContactName: str = None
    pickupContactPhone: str = None
    assignedTeamMember: str = None
    intakeDate: datetime
    intakeRequestDate: datetime = None
    conditionUponArrival: str
    injuriesOrHealthIssues: str = None
    behavioralConditions: str
    photosPickup: list[UploadFile]
    transportationMethod: str
    transportedBy: str
    photosArrival: list[UploadFile]
    adoptionStatus: bool
