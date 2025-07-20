# Node.js + Express Backend with PostgreSQL and Prisma 🚀

A comprehensive guide to setting up a Node.js Express backend with PostgreSQL database using Prisma ORM.

## Steps to setup the backend

1. Initialize Your Project:
    Create a new directory for your project
        mkdir my-express-app
        cd my-express-app

2. Initialize npm project:
    npm init

3. Install Dependencies:
    npm i express cookie-parser cors dotenv pg @prisma/client
    npm i -D nodemon prisma

4. Initialize Prisma:
    npx prisma init

5. Configure Environment Variables:
    DATABASE_URL="postgresql://username:password@localhost:5432/dbname?schema=public"
    PORT=PORT_NO
    CORS_ORIGIN=*        

6. Define Your Data Model:
    Edit prisma/schema.prisma to define your database schema:

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

7. Push Schema to Database:
    npx prisma db push

8. Generate Prisma Client:
    npx prisma generate 

9. Create Your Express Server

10. Run the Application:
    npm run dev

npm i express cookie-parser cors dotenv pg @prisma/client
npm i -D nodemon prisma
npx prisma init
in .env -
DATABASE_URL="postgresql://username:password@localhost:5432/dbname?schema=public"
PORT=5000
CORS_ORIGN=*
data model in schema.prisma
npx prisma db push
npx prisma generate
npm run dev
these are the steps to setup the node express backend with postgredb using prisma. 
Can you give me a comprehensive readme file regarding to this to push in git  