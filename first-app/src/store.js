import {legacy_createStore} from "redux"

import reducer from './reducer'

export const myStore = legacy_createStore(reducer)