# Node.js + Express Backend with PostgreSQL and Prisma 🚀

A comprehensive guide to setting up a Node.js Express backend with PostgreSQL database using Prisma ORM.

## Steps to setup the backend

1. Initialize Your Project:
    Create a new directory for your project
```bash    
        mkdir my-express-app
        cd my-express-app
```        

2. Initialize npm project:
```bash
    npm init
```

3. Install Dependencies:
```bash
    npm i express cookie-parser cors dotenv pg @prisma/client
    npm i -D nodemon prisma
```    

4. Initialize Prisma:
```bash
    npx prisma init
```

5. Configure Environment Variables:
```bash
    DATABASE_URL="postgresql://username:password@localhost:5432/dbname?schema=public"
    PORT=PORT_NO
    CORS_ORIGIN=*        
```

6. Define Your Data Model:
    Edit prisma/schema.prisma to define your database schema:
```bash
>>>>>>> 2c91362d1629df9fa9bed7a3e19a60a9e2ac5277
    generator client {
        provider = "prisma-client-js"
        // output   = "../src/generated/prisma"
    }

    datasource db {
        provider = "postgresql"
        url      = env("DATABASE_URL")
    }

    model User {
        id        Int      @id @default(autoincrement())
        username  String   @unique
        phone     String   @unique
        email     String   @unique
        age       Int       
        createdAt DateTime @default(now())
        updatedAt DateTime @updatedAt
    }
```

7. Push Schema to Database:
```bash
    npx prisma db push
```

8. Generate Prisma Client:
```bash
    npx prisma generate 
```

9. Create Your Express Server and update the script in package.json:
```bash
    "scripts": {
        "dev": "nodemon src/index.js",
        "prisma": "npx prisma",
    }
```

10. Run the Application:
```bash
    npm run dev
```
