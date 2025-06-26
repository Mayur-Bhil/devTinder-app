import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSclice"
import feedReducer from "./feedSclice"

export default configureStore({
  reducer: {
    user:userReducer,
    feed:feedReducer
  },
})