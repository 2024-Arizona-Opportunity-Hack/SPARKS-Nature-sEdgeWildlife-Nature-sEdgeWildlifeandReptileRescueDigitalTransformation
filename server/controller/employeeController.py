from fastapi import APIRouter, Request
from util.employeeDB import createEmployeeEntry, updateEmployeeEntry, getEmployeeEntries, deleteEmployeeEntries

router = APIRouter()

@router.post("/employee")
async def create_employee(
        request: Request
):
    data = await request.json()
    return createEmployeeEntry(data)

@router.put("/employee")
async def update_employee(
        request: Request
):
    data = await request.json()
    updateEmployeeEntry(data)


@router.get("/employee")
async def get_employee(request_id: str = None):

    return getEmployeeEntries(request_id)

@router.delete("/employee")
async  def delete_employee(request: Request):
    data = await  request.json()
    deleteEmployeeEntries(data)
