import { of } from 'rxjs'
import {
  switchMap,
  mergeMap,
  catchError,
  debounceTime,
  take
} from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { race } from 'rxjs/observable/race.js'
import { getJSON } from '../utils/ajaxUtils'
import Actions from '../actions'

const URLS = {
  DATA:
    'http://ops.avonow.com/api/v1/products/search?by_company_id=77&mode=all&' //query=beer&page=1'
}

// noinspection JSUnusedGlobalSymbols
export const requestTabOneDataEpic = action$ =>
  action$.pipe(
    debounceTime(500),
    ofType(Actions.TAB_ONE_DATA_REQUESTED),
    switchMap(action =>
      race(
        getJSON(`${URLS.DATA}query=${action.search}&page=${action.page}`).pipe(
          mergeMap(response => of(Actions.tabOneDataReceived(response))),
          catchError(error => of(Actions.fetchRejected(error)))
        ),
        action$.pipe(ofType(Actions.TAB_ONE_DATA_REQUESTED_CANCELLED), take(1))
      )
    )
  )

// noinspection JSUnusedGlobalSymbols
export const requestTabOneDataEpicNoDebounceTime = action$ =>
  action$.pipe(
    ofType(Actions.TAB_ONE_DATA_REQUESTED_NO_DEBOUNCE),
    switchMap(action =>
      race(
        getJSON(`${URLS.DATA}query=${action.search}&page=${action.page}`).pipe(
          mergeMap(response => of(Actions.tabOneDataReceived(response))),
          catchError(error => of(Actions.fetchRejected(error)))
        ),
        action$.pipe(ofType(Actions.TAB_ONE_DATA_REQUESTED_CANCELLED), take(1))
      )
    )
  )
