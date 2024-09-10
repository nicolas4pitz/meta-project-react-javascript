import fastify from "fastify";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider} from "fastify-type-provider-zod"; //importando o fastify-type-provider-zod que é um plugin para o fastify que vai fazer a validação dos dados e serialização
import { createGoalRoute } from "./routes/create-goal";
import { createCompletionRoute } from "./routes/create-completion";
import { getPendingGoalsRoute } from "./routes/get-pending-goals";
import { getWeekSummaryRoute } from "./routes/get-week-summary";

const app = fastify().withTypeProvider<ZodTypeProvider>();

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