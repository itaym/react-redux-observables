// Action Types
const TAB_ONE_DATA_REQUESTED = 'TAB_ONE_DATA_REQUESTED'
const TAB_ONE_DATA_REQUESTED_NO_DEBOUNCE = 'TAB_ONE_DATA_REQUESTED_NO_DEBOUNCE'
const TAB_ONE_DATA_REQUESTED_CANCELLED = 'TAB_ONE_DATA_REQUESTED_CANCELLED'
const TAB_ONE_DATA_RECEIVED = 'TAB_ONE_DATA_RECEIVED'

// Action Creators
const requestTabOneData = (search, page) => ({
  type: TAB_ONE_DATA_REQUESTED,
  search,
  page
})

const requestTabOneDataNoDebounce = (search, page) => ({
  type: TAB_ONE_DATA_REQUESTED_NO_DEBOUNCE,
  search,
  page
})

const requestTabOneDataCancel = () => ({
  type: TAB_ONE_DATA_REQUESTED_CANCELLED
})

const tabOneDataReceived = payload => ({
  type: TAB_ONE_DATA_RECEIVED,
  payload
})

export default {
  TAB_ONE_DATA_REQUESTED,
  TAB_ONE_DATA_REQUESTED_NO_DEBOUNCE,
  TAB_ONE_DATA_RECEIVED,
  TAB_ONE_DATA_REQUESTED_CANCELLED,
  requestTabOneData,
  requestTabOneDataNoDebounce,
  tabOneDataReceived,
  requestTabOneDataCancel
}
