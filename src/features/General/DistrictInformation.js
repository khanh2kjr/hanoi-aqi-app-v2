import React from 'react'
import { Typography, Box, makeStyles } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { getEvaluate } from 'utils'
import { EVALUATE } from 'const/app'

const DistrictInformation = () => {
  const [district] = useSelector(({ district }) => [district.district])

  const evaluate = getEvaluate(EVALUATE, district.aqi || {})

  const classes = useStyles({ color: evaluate?.color?.value || '#D1D1D1' })

  return (
    <Box className={classes.root}>
      <Typography className={classes.districtName}>
        {district.address}
      </Typography>
      <Typography className={classes.informationTitle}>
        Thông tin chỉ số AQI chung
      </Typography>
      <Box className={classes.aqiResult}>
        <Box className={classes.indexAqiNumber} component="span">
          {district.aqi}
        </Box>
        <Box className={classes.indexAqiText}>
          <Typography className={classes.evaluateTitle}>
            {evaluate?.label}
          </Typography>
          <Typography className={classes.evaluateParagraph}>
            {evaluate?.text || 'Vui lòng chọn điểm đo để xem chi tiết'}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default DistrictInformation

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  districtName: {
    textAlign: 'center',
    backgroundColor: '#D1D1D1',
    textTransform: 'uppercase',
    color: '#A09B9B',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(0.5),
  },
  informationTitle: {
    fontWeight: 600,
    marginTop: theme.spacing(2),
  },
  aqiResult: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  indexAqiNumber: {
    backgroundColor: ({ color }) => color,
    borderRadius: theme.spacing(0.5),
    display: 'inline-block',
    padding: theme.spacing(7),
    fontSize: '3rem',
  },
  indexAqiText: {
    marginLeft: theme.spacing(2),
  },
  evaluateTitle: {
    fontSize: '3rem',
  },
}))
