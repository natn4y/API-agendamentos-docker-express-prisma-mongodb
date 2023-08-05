import { prisma } from '@database/prismaClient'
import { Request, Response } from 'express'
import moment from 'moment'
import _ from 'lodash'

export class DiasDisponiveisController {
  async handle(request: Request, response: Response) {
    try {
      const SLOT_DURATION = 30
      const START_HOUR = 9
      const END_HOUR = 18
      const END_MINUTE = 30

      const { data, salaoId, servicoId } = request.body

      const service = await prisma.services.findFirst({
        where: {
          id: servicoId,
        },
        select: {
          duracao: true,
        },
      })

      const agendamentos =
        await prisma.agendamento.findMany()

      const agendamentoTimes = agendamentos.map(
        agendamento => {
          return {
            date: moment(agendamento.data).format(
              'YYYY-MM-DD',
            ),
            time: moment(agendamento.data).format('HH:mm'),
          }
        },
      )

      const generateDates = (
        year: number,
        month: number,
      ): any[] => {
        let date = moment({
          year: year,
          month: month - 1,
          day: 1,
          hour: START_HOUR,
          minute: 0,
        })
        let endOfMonth = moment(date).endOf('month')
        let dates: any[] = []

        while (date <= endOfMonth) {
          let times: string[] = []
          while (
            date.hour() < END_HOUR ||
            (date.hour() === END_HOUR &&
              date.minute() < END_MINUTE) ||
            (date.hour() === END_HOUR &&
              date.minute() === END_MINUTE)
          ) {
            let time = date.format('HH:mm')
            // Checks if there is an appointment at the current date and time
            if (
              !agendamentoTimes.some(
                agendamentoTime =>
                  agendamentoTime.date ===
                    date.format('YYYY-MM-DD') &&
                  agendamentoTime.time === time,
              )
            ) {
              times.push(time)
            }
            date.add(SLOT_DURATION, 'minutes')
          }
          dates.push({
            date: date
              .clone()
              .startOf('day')
              .format('YYYY-MM-DD'),
            times: times,
          })
          date
            .startOf('day')
            .add(1, 'day')
            .hour(START_HOUR)
            .minute(0)
        }
        return dates
      }

      let currentDate = moment()
      let dates = generateDates(
        currentDate.year(),
        currentDate.month() + 1,
      )

      const entries = dates.map(entry => {
        return {
          salaoId,
          date: entry.date,
          times: _.chunk(entry.times, 2), // Now chunk the times
        }
      })

      let agenda: any[] = [...entries]

      return response.status(200).json({
        agenda,
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
