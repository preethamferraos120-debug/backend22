# Database Integration

This assignment replaces in-memory post storage with PostgreSQL through Prisma while preserving the repository contract.

## Local setup

Copy `.env.example` to `.env` and update the local PostgreSQL credentials. Never commit `.env` or real credentials. Then run:

```bash
npm install
npm run prisma:format
npm run prisma:validate
npm run prisma:generate
npm run prisma:deploy
npm run prisma:seed
npm start
```

For a fresh local database where you need Prisma to create a new migration, run `npm run prisma:migrate` instead of `npm run prisma:deploy`. The committed SQL migration is the database history; do not replace it with `prisma db push`.

Seed data is repeatable because the script uses upserts. For reset testing, use only a disposable local development database and recreate it before running deploy and seed. Never run destructive reset commands on production or data you need.

Only repository modules import Prisma. The asynchronous contract is preserved: findAll returns an array, findById returns a record or null, create returns the complete record, update returns a record or null, and remove returns a boolean.
