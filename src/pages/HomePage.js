import React, { Fragment, useState } from 'react'
import { Map } from 'features'
import { CommonSelect } from 'components'
import { makeStyles } from '@material-ui/core'

const HomePage = () => {
  const classes = useStyles()
  const [range, setRange] = useState(1)

  const onMapChange = (newValue) => {
    setRange(newValue)
  }

  return (
    <Fragment>
      <CommonSelect
        className={classes.select}
        onChange={onMapChange}
        label="Phạm vi"
        data={data}
        defaultValue={range}
      />
      <Map range={range} />
    </Fragment>
  )
}

export default HomePage

const useStyles = makeStyles((theme) => ({
  select: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}))

const data = [
  {
    id: 1,
    name: 'Hà Nội',
  },
  {
    id: 2,
    name: 'Việt Nam',
  },
]
