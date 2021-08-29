import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { DailyStat, DailyAQI, NotFound, HomePage } from 'pages'
import { Box, makeStyles, Grid, Typography } from '@material-ui/core'
import { NaturalEffect } from 'components'
import { temperatureIcon, humidityIcon } from 'assets/images'
import { useSelector } from 'react-redux'
import { General } from 'features'

const Section = () => {
  const classes = useStyles()

  const [district] = useSelector(({ district }) => [district.district])
  const [closestDistance] = useSelector(({ user }) => [user.nearestMoniPoint])

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <NaturalEffect
            title="Nhiệt độ"
            numeral={
              district.temp
                ? `${district.temp}°C`
                : 'Vui lòng chọn điểm đo để xem chi tiết'
            }
            icon={temperatureIcon}
          />
        </Grid>
        <Grid item xs={3}>
          <NaturalEffect
            title="Độ ẩm"
            numeral={
              district.humid
                ? `${district.humid}%`
                : 'Vui lòng chọn điểm đo để xem chi tiết'
            }
            icon={humidityIcon}
          />
        </Grid>
        <Grid item xs={6} className={classes.warning}>
          <Typography>
            {closestDistance.name
              ? `Chú ý: Bạn đang ở gần điểm đo ${closestDistance.name} - ${closestDistance.address} nhất, khoảng cách là ${closestDistance.range.toFixed(2)}km | chỉ số AQI: ${closestDistance.aqi}`
              : 'Vui lòng bật vị trí để xem điểm đo gần nhất!'}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <General />
        </Grid>
        <Grid item xs={8}>
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/daily-stat" component={DailyStat} exact />
            <Route path="/daily-aqi" component={DailyAQI} exact />
            <Route component={NotFound} />
          </Switch>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Section

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 2, 0, 2),
  },
  warning: {
    display: 'flex',
    alignItems: 'center',
  },
}))
