from fastapi import APIRouter, Request
from typing import Annotated
from model.intakeRequest import IntakeRequest

router = APIRouter()

@router.post("/intakeForm")
async def get_burndown_chart_metric(
        request: Request
):
    abc = await request.body()
    print(abc)