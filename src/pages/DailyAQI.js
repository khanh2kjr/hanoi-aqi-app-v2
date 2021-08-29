import React, { useEffect, useState, memo } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { DAILY_TYPE } from 'const/api'
import { CommonSelect as SelectChartType } from 'components'
import { getType, refactorDailyAQIChart } from 'utils'
import { Bar } from 'react-chartjs-2'
import { dailyAqiApi } from 'api/dailyAqiApi'

const DailyAQI = () => {
  const classes = useStyles()
  const [district] = useSelector(({ district }) => [district.district])
  const { id } = district

  const [dailyData, setDailyData] = useState([])
  const [type, setType] = useState(DAILY_TYPE.pm25)

  const fetchDailyAQI = async (type, id) => {
    const { data } = await dailyAqiApi.getDaily(type, id)
    setDailyData(data)
  }

  const handleChartChange = (newType) => {
    setType(newType)
  }

  useEffect(() => {
    if (!id) return

    fetchDailyAQI(type, id)
  }, [id, type])

  return (
    <Grid container spacing={2}>
      <SelectChartType
        className={classes.selectChart}
        label="Loại chỉ số"
        data={getType(DAILY_TYPE)}
        onChange={handleChartChange}
        defaultValue={type}
      />
      <Grid item xs={12}>
        <Bar data={refactorDailyAQIChart(dailyData, type)} />
      </Grid>
    </Grid>
  )
}

export default memo(DailyAQI)

const useStyles = makeStyles((theme) => ({
  selectChart: {
    width: '30%',
    margin: theme.spacing(1, 0, 0, 1),
  },
}))
