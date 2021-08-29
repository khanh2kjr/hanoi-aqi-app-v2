import React, { useEffect, useState, memo } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { dailyStatApi } from 'api/dailyStatApi'
import { DAILY_TYPE } from 'const/api'
import { CommonSelect as SelectChartType } from 'components'
import { getType, refactorDailyStatChart } from 'utils'
import { Line } from 'react-chartjs-2'

const DailyStat = () => {
  const classes = useStyles()
  const [district] = useSelector(({ district }) => [district.district])
  const { id } = district

  const [dailyData, setDailyData] = useState([])
  const [type, setType] = useState(DAILY_TYPE.pm25)

  const fetchDailyStat = async (type, id) => {
    const { data } = await dailyStatApi.getDaily(type, id)
    setDailyData(data)
  }

  const handleChartChange = (newType) => {
    setType(newType)
  }

  useEffect(() => {
    if (!id) return

    fetchDailyStat(type, id)
  }, [id, type])

  return (
    <Grid container spacing={2}>
      <SelectChartType
        className={classes.selectChart}
        label="Loại dữ liệu"
        data={getType(DAILY_TYPE)}
        onChange={handleChartChange}
        defaultValue={type}
      />
      <Grid item xs={12}>
        <Line data={refactorDailyStatChart(dailyData, type)} />
      </Grid>
    </Grid>
  )
}

export default memo(DailyStat)

const useStyles = makeStyles((theme) => ({
  selectChart: {
    width: '30%',
    margin: theme.spacing(1, 0, 0, 1),
  },
}))
