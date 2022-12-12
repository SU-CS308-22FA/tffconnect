import * as React from 'react';
import { useEffect, useState } from 'react';
import {
    Box,
    Icon,
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
  } from "@mui/material";
  import axios from 'axios';

  const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
      "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
      "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
  }));
  
  
  const PaginationTable = () => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    const handleChangePage = (_, newPage) => {
      setPage(newPage);
    };
  

  
    let [allReferees, setResponseData] = useState('');

    useEffect(() => {
        getRefereesItems();
    }, []);

    const getRefereesItems = () => {
        axios.get('http://127.0.0.1:8000/api/referees/')
        .then((response) => {
            allReferees = response.data;
            setResponseData(allReferees);
            console.log(allReferees);
            console.log(allReferees.length);
            })
            .catch(error => console.error(error));
    }
    
    let whereToStart = Math.ceil(allReferees.length/2);
    console.log(whereToStart);


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };




    return (
      <Box width="100%" overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Company</TableCell>
              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscribarList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((subscriber, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{subscriber.name}</TableCell>
                  <TableCell align="center">{subscriber.company}</TableCell>
                  <TableCell align="center">{subscriber.date}</TableCell>
                  <TableCell align="center">{subscriber.status}</TableCell>
                  <TableCell align="center">${subscriber.amount}</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <Icon color="error">close</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </StyledTable>
  
        <TablePagination
          sx={{ px: 2 }}
          page={page}
          component="div"
          rowsPerPage={rowsPerPage}
          count={subscribarList.length}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ "aria-label": "Next Page" }}
          backIconButtonProps={{ "aria-label": "Previous Page" }}
        />
      </Box>
    );
  };
  
  export default PaginationTable;
  