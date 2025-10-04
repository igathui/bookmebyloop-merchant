# BookMeByLoop Merchant Portal

This is the merchant portal for BookMeByLoop, a business management and booking platform built with [Next.js](https://nextjs.org). Merchants can register their business, manage business information, and define services offered to customers.

## Features

- Business registration and login
- Secure authentication
- Add and manage business details (description, location, till number)
- Add, edit, and remove services with rates
- Dashboard for merchants
- Built with Prisma ORM and PostgreSQL

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to use the merchant portal.

## Database Setup

This project uses [Prisma](https://www.prisma.io/) and PostgreSQL.  
To apply schema changes and set up your database, run:

```bash
pnpm exec prisma migrate dev
```

## Project Structure

- `src/app/(protected)/register` – Merchant registration page
- `src/app/(protected)/login` – Merchant login page
- `src/app/business-info` – Business info management
- `src/app/api/auth/register` – Registration API
- `src/app/api/auth/login` – Login API
- `prisma/schema.prisma` – Database schema

## Reflections

The scope of this application was too ambitious for the allotted time during the Hackathon. As a result, this repository represents a working concept and prototype rather than a fully polished product. Key features and improvements remain as future work.

## Future Implementations/Ideas

Merchant analytics dashboard to keep track of customer satisfaction, turnaround, and retention

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

## Deployment

You can deploy this app on [Vercel](https://vercel.com/) or any platform supporting Next.js and PostgreSQL.

---
