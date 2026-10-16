require('dotenv').config();

const { PrismaClient } = require('@prisma/client');

// One shared Prisma client for the lifetime of this application process.
const prisma = new PrismaClient();

module.exports = prisma;
