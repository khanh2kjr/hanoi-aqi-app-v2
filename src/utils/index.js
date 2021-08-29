import { RADIUS_OF_THE_EARTH } from 'const/app'

export const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

export const getType = (objectType) => {
  const result = []

  for (let type in objectType) {
    result.push({
      id: objectType[type],
      name: objectType[type],
    })
  }

  return result
}

export const refactorDailyStatChart = (data, label, color) => {
  return {
    labels:
      !!data.length &&
      data
        .filter((daily) => daily.time.indexOf('12:00') !== -1)
        .map((daily) => daily.time.slice(0, 10)),
    datasets: [
      {
        data:
          !!data.length &&
          data
            .filter((daily) => daily.time.indexOf('12:00') !== -1)
            .map((daily) => (daily.value ? daily.value : '15')),
        label: `Nồng độ ${label}`,
        borderColor: '#000000',
        fill: true,
        backgroundColor: color,
      },
    ],
  }
}

export const refactorDailyAQIChart = (data, label, color) => {
  return {
    labels:
      !!data.length &&
      data.map((daily) => daily.time.slice(0, daily.time.length - 3)),
    datasets: [
      {
        data:
          !!data.length && data.map((daily) => (daily.value ? daily.value : 0)),
        label: `Chỉ số AQI ${label}`,
        borderColor: '#000',
        fill: true,
        backgroundColor: color,
      },
    ],
  }
}

export const getDistance = (startLocation, endLocation) => {
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180)
  }

  const dLatitude = deg2rad(endLocation?.latitude - startLocation?.latitude)
  const dLongtitude = deg2rad(
    endLocation?.longtitude - startLocation?.longtitude
  )

  const ctx =
    Math.sin(dLatitude / 2) * Math.sin(dLatitude / 2) +
    Math.cos(deg2rad(startLocation?.latitude)) *
      Math.cos(deg2rad(endLocation?.latitude)) *
      Math.sin(dLongtitude / 2) *
      Math.sin(dLongtitude / 2)

  const vare = 2 * Math.atan2(Math.sqrt(ctx), Math.sqrt(1 - ctx))
  const distance = RADIUS_OF_THE_EARTH * vare

  return distance
}

export const getEvaluate = (evaluateData, aqiIndex) => {
  if (!aqiIndex || !evaluateData.length) return undefined

  const result = evaluateData.find((evaluate) => {
    const rank = evaluate.rank.split('-')
    const startRank = Number(rank[0])
    const endRank = Number(rank[1])
    return startRank <= aqiIndex && aqiIndex <= endRank
  })

  return result
}