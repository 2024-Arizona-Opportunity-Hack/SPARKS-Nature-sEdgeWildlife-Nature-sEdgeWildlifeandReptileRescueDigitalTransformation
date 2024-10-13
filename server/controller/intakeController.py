from fastapi import APIRouter, Header
from typing import Annotated
from model.intakeRequest import IntakeRequest

router = APIRouter()

@router.post("/intakeForm")
def get_burndown_chart_metric(
        intakeRequest: IntakeRequest
):
    print(intakeRequest)