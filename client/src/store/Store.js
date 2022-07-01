import React, { createContext, useReducer } from 'react'
import { node } from 'prop-types'
// load reducers
import headerReducer from '../reducer/headerReducer'
// craete initial payload
const headerActive = [{
    header : 'home'
}]
// create context
export const MainContext = createContext(headerActive);
// create Store
function Store({ children }) {
  const [state, dispatch] = useReducer(headerReducer, headerActive);
  const value = { state, dispatch };
  return (
    <MainContext.Provider value={value}>
      {children}
    </MainContext.Provider>
  )
}
Store.defaultProps = {
  children: null
}
Store.propTypes = {
  children: node
}
export default Store;