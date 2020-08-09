import { ajax } from 'rxjs/ajax'
import { getApiToken } from './authUtils'
import { pickBy, identity, memoize } from 'lodash'
import { share, tap } from 'rxjs/operators'
import { of, Observable, timer } from 'rxjs'
const memoise = func => {
  let cache = {}

  return (...args) => {
    const cacheKey = JSON.stringify(args)
    cache[cacheKey] = cache[cacheKey] || func(...args).pipe(share())

    return cache[cacheKey].pipe(
      tap(() => timer(1000).subscribe(() => delete cache[cacheKey]))
    )
  }
}
const ajaxCache = memoise(ajax.getJSON)
const defaultHeaders = {
  contentType: {
    applicationJson: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
}

const defaultAuthHeaders = memoize(() => {
  return pickBy(
    {
      Authorization: getApiToken()
    },
    identity
  )
})

export const getJSON = (url, headers = {}) => {
  return ajaxCache(url, {
    ...defaultAuthHeaders(),
    ...headers
  })
}

export const postJSON = (url, body, headers = {}) => {
  return ajax.post(url, JSON.stringify(body), {
    ...defaultHeaders.contentType.applicationJson,
    ...defaultAuthHeaders(),
    ...headers
  })
}

export const remove = (url, headers = {}) => {
  return ajax.delete(url, {
    ...defaultAuthHeaders(),
    ...headers
  })
}
