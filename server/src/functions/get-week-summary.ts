import dayjs from "dayjs";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import { and, count, lte, sql, gte, eq} from "drizzle-orm";

export async function getWeekSummary() {
    return{
        summary: 'teste'
    }
}
