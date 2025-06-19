## Installation

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fullstack-take-home
   ```

2. **Setup Frontend**
   ```bash
   npm install
   ```

3. **Setup Backend**
   ```bash
   pip install fastapi uvicorn python-multipart
   ```

4. **Start Development Servers**
   
   **Terminal 1 - Backend:**
   ```bash
   python main.py
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

### Environment Configuration

Create a `.env.local` file for custom configuration:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### Production Deployment

**Frontend (Vercel/Netlify):**
```bash
npm run build
npm start
```

**Backend (Railway/Render):**
```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Troubleshooting

- Ensure both servers are running on different ports
- Check that uploads folder exists and is writable
- Verify CORS settings if accessing from different domains