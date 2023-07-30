import { prisma } from '@database/prismaClient'
import { Request, Response } from 'express'
import moment from 'moment'
import _ from 'lodash'

export class DiasDisponiveisController {
  async handle(request: Request, response: Response) {
    try {
      let SLOT_DURATION = 30

      const { data, salaoId, servicoId } = request.body

      const horarios = await prisma.horario.findMany({
        where: {
          salaoId: salaoId,
        },
      })

      const service = await prisma.services.findFirst({
        where: {
          id: servicoId,
        },
        select: {
          duracao: true,
        },
      })

      let agenda = [] as any
      let colaboradores: any[] = []

      interface DateEntry {
        date: string
        times: string[][]
      }

      const generateDates = (
        year: number,
        month: number,
      ): DateEntry[] => {
        let date = moment({
          year: year,
          month: month - 1,
          day: 1,
          hour: 7,
          minute: 0,
        })
        let endOfMonth = moment(date).endOf('month')
        let dates: DateEntry[] = []

        while (date <= endOfMonth) {
          let dateEntry: DateEntry = {
            date: date.format('YYYY-MM-DD'),
            times: [],
          }

          // Adicionando horários em intervalos de 30 minutos de 07:00 às 12:30
          let times: string[] = []
          while (date.hour() < 13) {
            try {
              times.push(date.format('HH:mm'))
              date.add(30, 'minutes')
            } catch (error) {
              console.log(error)
            }
          }

          // Dividir horários em grupos de 2
          dateEntry.times = _.chunk(times, 2)

          dates.push(dateEntry)

          console.log(dateEntry)

          // Ajuste a hora para o início do próximo dia
          date.add(1, 'day').hour(7).minute(0)
        }
        return dates
      }

      let dates = generateDates(2023, 7)

      const entries = dates.map(entry => {
        return {
          salaoId,
          date: entry.date,
          times: entry.times,
        }
      })

      // Adiciona as entradas à agenda
      agenda = [...entries]

      return response.status(200).json({
        agenda,
        colaboradores,
      })
    } catch (error) {
      console.error(error)
      return response.status(500).json({
        error:
          'An error occurred while processing your request.',
      })
    }
  }
}
