import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { Box, Container, makeStyles, Typography } from '@material-ui/core'
import { notFound } from 'assets/images'
import { useHistory } from 'react-router-dom'

const NotFound = () => {
  const classes = useStyles()
  const history = useHistory()

  const handleBackClick = () => {
    history.push('/')
  }

  return (
    <Fragment>
      <Helmet>
        <title>404 | Not found</title>
      </Helmet>
      <Box className={classes.root}>
        <Container maxWidth="md">
          <Typography
            className={classes.title}
            align="center"
            color="textPrimary"
            variant="h1"
          >
            404: Trang bạn đến không tồn tại!
          </Typography>
          <Typography
            className={classes.backHome}
            align="center"
            color="textPrimary"
            variant="subtitle2"
            onClick={handleBackClick}
          >
            Quay về trang chủ?
          </Typography>
          <Box className={classes.imgBox}>
            <Box component="img" alt="404 image" src={notFound} />
          </Box>
        </Container>
      </Box>
    </Fragment>
  )
}

export default NotFound

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'background.default',
    display: 'flex',
    flexDirection: 'column',
    height: '90vh',
    justifyContent: 'center',
    overflowY: 'hidden',
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem',
  },
  imgBox: {
    textAlign: 'center',
    '& img': {
      marginTop: 50,
      display: 'inline-block',
      maxWidth: '100%',
      width: 560,
    },
  },
  backHome: {
    cursor: 'pointer',
    borderBottom: '1px solid black',
    display: 'inline-block',
    marginTop: theme.spacing(2),
  },
}))
