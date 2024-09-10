//arquivo que vai popular o banco de dados com dados ficticios
import { client, db } from '.'
import { goalCompletions, goals } from './schema'
import dayjs from 'dayjs'


async function seed() {
    await db.delete(goalCompletions)  
    await db.delete(goals)  

    const result = await db.insert(goals).values([
        {title: 'Acordar cedo', desiredWeeklyFrequency: 5},
        {title: 'Fazer exercicios', desiredWeeklyFrequency: 3},
        {title: 'Meditar', desiredWeeklyFrequency: 1},
    ]).returning()

    const startOfWeek = dayjs().startOf('week') //pega o inicio da semana

    await db.insert(goalCompletions).values([
        { goalId: result[0].id, createAt: startOfWeek.toDate() }, //pega a data de inicio da semana
        { goalId: result[1].id, createAt: startOfWeek.add(1, 'day').toDate() }, //adiciona um dia 
        
    ])
}

seed().finally(() => {
    client.end()
})