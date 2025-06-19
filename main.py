from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List
import os
import shutil
import uuid
from fastapi import HTTPException
import uuid
import base64
import json

DB_FILE = "./portfolio_db.json"
UPLOAD_DIR = "./uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class MediaItem(BaseModel):
    id: str
    filename: str
    media_type: str  # "image" or "video"
    title: str
    description: str
    category: str

class Portfolio(BaseModel):
    user_id: str
    items: List[MediaItem]

# DB Helpers
def load_db() -> dict:
    if os.path.exists(DB_FILE):
        with open(DB_FILE, "r") as f:
            raw = json.load(f)
        return {uid: [MediaItem(**i) for i in items] for uid, items in raw.items()}
    return {}

def save_db(db: dict):
    dir_name = os.path.dirname(DB_FILE)
    
    if dir_name:
        os.makedirs(dir_name, exist_ok=True)
    serialisable = { uid: [i.model_dump() for i in items] for uid, items in db.items() }

    with open(DB_FILE, "w") as f:
        json.dump(serialisable, f, indent=2)

portfolio_db = load_db()

# Upload Endpoint
@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    title: str = Form(""),
    description: str = Form(""),
    category: str = Form("")
):
    if file.content_type.startswith("image/"):
        media_type = "image"
    elif file.content_type.startswith("video/"):
        media_type = "video"
    else:
        raise HTTPException(status_code=415, detail="Unsupported file type")

    # Generate a unique ID for the item
    uid = base64.urlsafe_b64encode(uuid.uuid4().bytes).rstrip(b'=').decode('ascii')

    # Save the file to the uploads directory
    ext = os.path.splitext(file.filename)[1]
    saved_filename = f"{uid}{ext}"
    path = os.path.join(UPLOAD_DIR, saved_filename)
    with open(path, "wb") as out_file:
        shutil.copyfileobj(file.file, out_file)

    item = MediaItem(
        id=uid,
        filename=saved_filename,
        media_type=media_type,
        title=title,
        description=description,
        category=category,
    )

    return item.model_dump()

@app.post("/save-portfolio")
async def save_portfolio(data: Portfolio):
    portfolio_db[data.user_id] = data.items

    # Save to portfolio_db.json
    save_db(portfolio_db)       
    return {"status": "success"}


@app.get("/load-portfolio/{user_id}")
async def load_portfolio(user_id: str):
    items = portfolio_db.get(user_id, [])
    return {"items": [item.model_dump() for item in items]}


app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")
