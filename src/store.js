import { configureStore } from '@reduxjs/toolkit'
import { USER_SLICE, DISTRICT_SLICE } from 'const/api'

import { districtReducer, userReducer } from 'slices'

const rootReducer = {
  [DISTRICT_SLICE]: districtReducer,
  [USER_SLICE]: userReducer,
}

export default configureStore({
  reducer: rootReducer,
})
