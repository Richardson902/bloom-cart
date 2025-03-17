# Bloom Cart - Flower Shop

Bloom Cart is an online flower shop where users can browse, purchase flowers, and leave reviews. The platform provides role-based access, allowing users, agents, and admins to perform different actions.

## Features

### Unverfied Users
- Browse products
- Add items to their cart

### Verfied Users
- Checkout and place orders
- Leave reviews for purchased products

### Agents
- Manage orders
- Update delivery status

### Admins
- Add new products
- Manage orders
- Update order statuses

### Architecture
- **Backend:** Spring Boot Rest API
- **Security:** Spring Security and JWT
- **Frontend:** React (Running on port `5173` for development and `8081` for production)
- **Database:** PostgreSQL (Running on port `5432`)
- **Production:** Nginx (Serving on port `8081`)
- **Development:** Vite (Automatically proxies API requests to backend)
- **Containerized with Docker:** Easily deploy and run with Docker Compose

## Setup Instructions

### Clone the Repository:
```bash
git clone https://github.com/Richardson902/bloom-cart
cd bloom-cart
```

### Running the Application with Docker:
The application is containerized with Docker. To run the full application (both frontend and backend), simply use the following command:
```bash
docker compose up --build
```

### Access the Application
- For **production version**, navigate to `http://localhost:8081`
- For **development version**, navigate to `http://localhost:5173`
- For **viewing the database**, use any method to connect to the database. The username is `postgres` and the password is `topsecret`
- To **log in as admin**, the application automatically creates a default admin user with email `admin@admin.com` and password `admin123`

## Technologies Used
- **Spring Boot**
- **Spring Security**
- **JWT**
- **React**
- **Vite**
- **Nginx**
- **PostgreSQL**
- **Docker, Docker Compose**

## Example Screenshot
![bloom-cart](https://github.com/user-attachments/assets/2ed4a7a4-5d96-452e-b979-8ca0bfd41aa3)
