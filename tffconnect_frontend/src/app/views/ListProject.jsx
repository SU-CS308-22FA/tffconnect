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
    TableRow,
  } from "@mui/material";
  import axios from 'axios';
  
  const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: "pre",
    "& thead": {
      "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
      "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
  }));

  const SimpleTable = () => {
    let [allProjects, setResponseData] = useState([]);

    useEffect(() => {
        getProjectItems();
    }, []);

    const getProjectItems = () => {
        axios.get('http://127.0.0.1:8000/api/projects/')
        .then((response) => {
            allProjects = response.data;
            setResponseData(allProjects);
            console.log(allProjects);
            console.log(allProjects.length);
          })
          .catch(error => console.error(error));
    }

    return (
      <Box width="100%" overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="left">Project Name</TableCell>
              <TableCell align="center">Project Description</TableCell>
              <TableCell align="center">Project Status</TableCell>
              <TableCell align="center">Project Proposal Date</TableCell>
              <TableCell align="center">Project Start Date</TableCell>
              <TableCell align="center">Project End Date</TableCell>
              <TableCell align="center">Project Location</TableCell>
              <TableCell align="center">Project Budget</TableCell>
              <TableCell align="center">Project Owner</TableCell>
              <TableCell align="center">Is Project Approved By Owner</TableCell>
              <TableCell align="right">Confirmation Date of Approval</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
          {allProjects.map((project, index) => (
            <TableRow key={index}>
                <TableCell align="left">{project.name}</TableCell>
                <TableCell align="center">{project.description}</TableCell>
                <TableCell align="center">{project.is_finished}</TableCell>
                <TableCell align="center">{project.proposal_date}</TableCell>
                <TableCell align="center">{project.start_date}</TableCell>
                <TableCell align="center">{project.end_date}</TableCell>
                <TableCell align="center">{project.location}</TableCell>
                <TableCell align="center">${project.budget}</TableCell>
                <TableCell align="center">${project.owner}</TableCell>
                <TableCell align="center">{project.is_confirmed_by_tff}</TableCell>
                <TableCell align="right">{project.confirmation_date}</TableCell>
              <TableCell align="right">
                <IconButton>
                  <Icon color="error">close</Icon>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </StyledTable>
      </Box>
    );
  };
  
  export default SimpleTable;
  