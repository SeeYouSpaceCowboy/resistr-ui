const location = (state = null, action) => {
  switch (action.type) {
  case 'SET_LOCATION':
    return action.location
  default:
    return state
  }
}

export default location
