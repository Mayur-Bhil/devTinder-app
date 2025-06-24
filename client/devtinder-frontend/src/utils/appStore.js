import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSclice"

export default configureStore({
  reducer: {
    user:userReducer
  },
})