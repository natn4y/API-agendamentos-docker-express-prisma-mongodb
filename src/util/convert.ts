import moment from 'moment'

export function toCent(price?: number | string) {
  if (price === undefined) {
    throw new Error('Preço não pode ser undefined')
  }

  return parseInt(
    price.toString().replace('.', '').replace(',', ''),
  )
}

export function hourToMinutes(hourMinutes: string): number {
  const [hour, minutes] = hourMinutes.split(':')
  const totalMinutes =
    parseInt(hour) * 60 + parseInt(minutes)
  return totalMinutes
}

export function sliceMinutes(
  start: any,
  end: any,
  duration: any,
) {
  console.log(start)
  console.log(end)
  const slices = []
  let count = 0

  start = moment(start).startOf('minute').add(3, 'hours')
  end = moment(end).startOf('minute').add(3, 'hours')

  while (end >= start) {
    let time = start.format('HH:mm')
    slices.push(time)

    start = start.add(duration, 'minutes')
    count++
  }

  return slices
}

export function slipByValue(
  array: any[],
  value: any,
): any[][] {
  let newArray: any[][] = [[]]
  array.forEach((item: any) => {
    if (item !== value) {
      newArray[newArray.length - 1].push(item)
    } else {
      newArray.push([])
    }
  })
  return newArray
}

export function mergeDataTime(data: any, time: any) {
  const merged = `${moment(data).format(
    'YYYY-MM-DD',
  )}T${moment(time).format('HH:mm')}`

  return merged
}
