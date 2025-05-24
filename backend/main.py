from fastapi import FastAPI
from controllers.mawaqitController import router as mawaqitRouter
from fastapi.middleware.cors import CORSMiddleware

def create_app() -> FastAPI:
    app = FastAPI(title='Mawaqit Api', debug=False, read_root="/")
    return app

app = create_app()
app.include_router(router=mawaqitRouter)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with the specific origin(s) for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)