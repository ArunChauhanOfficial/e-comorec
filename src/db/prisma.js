// import {PrismaClient} from "@prisma/client";


// const prisma = new PrismaClient({})

// export {prisma}

// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

// // Isse Node.js bina kisi ESM export issue ke seedhe package ko load kar lega
// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// export default prisma;



// import { PrismaClient } from "@prisma/client/default.js";

// const prisma = new PrismaClient();

// export default prisma;


// import { PrismaClient } from "@prisma/client";

// // Safe check: Agar globalThis.prisma ek valid object nahi hai, toh hi naya banao
// if (!globalThis.prisma || typeof globalThis.prisma.findMany !== 'function') {
//   globalThis.prisma = new PrismaClient();
// }

// const prisma = globalThis.prisma;

// export default prisma;



// import { PrismaClient } from "@prisma/client";

// // Prisma v7 ka sabse standard aur safe tarika connection string pass karne ka:
// const prisma = new PrismaClient({
//   datasourceUrl: process.env.DATABASE_URL,
// });

// export { prisma };



// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

// // ESM ke export issues ko bypass karne ka sabse solid tareeka
// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient({
//   // datasourceUrl: process.env.DATABASE_URL,
// });

// export { prisma };







// import { PrismaClient } from '@prisma/client';
// import { PrismaPg } from '@prisma/adapter-pg';
// import { Pool } from 'pg';

// const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// const adapter = new PrismaPg(pool);

// // ✅ Correct: Pass adapter inside options object
// const prisma = new PrismaClient({ adapter });   


// export default prisma


// import { PrismaClient } from "./path/to/generated/prisma";
// import { PrismaPg } from "@prisma/adapter-pg";

// const adapter = new PrismaPg({
//   connectionString: process.env.DATABASE_URL,
// });

// const prisma = new PrismaClient({ adapter });


// export {prisma}


// import "dotenv/config"; // Ensure env variables are loaded
// import pg from "pg";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaClient } from "./generated/client/index.js"; // 👈 Naya local path

// // 1. Pehle normal Postgres pool banao
// const pool = new pg.Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// // 2. Us pool ko Prisma ke official adapter mein daalo
// const adapter = new PrismaPg(pool);

// // 3. Ab PrismaClient ko adapter ke sath initialize karo (Prisma v7 standard)
// const prisma = new PrismaClient({ adapter });

// export { prisma };


// import "dotenv/config";
// import pg from "pg";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { createRequire } from "module";

// const require = createRequire(import.meta.url);
// const { PrismaClient } = require("@prisma/client"); // Sabse safe tarika ESM mein v7 ke liye

// // 1. Postgres connection pool
// const pool = new pg.Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// // 2. Driver adapter initialization
// const adapter = new PrismaPg(pool);

// // 3. Create Prisma client using driver adapter
// const prisma = new PrismaClient({ adapter });

// export { prisma };


import "dotenv/config";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { PrismaClient } = require("@prisma/client");

// Postgres Connection Pool with explicit SSL bypass
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // 👈 Yeh self-signed certificate ka jhanjhat rokta hai
  },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export { prisma };