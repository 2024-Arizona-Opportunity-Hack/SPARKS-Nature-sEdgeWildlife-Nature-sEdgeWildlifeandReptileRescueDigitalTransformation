from fastapi import APIRouter, Request
from typing import Annotated
from util.loginUtil import loginSuccessful

router = APIRouter()

@router.post("/login")
async def login(
        request: Request
):
    data = await request.json()
    res = loginSuccessful(data)
    return {
        "name": res[0],
        "email": res[1],
        "type": res[2]
    }