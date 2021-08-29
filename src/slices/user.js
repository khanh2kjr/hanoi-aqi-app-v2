import { createSlice } from '@reduxjs/toolkit'
import { USER_SLICE } from 'const/api'

const INITIAL_STATE = {
  position: {},
  nearestMoniPoint: {},
  isOpen: false,
}

const userSlice = createSlice({
  name: USER_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    turnOn(state, action) {
      state.isOpen = true
      state.position = action.payload
    },
    turnOff(state) {
      state.isOpen = false
      state.position = {}
    },
    nearestUser(state, action) {
      state.nearestMoniPoint = action.payload
    },
  },
})

const { actions, reducer } = userSlice

export const { turnOn, turnOff, nearestUser } = actions

export default reducer
