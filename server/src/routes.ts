import { FastifyInstance } from "fastify";
import { z } from 'zod';
import dayjs from 'dayjs';
import { prisma } from "./lib/prisma";

export async function appRoutes(app: FastifyInstance) {
    // Rota para criar os habitos
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

    // Rota para listar os habitos disponiveis e quais foram completados
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

        const day = await prisma.day.findUnique({
            where: {
                date: parsedDate.toDate()
            },
            include: {
                dayHabits: true
            }
        });

        const completedHabits = day?.dayHabits.map(dayHabit => {
            return dayHabit.habit_id
        })

        return {
            possibleHabits,
            completedHabits
        }
    });

    // Rota para completar ou não um hábito
    app.patch('/habits/:id/toggle', async (request) => {
        const toggleHabitParams = z.object({
            id: z.string().uuid()
        });

        const { id } = toggleHabitParams.parse(request.params);

        const today = dayjs().startOf('day').toDate();

        // Verificando se tem algum registro para o dia
        let day = await prisma.day.findUnique({
            where: {
                date: today
            }
        });

        // Caso não tenho, é criado um novo registro
        if (!day) {
            day = await prisma.day.create({
                data: {
                    date: today
                }
            });
        };

        // Buscando registro se o usuario marcou um registro como completo
        const dayHabit = await prisma.dayHabit.findUnique({
            where: {
                day_id_habit_id: {
                    day_id: day.id,
                    habit_id: id
                }
            }
        });

        if (dayHabit) {
            //  Se já tiver completado, remove a marcação
            await prisma.dayHabit.delete({
                where: {
                    id: dayHabit.id
                }
            });
        } else {
            // Função para completar o habito no dia
            await prisma.dayHabit.create({
                data: {
                    day_id: day.id,
                    habit_id: id
                }
            });
        }

    });

    // Rota para fazer o resumo do dia
    app.get('/summary', async (request) => {
        // [{date: 23-01-2023, possiveis: 5, completados: 1}, {...}, {...}]
        const summary = await prisma.$queryRaw`
            SELECT 
                D.id, 
                D.date,
                (
                    SELECT 
                        cast(count(*) as float)
                    FROM day_habits DH
                    WHERE DH.day_id = D.id
                ) as completed,
                (
                    SELECT 
                        cast(count(*) as float)
                    FROM habit_week_days HWD  
                    JOIN habits H ON H.id = HWD.habit_id    
                    WHERE 
                        -- Formantando a data para o padrao (primeiro parametro é o dia da semana, segundo é o valor a ser informado, terceiro é o formato que o valor está salvo)
                        HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
                        AND H.created_at <= D.date
                ) as amount 
            FROM days D
        `

        return summary;
    });
};
