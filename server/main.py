from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controller import adoptionController
from controller import intakeController
from controller import loginController
from controller import employeeController

app = FastAPI()

app.include_router(adoptionController.router)


app.include_router(loginController.router)
app.include_router(intakeController.router)
app.include_router(employeeController.router)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/endpoint_1")
async def endpoint_1():
    return {"message": "FastAPI Endpoint 1 Active!"}

@app.get("/endpoint_2")
async def endpoint_2():
    return {"message": "FastAPI Endpoint 2 Active!"}