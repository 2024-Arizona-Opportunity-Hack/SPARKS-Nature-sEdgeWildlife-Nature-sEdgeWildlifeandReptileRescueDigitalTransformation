from fastapi import APIRouter, Request
from typing import Annotated
from model.intakeRequest import IntakeRequest
from util.intakeDB import createTableEntry, updateTableEntry, getTableEntry

router = APIRouter()

@router.post("/intakeForm")
async def create_input_form(
        request: Request
):
    data = await request.json()
    return createTableEntry(data)

@router.put("/intakeForm")
async def update_input_form(
        request: Request
):
    data = await request.json()
    updateTableEntry(data)


@router.get("/intakeForm")
async def get_input_form(request: Request):
    data = await  request.json()
    return getTableEntry(data)
