import dayjs from "dayjs";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import { and, count, eq, gte, lte, sql } from "drizzle-orm";

export async function getWeekSummary() {

    const firstDayOfWeek = dayjs().startOf("week").toDate();
    const lastDayOfWeek = dayjs().endOf("week").toDate();

    const goalsCreatedUpToWeek = db.$with("goals_created_up_to_week").as(
		db
			.select({
				id: goals.id,
				title: goals.title,
				desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
				createdAt: goals.createAt,
			})
			.from(goals)
			.where(lte(goals.createAt, lastDayOfWeek))
	)

    const goalsCompletedInWeek = db.$with("goals_completed_in_week").as(
		db
			.select({
				id: goalCompletions.id,
                title: goals.title,
                completedAt: goalCompletions.createAt,
                completedAtDate: sql`DATE(${goalCompletions.createAt})`.as('completedAtDate'),
			})
			.from(goalCompletions)
            .innerJoin(goals, eq(goals.id, goalCompletions.goalId))
            .where(and(
                gte(goalCompletions.createAt, firstDayOfWeek),
                lte(goalCompletions.createAt, lastDayOfWeek),
            ))
	)

    const goalsCompletedByWeekDay = db.$with("goals_completed_by_week_day").as(
        db.select({
            completedAtDate: goalsCompletedInWeek.completedAtDate,
            completions: sql`JSON_AGG(
            JSON_BUILD_OBJECT(
                'id', ${goalsCompletedInWeek.id},
                'title', ${goalsCompletedInWeek.title},
                'completedAt', ${goalsCompletedInWeek.completedAt}
            ))`.as('completions')
        }
        ).from(goalsCompletedInWeek).groupBy(goalsCompletedInWeek.completedAtDate)
    )

    const result = await db.with(goalsCreatedUpToWeek, goalsCompletedInWeek, goalsCompletedByWeekDay).select({
        completed: sql`(SELECT COUNT(*) FROM ${goalsCompletedInWeek})`.mapWith(Number),
        total: sql`(SELECT SUM(${goalsCreatedUpToWeek.desiredWeeklyFrequency}) FROM ${goalsCreatedUpToWeek})`.mapWith(Number),
        goalsPerDay: sql`JSON_OBJECT_AGG(
            ${goalsCompletedByWeekDay.completedAtDate},
            ${goalsCompletedByWeekDay.completions}
        )`
    }).from(goalsCompletedByWeekDay)

    return{
        summary: result
    }
}
