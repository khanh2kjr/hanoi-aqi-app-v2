import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core'
import { BrightnessAuto, Exposure, Home, Menu } from '@material-ui/icons'
import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'

const menus = [
  {
    id: 1,
    label: 'Trang chủ',
    path: '/',
    icon: <Home />,
  },
  {
    id: 2,
    label: 'Nồng độ',
    path: '/daily-stat',
    icon: <Exposure />,
  },
  {
    id: 3,
    label: 'Chỉ số',
    path: '/daily-aqi',
    icon: <BrightnessAuto />,
  },
]

const MenuDrawer = () => {
  const classes = useStyles()
  const [position, setPosition] = useState({
    [LEFT]: false,
  })

  const history = useHistory()

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setPosition({ ...position, [anchor]: open })
  }

  const renderListItem = (anchor) => (
    <Box
      className={classes.list}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
      onClick={toggleDrawer(anchor, false)}
    >
      <List>
        {menus.map((menu) => (
          <ListItem
            key={menu.id}
            button
            onClick={() => history.push(menu.path)}
          >
            <ListItemIcon>{menu.icon}</ListItemIcon>
            <ListItemText primary={menu.label} className={classes.linkTo} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  )

  return (
    <Fragment>
      <Menu onClick={toggleDrawer(LEFT, true)} />
      <Drawer
        anchor={LEFT}
        open={position.left}
        onClose={toggleDrawer(LEFT, false)}
      >
        {renderListItem(LEFT)}
      </Drawer>
    </Fragment>
  )
}

export default MenuDrawer

const LEFT = 'left'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
})
