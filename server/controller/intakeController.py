from fastapi import APIRouter, Request
from typing import Annotated
from model.intakeRequest import IntakeRequest
from util.intakeDB import createTableEntry

router = APIRouter()

@router.post("/intakeForm")
async def get_burndown_chart_metric(
        request: Request
):
    data = await request.json()
    print(createTableEntry(data))