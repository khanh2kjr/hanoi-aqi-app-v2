import React, { useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { PinDrop } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { turnOff, turnOn, nearestUser } from 'slices/user'
import MenuDrawer from './MenuDrawer'
import { getDistance } from 'utils'
import { logo } from 'assets/images'

const Header = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [districts] = useSelector(({ district }) => [district.districts])

  const [isShowDialogGetLocation, setIsShowDialogGetLocation] = useState(false)

  const [isOpenUserLocation] = useSelector(({ user }) => [user.isOpen])

  const getLocation = (success) => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }

    const error = () => {
      alert('Vui lòng cho phép trình duyệt mở tính năng này!')
    }

    const geolocation = navigator.geolocation

    if (geolocation) {
      geolocation.getCurrentPosition(success, error, options)
      return
    }
  }

  const handleLocationClick = () => {
    setIsShowDialogGetLocation(true)
  }

  const handleCloseDialog = () => {
    setIsShowDialogGetLocation(false)
  }

  const handleGetUserLocation = () => {
    handleCloseDialog()

    if (isOpenUserLocation) {
      dispatch(turnOff())
      return
    }

    getLocation(({ coords }) => {
      const { latitude, longitude } = coords
      const userLocation = {
        latitude,
        longtitude: longitude,
      }

      if (districts.length) {
        const monitoringPointInfoList = districts.map((district) => {
          const locationPoint = {
            latitude: district.latitude,
            longtitude: district.longtitude,
          }

          return {
            name: district.name,
            address: district.address,
            aqi: district.aqi,
            aqiText: district.aqiText,
            range: getDistance(userLocation, locationPoint),
          }
        })

        const nearestMoniPoint = monitoringPointInfoList.find((moniPoint) => {
          return (
            moniPoint.range ===
            Math.min(
              ...monitoringPointInfoList.map((moniPoint) => moniPoint.range)
            )
          )
        })

        dispatch(nearestUser(nearestMoniPoint))
      }

      dispatch(
        turnOn({
          latitude,
          longitude,
        })
      )
    })
  }

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit">
          <Box component="img" src={logo} />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Cổng thông tin mức độ ô nhiễm không khí Thủ đô Hà Nội
        </Typography>
        <IconButton
          className={classes[isOpenUserLocation ? 'turnOn' : 'turnOff']}
          color="inherit"
          onClick={handleLocationClick}
        >
          <PinDrop />
        </IconButton>
        <IconButton edge="start" className={classes.menuButton} color="inherit">
          <MenuDrawer />
        </IconButton>
      </Toolbar>
      <Dialog open={isShowDialogGetLocation} onClose={handleCloseDialog}>
        <DialogTitle>Vị trí</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isOpenUserLocation
              ? 'Bạn có muốn tắt vị trí hiện tại không?'
              : 'Lấy vị trí hiện tại và hiển thị lên trên bản đồ!'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleGetUserLocation} color="primary" autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  )
}

export default Header

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#6DBC2F',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  turnOn: {
    color: '#007500',
  },
  turnOff: {
    color: '#a04c4c',
  },
}))
