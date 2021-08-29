import React from 'react'
import { Box, Typography, makeStyles } from '@material-ui/core'
import DistrictInformation from './DistrictInformation'
import { useDispatch, useSelector } from 'react-redux'
import { CommonSelect as SelectDistrict } from 'components'
import { selectSuccess } from 'slices/district'
import { EvaluateTable } from 'layouts'

const General = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [districts, promiseStatus] = useSelector(({ district }) => [
    district.districts,
    district.promiseStatus,
  ])

  const handleDistrictChange = (id) => {
    dispatch(selectSuccess(id))
  }

  return (
    <Box>
      <Typography className={classes.generalTitle}>Chọn điểm đo</Typography>
      <SelectDistrict
        className={classes.selectDistrict}
        onChange={handleDistrictChange}
        label="Khu vực"
        data={refactorDataSelect(districts)}
        promiseStatus={promiseStatus}
      />
      <DistrictInformation />
      <EvaluateTable />
    </Box>
  )
}

export default General

const refactorDataSelect = (data) => {
  if (!data?.length) return
  return data.map((ele) => ({ ...ele, name: ele?.name }))
}

const useStyles = makeStyles((theme) => ({
  selectDistrict: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  generalTitle: {
    padding: theme.spacing(1),
    fontWeight: 600,
    color: '#ffffff',
    backgroundColor: '#6DBC2F',
    borderRadius: theme.spacing(0.5),
  },
}))
