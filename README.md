# Employee Management — 3-Tier Application

A complete 3-tier CRUD application:

- **Presentation tier:** React (frontend/)
- **Application/business tier:** Spring Boot REST API (backend/)
- **Data tier:** MySQL (database/)

```
React (port 3000)  <--HTTP/JSON-->  Spring Boot (port 8080)  <--JDBC-->  MySQL (port 3306)
```

## Project structure

```
three-tier-app/
├── backend/                 # Spring Boot app
│   ├── pom.xml
│   └── src/main/java/com/example/employeeapp/
│       ├── controller/      # REST endpoints
│       ├── service/         # Business logic
│       ├── repository/      # Spring Data JPA
│       ├── entity/          # JPA entities
│       ├── dto/             # Request/response objects
│       ├── exception/       # Global error handling
│       └── config/          # CORS config
├── frontend/                 # React app
│   └── src/
│       ├── api/              # Axios client
│       ├── components/       # EmployeeForm, EmployeeList
│       └── App.js
└── database/
    └── schema.sql            # Table + seed data (optional, Hibernate can auto-create)
```

## Prerequisites

- Java 17+
- Maven 3.8+
- Node.js 18+ and npm
- MySQL 8+ running locally

## 1. Set up MySQL

Create the database (or let Hibernate auto-create it — see `application.properties`):

```bash
mysql -u root -p < database/schema.sql
```

## 2. Configure and run the backend

Edit `backend/src/main/resources/application.properties` and set your MySQL password:

```properties
spring.datasource.username=root
spring.datasource.password=your_mysql_password
```

Then run:

```bash
cd backend
mvn spring-boot:run
```

The API starts on **http://localhost:8080**. Test it:

```bash
curl http://localhost:8080/api/employees
```

### API endpoints

| Method | Endpoint                          | Description                     |
|--------|------------------------------------|----------------------------------|
| GET    | /api/employees                     | List all employees               |
| GET    | /api/employees?department=X        | Filter by department             |
| GET    | /api/employees?search=X            | Search by first/last name        |
| GET    | /api/employees/{id}                | Get one employee                 |
| POST   | /api/employees                     | Create employee                  |
| PUT    | /api/employees/{id}                | Update employee                  |
| DELETE | /api/employees/{id}                | Delete employee                  |

## 3. Run the frontend

```bash
cd frontend
npm install
npm start
```

Opens on **http://localhost:3000** and talks to the backend via the URL in `frontend/.env`.

## Notes

- `spring.jpa.hibernate.ddl-auto=update` will auto-create/update the `employees` table on startup, so running `schema.sql` manually is optional.
- CORS is restricted to `http://localhost:3000` by default (`app.cors.allowed-origin` in `application.properties`).
- For production: externalize secrets (don't commit DB passwords), build the React app (`npm run build`) and serve it separately or behind Nginx, and package the backend as a jar (`mvn clean package`) or Docker image.
