import { FastifyInstance } from "fastify";
import { z } from 'zod';
import dayjs from 'dayjs';
import { prisma } from "./lib/prisma";

export async function appRoutes(app: FastifyInstance) {
    app.post('/habits', async (request) => {
        const createHabitBody = z.object({
            title: z.string(),

            //validando os dias da semana, para criar apenas 7 dias no array 
            weekDays: z.array(z.number().min(0).max(6))
        });

        const { title, weekDays } = createHabitBody.parse(request.body);

        // Formatando a data para vir com as horas zeradas
        const today = dayjs().startOf('day').toDate()

        await prisma.habit.create({
            data: {
                title,
                created_at: today,

                // Criando junto os dias da semana em que o habito ficará disponível
                weekDays: {
                    create: weekDays.map(weekDay => {
                        return {
                            week_day: weekDay
                        }
                    })
                }
            }
        })
    });

    app.get('/day', async (request) => {
        const getDayParams = z.object({
            // Função coerce é para converter os dados para o formato desejada, nesse caso, converter para date
            date: z.coerce.date()
        });

        const { date } = getDayParams.parse(request.query);

        // Pegando o dia da semana, relativo a data informada
        const parsedDate = dayjs(date).startOf('day');
        const weekDay = parsedDate.get('day');

        const possibleHabits = await prisma.habit.findMany({
            where: {
                created_at: {
                    // Buscando as informações onde a data é menor ou igual a que está sendo informada
                    lte: date
                },
                weekDays: {
                    some: {
                        week_day: weekDay
                    }
                }
            }
        });

        return {
            possibleHabits            
        }
    });
};
