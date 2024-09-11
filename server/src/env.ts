import z from 'zod' //biblioteca para validação de dados


const envSchema = z.object({
    DATABASE_URL: z.string().url(),
});

export const env = envSchema.parse(process.env)

//Esse arquivo garante que a variavel exista, que no caso é a DATABASE_URL do .env
//Este arquivo garante que a variável DATABASE_URL, necessária para a conexão ao banco de dados, está presente e correta, validando-a antes do uso.