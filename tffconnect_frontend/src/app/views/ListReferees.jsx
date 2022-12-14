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
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = async (pk) => {
      setIsDeleting(true);
      console.log(pk);
      try {
        await axios.delete(`http://127.0.0.1:8000/api/referees/edit/${pk}/`)
        .then((response) => {
          console.log(response);
          getRefereesItems();
        })
      }
      catch (error){
        console.log(error);
      }
      finally {
        setIsDeleting(false);
      }
    };
  
    const handleChangePage = (_, newPage) => {
      setPage(newPage);
    };
  
    let [allReferees, setResponseData] = useState([]);

    useEffect(() => {
        getRefereesItems();
    }, []);

    const getRefereesItems = () => {
        axios.get('http://127.0.0.1:8000/api/referees/')
        .then((response) => {
            allReferees = response.data;
            setResponseData(allReferees);
            console.log(allReferees);
            })
            .catch(error => console.error(error));
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    return (
      <Box width="100%" overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Surname</TableCell>
              <TableCell align="center">City</TableCell>
              <TableCell align="center">Classification</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allReferees
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((referee, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{referee.name}</TableCell>
                  <TableCell align="center">{referee.surname}</TableCell>
                  <TableCell align="center">{referee.city}</TableCell>
                  <TableCell align="center">{referee.classification}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => (handleDeleteClick(referee.id))} disabled={isDeleting}>
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
          count={allReferees.length}
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
  