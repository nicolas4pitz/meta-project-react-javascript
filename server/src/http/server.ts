import fastify from "fastify";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider} from "fastify-type-provider-zod"; //importando o fastify-type-provider-zod que é um plugin para o fastify que vai fazer a validação dos dados e serialização
import { createGoalRoute } from "./routes/create-goal";
import { createCompletionRoute } from "./routes/create-completion";
import { getPendingGoalsRoute } from "./routes/get-pending-goals";
import { getWeekSummaryRoute } from "./routes/get-week-summary";
import fastifyCors from "@fastify/cors";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
    origin: "*"
})

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute) //registrando as rotas
app.register(createCompletionRoute)  //registrando as rotas
app.register(getPendingGoalsRoute) 
app.register(getWeekSummaryRoute)

app.listen({
    port: 3000,
}).then(() => {
    console.log('Server is running on port 3000')
})

//Ponto Central do Servidor: Este arquivo serve como o ponto de entrada para o seu servidor backend. Ele configura o servidor, registra todas as rotas necessárias e inicia o processo de escuta de requisições.
//Modularização: Ao importar e registrar rotas de arquivos separados, você mantém seu código organizado e modular, facilitando a manutenção e escalabilidade do projeto.
//Validação Robusta: Com a integração do Zod, você garante que todas as interações com a API seguem os padrões esperados, evitando erros comuns causados por dados inválidos.