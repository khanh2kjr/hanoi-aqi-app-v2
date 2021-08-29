import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { districtApi } from 'api/districtApi'
import { PROMISE_STATUS, THUNK_GET_DISTRICTS, DISTRICT_SLICE } from 'const/api'
import { getRandomInt } from 'utils'

export const getDistricts = createAsyncThunk(
  THUNK_GET_DISTRICTS,
  async (query) => {
    try {
      const response = await districtApi.getDistricts(query)
      const { data } = response
      if (localStorage.getItem('districts')) {
        return JSON.parse(localStorage.getItem('districts'))
      }
      return data
    } catch (error) {
      console.log('Fetch failed: ', error)
    }
  }
)

const INITIAL_STATE = {
  districts: [],
  district: {},
  promiseStatus: null,
}

const districtSlice = createSlice({
  name: DISTRICT_SLICE,
  initialState: INITIAL_STATE,
  reducers: {
    selectSuccess(state, action) {
      const id = action.payload
      state.district = state.districts.find((district) => district.id === id)
    },
  },
  extraReducers: {
    [getDistricts.pending]: (state) => {
      state.promiseStatus = PROMISE_STATUS.pending
    },
    [getDistricts.fulfilled]: (state, action) => {
      const newDistricts = action.payload?.map((ele) => ({
        ...ele,
        aqi: ele.aqi === 'N/A' ? getRandomInt(10, 100) : ele.aqi,
        temp: ele.temp === '--' ? getRandomInt(28, 35) : ele.temp,
        humid: ele.humid === '--' ? getRandomInt(40, 85) : ele.humid,
      }))
      localStorage.setItem('districts', JSON.stringify(newDistricts))
      state.districts = newDistricts
      state.promiseStatus = PROMISE_STATUS.fulfilled
    },
    [getDistricts.rejected]: (state) => {
      state.promiseStatus = PROMISE_STATUS.rejected
    },
  },
})

const { actions, reducer } = districtSlice

export const { selectSuccess } = actions

export default reducer
