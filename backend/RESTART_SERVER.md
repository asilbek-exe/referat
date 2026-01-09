# Restart Backend Server to Fix CORS

The CORS configuration has been updated to allow requests from `http://localhost:4173`.

## To apply the changes:

**If the server is running in a terminal:**
1. Stop it: Press `Ctrl+C` in the terminal where it's running
2. Restart it:
   ```bash
   cd backend
   source venv/bin/activate
   uvicorn app.main:app --reload
   ```

**If the server is running in the background:**
```bash
# Find and kill the process
lsof -ti:8000 | xargs kill -9

# Restart
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

**Or use the start script:**
```bash
cd backend
source venv/bin/activate
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

After restarting, the CORS error should be fixed and your frontend at `http://localhost:4173/referat/#/login` should be able to connect to the backend.

