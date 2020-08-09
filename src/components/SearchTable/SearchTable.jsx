import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
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
import { StyleSearchTable } from './StyleSearchTable'

const useStyles = makeStyles(StyleSearchTable)

const SearchTable = props => {
  const { products, isLoading } = props
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table
        className={`${classes.table} ${isLoading ? classes.blur : ''}`}
        aria-label="simple table"
      >
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
                  <ClearRoundedIcon className={classes.icon_not_checked} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SearchTable
