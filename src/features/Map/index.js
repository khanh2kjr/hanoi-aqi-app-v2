import { Box, makeStyles } from '@material-ui/core'
import { worldAQIApi } from 'api/worldAQIApi'
import { CircularProgress } from 'components'
import { PROMISE_STATUS } from 'const/api'
import { EVALUATE } from 'const/app'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { getDistricts } from 'slices/district'
import { getEvaluate } from 'utils'
import UserLocation from './components/UserLocation'

const createIcon = (aqi, color) => {
  return new L.divIcon({
    className: 'icon-marker-container',
    html: `<div class="icon-marker" style="background-color: ${color}"><span>${aqi}</span></div>`,
    iconSize: [40, 40],
  })
}

const Map = ({ range }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [districts, promiseStatus] = useSelector(({ district }) => [
    district.districts,
    district.promiseStatus,
  ])

  const [world, setWorld] = useState([])

  useEffect(() => {
    if (districts.length) return
    dispatch(getDistricts())
  }, [dispatch, districts])

  useEffect(() => {
    const fetchWorld = async () => {
      const w = await worldAQIApi.getWorld()
      const { data } = w
      setWorld(data)
    }
    fetchWorld()
  }, [])

  return (
    <Box className={classes.root}>
      {promiseStatus === PROMISE_STATUS.pending ? (
        <CircularProgress />
      ) : (
        <MapContainer
          className={classes.map}
          center={[21.02628960112655, 105.59568908253307]}
          zoom={12}
          scrollWheelZoom
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <UserLocation />
          {range === 2
            ? !!world.length &&
              world
                .filter((w) => w.url.indexOf('vietnam') !== -1)
                .map((w) => ({
                  aqi: w.aqi,
                  name: w.name,
                  address: w.name,
                  longtitude: w.coordinates.longitude,
                  latitude: w.coordinates.latitude,
                  id: w.id,
                }))
                .concat(districts)
                .map((w) => (
                  <Marker
                    key={w.id}
                    position={[w.latitude, w.longtitude]}
                    icon={createIcon(
                      w.aqi,
                      getEvaluate(EVALUATE, w.aqi)?.color?.value
                    )}
                  >
                    <Popup>{w.name}</Popup>
                  </Marker>
                ))
            : districts.map((district) => (
                <Marker
                  key={district.id}
                  position={[district.latitude, district.longtitude]}
                  icon={createIcon(
                    district.aqi,
                    getEvaluate(EVALUATE, district.aqi)?.color?.value
                  )}
                >
                  <Popup>{district.address}</Popup>
                </Marker>
              ))}
        </MapContainer>
      )}
    </Box>
  )
}

export default Map

const useStyles = makeStyles((theme) => ({
  root: {
    border: `${theme.spacing(2)}px solid #CCDECC`,
    borderRadius: theme.spacing(0.5),
    height: 'calc(100vh - 180px)',
  },
  map: {
    height: '100%',
  },
}))
