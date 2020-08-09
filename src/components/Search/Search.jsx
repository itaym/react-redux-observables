import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Actions from '../../actions'
import { scrollToTop } from '../../utils/generalUtils'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Typography from '@material-ui/core/Typography'
import { StyleSearch } from './StyleSearch'
import SearchTable from '../SearchTable'

const useStyles = makeStyles(StyleSearch)

const Search = props => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState({ text: '', page: 1 })
  const {
    payload: { products, meta },
    isLoading
  } = props
  const classes = useStyles()

  const onSearchTextChange = function (e) {
    setSearch({
      action: Actions.requestTabOneData,
      text: e.target.value,
      page: 1
    })
  }

  const onPageChange = function (e, value) {
    setSearch({
      ...search,
      action: Actions.requestTabOneDataNoDebounce,
      page: parseInt(value)
    })
  }

  if (meta.total_pages && meta.total_pages < search.page) {
    setSearch({
      ...search,
      action: Actions.requestTabOneDataNoDebounce,
      page: 1
    })
  }

  useEffect(() => {
    scrollToTop()
    if (search.text.length > 2) {
      dispatch(search.action(search.text, search.page))
      return
    }
    dispatch(Actions.requestTabOneDataCancel())
  }, [dispatch, search])

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <InputBase
          className={classes.input}
          placeholder="SearchTable Jul"
          inputProps={{ 'aria-label': 'SearchTable Jul' }}
          onChange={onSearchTextChange}
        />
      </Paper>
      {meta.total_count ? (
        <>
          <Pagination
            className={`${classes.pagination} ${isLoading ? classes.blur : ''}`}
            onChange={onPageChange}
            count={meta.total_pages}
            page={meta.current_page}
            siblingCount={0}
            variant="outlined"
          />
          <SearchTable products={products} isLoading={isLoading} />
          <Pagination
            className={`${classes.pagination} ${isLoading ? classes.blur : ''}`}
            onChange={onPageChange}
            count={meta.total_pages}
            page={meta.current_page}
            siblingCount={0}
            variant="outlined"
          />
        </>
      ) : (
        <Typography
          className={classes.message}
          variant="h3"
          component="h3"
          gutterBottom
        >
          {isLoading
            ? '...'
            : search.text.length > 2
            ? `SearchTable for "${search.text}" has no results`
            : 'No Data'}
        </Typography>
      )}
    </div>
  )
}
const emptyResponse = {
  products: [],
  meta: {
    current_page: 1,
    next_page: null,
    per_page: 48,
    prev_page: null,
    total_pages: 0,
    total_count: 0
  }
}
const mapStateToProps = function (state) {
  return {
    isLoading: !!state?.tabOneReducer?.isLoading,
    payload: state?.tabOneReducer?.payload || emptyResponse
  }
}

export default connect(mapStateToProps)(Search)
