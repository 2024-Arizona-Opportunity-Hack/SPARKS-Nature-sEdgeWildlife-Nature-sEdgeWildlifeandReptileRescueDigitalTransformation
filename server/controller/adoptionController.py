from fastapi import APIRouter, Request
from typing import Annotated
from model.adoptionRequest import AdoptionRequest
from util.adoptionDB import createAdoptionTableEntry

router = APIRouter()

@router.post("/adoptionForm")
async def get_burndown_chart_metric(
        request: Request
):
    data = await request.json()
    print(createAdoptionTableEntry(data))