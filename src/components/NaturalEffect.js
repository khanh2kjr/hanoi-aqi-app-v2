import React from 'react'
import { Paper, makeStyles, Box, Typography } from '@material-ui/core'

const NaturalEffect = ({ title, icon, numeral }) => {
  const classes = useStyles()

  return (
    <Paper className={classes.root} elevation={0}>
      <Box className={classes.information}>
        <Box className={classes.index}>
          <Typography className={classes.title}>{title}</Typography>
          <Typography className={classes.numeral}>{numeral}</Typography>
        </Box>
        <Box className={classes.icon} component="img" src={icon}></Box>
      </Box>
      <Box></Box>
    </Paper>
  )
}

export default NaturalEffect

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    boxShadow:
      'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(63 63 68 / 15%) 0px 1px 2px 0px',
    backgroundColor: '#D1D1D1',
  },
  information: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'rgb(107 119 140)',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  numeral: {
    fontSize: '1rem',
  },
  icon: {
    height: '50px',
    width: '50px',
  },
}))
