import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  // Aapke schema ka sahi rasta
  schema: "src/prisma/schema.prisma",
  
  // Database connection ko direct CLI ke liye configure kiya
  datasource: {
    url: process.env.DATABASE_URL,
  },
});