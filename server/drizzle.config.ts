import { defineConfig } from "drizzle-kit";
import { env } from "./src/env";

export default defineConfig({
	schema: "./src/db/schema.ts",
    out: './.migrations',
	dialect: "postgresql",
	dbCredentials: {
        url: env.DATABASE_URL,
    },
});

//Este arquivo configura o Drizzle ORM, especificando o esquema do banco de dados e o local para armazenar as migrações.