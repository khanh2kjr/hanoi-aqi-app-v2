import React from 'react'
import {
  makeStyles,
  Box,
  CircularProgress as Progress,
} from '@material-ui/core'

const CircularProgress = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Progress />
    </Box>
  )
}

export default CircularProgress

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D1D1D1',
    opacity: '0.3',
  },
}))
