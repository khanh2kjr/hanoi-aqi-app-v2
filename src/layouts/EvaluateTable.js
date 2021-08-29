import React from 'react'
import {
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from '@material-ui/core'
import { EVALUATE } from 'const/app'

const EvaluateTable = () => {
  const classes = useStyles()

  return (
    <Table className={classes.root}>
      <TableHead>
        <TableRow>
          <TableCell align="center">Chỉ số</TableCell>
          <TableCell align="center">Đánh giá</TableCell>
          <TableCell align="center">Màu sắc</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {EVALUATE.map((ele) => (
          <TableRow key={ele.rank}>
            <TableCell align="center">{ele.rank}</TableCell>
            <TableCell align="center">{ele.label}</TableCell>
            <TableCell align="center" className="table-color">
              <Button
                style={{
                  backgroundColor: ele.color.value,
                  color: '#fff',
                }}
                disabled
              >
                {ele.color.label}
              </Button>
              <Box
                style={{
                  backgroundColor: '#a6a6a6',
                }}
                className="table-color__tooltip"
              >
                {ele.text}
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default EvaluateTable

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}))
