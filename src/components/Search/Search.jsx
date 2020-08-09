import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Actions from '../../actions'
import { scrollToTop } from '../../utils/generalUtils'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import CheckRoundedIcon from '@material-ui/icons/CheckRounded'
import ClearRoundedIcon from '@material-ui/icons/ClearRounded'
import InputBase from '@material-ui/core/InputBase'
import Typography from '@material-ui/core/Typography'
import { StyleSearch } from './StyleSEarch'

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
          placeholder="Search Jul"
          inputProps={{ 'aria-label': 'Search Jul' }}
          onChange={onSearchTextChange}
        />
      </Paper>
      {meta.total_count ? (
        <>
          <Pagination
            className={classes.pagination}
            onChange={onPageChange}
            count={meta.total_pages}
            page={meta.current_page}
            siblingCount={0}
            variant="outlined"
          />
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Stock</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map(product => (
                  <TableRow key={product.id}>
                    <TableCell align="left">
                      <Avatar alt={product.name} src={product.image_url} />
                    </TableCell>
                    <TableCell align="left" style={{ maxWidth: '66%' }}>
                      {product.name}
                    </TableCell>
                    <TableCell align="left">{product.price}</TableCell>
                    <TableCell align="center">
                      {!product.out_of_stock ? (
                        <CheckRoundedIcon className={classes.icon_checked} />
                      ) : (
                        <ClearRoundedIcon
                          className={classes.icon_not_checked}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            className={classes.pagination}
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
            ? `Search for "${search.text}" has no results`
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
