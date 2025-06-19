<h1 align="center">Cashmere: Frontend Take-Home</h1>

<p align="center">
  Built by <strong>Max Valasek</strong>
</p>

<!-- Demo Video -->
<p align="center"><strong>Demo Video</strong></p>
<p align="center">
  <video src="https://github.com/user-attachments/assets/7d747779-a7fd-40ea-bd1a-24540c25bc74" height="300" autoplay loop muted playsinline style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"></video>
</p>

<!-- Screenshots -->
<table align="center" style="margin-top: 20px;">
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/a35898a6-185d-447a-b616-f07a9758c187" alt="Drag Example" height="300" style="border-radius: 8px;" /><br/>
      <p><strong>Drag & Drop</strong></p>
    </td>
    <td style="width: 40px;"></td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/2808a0d6-be29-4568-8f31-7c450c354319" alt="Upload Modal" height="300" style="border-radius: 8px;" /><br/>
      <p><strong>Upload Modal</strong></p>
    </td>
  </tr>
</table>

---

## Overview

- **Frontend:** Next.js, Tailwind CSS
- **State:** Centralized Zustand store
- **Persistence:** FastAPI API saving to custom `portfolio_db.json`

---
## Notable Extra Features

- **Drag and Drop** — Rearrange media within and across sections.
- **Inline Edit & Delete** — Hover to quickly edit or remove items.
- **Auto Metadata Extraction** — Pulls titles, image size, video length.
- **Hover Metadata** — Shows title, type, and dimensions on hover.
- **Smart Save Button** — Notifies when changes are unsaved.
- **Smooth Animations** — Transitions for drag, collapse, hover, etc.
- **Professional UX Styling** — Custom responsive layout.

---

## API Endpoints

The FastAPI backend handles media uploads and portfolio persistence:

- **POST `/upload`**  
  Handles image/video file uploads.  
  - Accepts `multipart/form-data` with a `file` field.  
  - Saves file with a UUID-based filename.  
  - Returns the file path and metadata (e.g., dimensions, duration).

- **GET `/portfolio`**  
  Returns the saved portfolio state from `portfolio_db.json`.

- **POST `/save`**  
  Accepts a JSON body representing the full portfolio state.  
  - Overwrites `portfolio_db.json` with the submitted data.  
  - Used by the save button in the UI to persist layout and items.

Uploaded media is served statically via FastAPI from the `uploads/` directory with correct MIME types.

---

## Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/maxwellvalasek/fullstack-take-home.git
   cd fullstack-take-home
   ```
2. **Install Dependencies**
   ```bash
   pip install fastapi uvicorn python-multipart
   npm i
   ```

4. **Start Development Servers**
   
   ```bash
   uvicorn main:app --reload
   ```
   ```bash
   npm run dev
   ```

5. **Access the application**
   - http://localhost:3000

---
## How to Use

Follow these steps to create and arrange your media portfolio:

1. **Upload Media**  
   Click the **“Upload”** button to open the upload modal. Choose a file, fill in the title and optional details, then click “Upload Media”.

2. **Sections**  
   Use the **“Create Section”** button to organize media into labeled groups.

3. **Drag and Arrange**  
   Drag media items freely between and within sections to reorder them.

4. **Save Your Layout**  
   Once you're done arranging, click the **“Save”** button in the bottom-right corner to persist changes.


5. **Edit or Delete Items**  
   Hover over a media item to reveal icons in the top-right corner.
    Click the 🖊️ to **edit**. Click the 🗑️ to **delete**.
     
---

