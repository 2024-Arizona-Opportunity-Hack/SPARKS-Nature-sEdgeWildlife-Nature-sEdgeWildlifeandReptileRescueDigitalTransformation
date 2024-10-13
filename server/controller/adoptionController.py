from fastapi import APIRouter, Request
from util.adoptionDB import createAdoptionTableEntry, updateAdoptionTableEntry, getAdoptionEntries, deleteAdoptionEntries

router = APIRouter()

@router.post("/adoptionForm")
async def create_adoption_entry(
        request: Request
):
    data = await request.json()
    return createAdoptionTableEntry(data)

@router.put("/adoptionForm")
async def update_adoption_entry(
        request: Request
):
    data = await request.json()
    updateAdoptionTableEntry(data)


@router.get("/adoptionForm")
async def get_adoption_entry(request_id: str = None):

    return getAdoptionEntries(request_id)

@router.delete("/adoptionForm")
async  def delete_adoption_entry(request: Request):
    data = await  request.json()
    deleteAdoptionEntries(data)
