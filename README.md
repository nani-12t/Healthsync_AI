# HealthSync AI

Welcome to HealthSync AI! This project consists of a React frontend and a Python (FastAPI) backend. Follow the instructions below to get both up and running.

## Prerequisites
- **Node.js** (for the frontend)
- **uv** (for fast Python package management)
- **MongoDB** (running locally or accessible via URI)

## 🖥️ Frontend Setup

1. Open a terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## ⚙️ Backend Setup (Python API)

We use `uv` for lightning-fast Python package management. 

1. Open a new terminal and navigate to the backend Python API folder:
   ```bash
   cd backend/python_api
   ```
2. Create a clean virtual environment and install the dependencies:
   ```bash
   uv venv
   uv pip install -r requirements.txt
   ```
3. Activate the virtual environment:
   - **Windows (PowerShell):** `.venv\Scripts\activate`
   - **Mac/Linux:** `source .venv/bin/activate`
4. Start the FastAPI server using Uvicorn:
   ```bash
   uvicorn main:app --reload
   ```

*Note: Make sure your MongoDB instance is running locally on port 27017, or configure the `MONGODB_URI` environment variable accordingly.*