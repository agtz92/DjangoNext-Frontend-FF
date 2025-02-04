"use client"

import React, {useState} from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import TablePagination from "@mui/material/TablePagination"

const GenericTable = ({ data, columns }) => {
  // Pagination state
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Update page number
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  // Update rows per page and reset page to 0
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10)
    setRowsPerPage(+newRowsPerPage)
    setPage(0)
  }

  // Common cell styling to enforce max width with ellipsis for overflow
  const getCellSx = (col) => ({
    maxWidth: col.maxWidth ? col.maxWidth : "auto",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  })

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table
          stickyHeader
          sx={{ minWidth: 650 }}
          size="small"
          aria-label="generic table"
        >
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  align={col.align || "left"}
                  sx={getCellSx(col)}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <TableRow
                  key={row.id || rowIndex}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {columns.map((col) => {
                    let cellValue = row[col.field]
                    // Use custom render function if provided
                    if (col.render) {
                      cellValue = col.render(cellValue, row)
                    }
                    return (
                      <TableCell
                        key={col.field}
                        align={col.align || "left"}
                        sx={getCellSx(col)}
                      >
                        {cellValue}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default GenericTable
