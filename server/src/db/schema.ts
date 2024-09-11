import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2"; //gera um id unico

export const goals = pgTable("goals", {
	id: text("id").primaryKey().$defaultFn(() => createId()), // quando inserir um registro na tabela, ele vai preencher o id automaticamente que utiliza o algoritio cuid2
	title: text("title").notNull(), 
	desiredWeeklyFrequency: integer("desired_weekly_frequency").notNull(), 
	createAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(), //pega o horario baseado no fuso horario
});

export const goalCompletions = pgTable("goal_completions", { 
	id: text("id").primaryKey().$defaultFn(() => createId()), 
	goalId: text("goal_id")
		.references(() => goals.id)
		.notNull(),
	createAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
});

//Este arquivo define a estrutura das tabelas goals (metas) e goalCompletions (conclusão de metas), com colunas, tipos de dados e chaves primárias/estrangeiras.