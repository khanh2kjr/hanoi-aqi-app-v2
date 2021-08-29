import L from 'leaflet'
import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import { useSelector } from 'react-redux'

const userIcon = new L.divIcon({
  className: 'icon-marker-user',
  html: '<div></div>',
  iconSize: [20, 20],
})

const UserMarker = () => {
  const [position] = useSelector(({ user }) => [user.position])

  return (
    !!Object.keys(position).length && (
      <Marker
        position={[position.latitude, position.longitude]}
        icon={userIcon}
      >
        <Popup>Vị trí của bạn</Popup>
      </Marker>
    )
  )
}

export default UserMarker
