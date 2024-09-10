import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema' 
import { env } from '../env' 

export const client = postgres(env.DATABASE_URL) //cria uma conexão com o banco de dados
export const db = drizzle(client, {schema, logger: true}) //logger: true é para mostrar no console as queries que estão sendo executadas