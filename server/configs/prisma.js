import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';

import ws from 'ws';
neonConfig.webSocketConstructor = ws;

// Optional: enable querying over fetch for edge environments (Cloudflare Workers, Vercel Edge, etc.)
// neonConfig.poolQueryViaFetch = true

// Connection string from environment variables
const connectionString = `${process.env.DATABASE_URL}`;

// Initialize Neon adapter
const adapter = new PrismaNeon({ connectionString });

// Create Prisma client with Neon adapter
const prisma = global.prisma || new PrismaClient({ adapter });

// Prevent multiple instances in development
if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
