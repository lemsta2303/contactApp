# Fullstack Application: ASP.NET Core + Angular

This is a fullstack application built using ASP.NET Core for the backend and Angular for the frontend. Below are the instructions to set up and run the application locally.

---

## **Prerequisites**
Before starting, ensure that you have the following tools installed on your machine:

1. **.NET SDK** (version 6.0 or later)  
   [Download .NET SDK](https://dotnet.microsoft.com/download)

2. **Node.js** (version 16 or later)  
   [Download Node.js](https://nodejs.org/)

3. **Angular CLI** (globally installed)  
   Install it using the following command:
   ```bash
   npm install -g @angular/cli
   ```

4. **Git** (optional, for cloning the repository)  
   [Download Git](https://git-scm.com/)

---

## **Getting Started**

### **1. Clone the Repository**
If the project is in a Git repository, clone it to your local machine:
```bash
git clone https://github.com/lemsta2303/contactApp.git
cd <repository_folder>
```

---

### **2. Setting up the Backend (ASP.NET Core)**

1. Navigate to the backend folder:
   ```bash
   cd backend/contactApp/contactApp
   ```

2. Restore NuGet dependencies:
   ```bash
   dotnet restore
   ```

3. Run the application:
   ```bash
   dotnet run
   ```

4. By default, the backend will be available at:
   - `https://localhost:7032` (HTTPS)
   - `http://localhost:5296` (HTTP)

---

### **3. Setting up the Frontend (Angular)**

1. Navigate to the frontend folder:
   ```bash
   cd frontend/contactApp
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Run the Angular application:
   ```bash
   ng serve
   ```

4. By default, the frontend will be available at:
   - `http://localhost:4200`

---

### **4. Configuring Backend URL in Frontend**

1. Ensure the frontend is correctly pointing to the backend.
2. Open the folder `frontend/contactApp/src/environments/services` and verify the `baseUrl` in services.
3. If necessary, update the URL to match your backend setup.

---

### **5. Database Configuration**
If your application uses a database:

1. Open the `appsettings.json` file in the `backend` folder.
2. Ensure the `ConnectionStrings` property is correctly configured for your database:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=YourDatabaseName;Trusted_Connection=True;"
     }
   }
   ```

3. Apply any pending database migrations:
   ```bash
   dotnet ef database update
   ```

---

### **6. Running the Application**
To run the entire application:

1. Start the backend:
   ```bash
   cd backend
   dotnet run
   ```

2. Start the frontend:
   ```bash
   cd frontend
   ng serve
   ```

3. Open the frontend in your browser:
   - Navigate to `http://localhost:4200`.

---

