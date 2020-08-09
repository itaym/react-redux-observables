import Actions from '../actions'

const initialState = {
  isLoading: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.TAB_ONE_DATA_REQUESTED:
      return {
        ...state,
        isLoading: true
      }
    case Actions.TAB_ONE_DATA_RECEIVED:
      return {
        ...state,
        payload: action.payload,
        isLoading: false
      }
    case Actions.TAB_ONE_DATA_REQUESTED_CANCELLED:
      return {
        ...state,
        payload: undefined,
        isLoading: false
      }
    default:
      return state
  }
}
