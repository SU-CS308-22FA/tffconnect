import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
import { Link } from 'react-router-dom';
import { data } from '../../../node_modules/core-js/internals/is-forced';
  
  const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: "pre",
    "& thead": {
      "& tr": { "& th": { paddingLeft: 1, paddingRight: 1 } },
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

    const setData = (data) => {
      console.log(data);
      let { id, name, description,is_finished, proposal_date, start_date, end_date, location, budget, owner, is_confirmed_by_tff,confirmation_datetime } = data;
      localStorage.setItem('id', id);
      localStorage.setItem('name', name);
      localStorage.setItem('description', description);
      localStorage.setItem('is_finished', is_finished);
      localStorage.setItem('proposal_date', proposal_date);
      localStorage.setItem('start_date', start_date);
      localStorage.setItem('end_date', end_date);
      localStorage.setItem('location', location);
      localStorage.setItem('budget', budget);
      localStorage.setItem('owner', owner);
      localStorage.setItem('is_confirmed_by_tff', is_confirmed_by_tff);
      localStorage.setItem('confirmation_datetime', confirmation_datetime);

   }

    const handleClickedDelete = (projectID) => {
        console.log(projectID); 
        axios.delete('https://tffconnect.com/api/projects/edit/' + projectID +'/')
        .then((response) => {
            console.log(response);
            getProjectItems();
          })
          .catch(error => console.error(error));  
    }
    const getProjectItems = () => {
        axios.get('https://tffconnect.com/api/projects/')
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
              <TableCell align="center">Project Name</TableCell>
              <TableCell align="center">Project Description</TableCell>
              <TableCell align="center">Project Proposal Date</TableCell>
              <TableCell align="center">Project Start Date</TableCell>
              <TableCell align="center">Project End Date</TableCell>
              <TableCell align="center">Project Location</TableCell>
              <TableCell align="center">Project Budget</TableCell>
              <TableCell align="center">Project Owner</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
          {allProjects.map((project, index) => (
            <TableRow key={index}>
                <TableCell align="center">{project.name}</TableCell>
                <TableCell align="center">{project.description}</TableCell>
                <TableCell align="center">{project.proposal_date}</TableCell>
                <TableCell align="center">{project.start_date}</TableCell>
                <TableCell align="center">{project.end_date}</TableCell>
                <TableCell align="center">{project.location}</TableCell>
                <TableCell align="center">{project.budget}</TableCell>
                <TableCell align="center">{project.owner}</TableCell>
              <TableCell align="center">
              
              <Link to="/material/updateproject">
                <IconButton
                    onClick={() => setData(project)}
                >
                  <EditIcon ></EditIcon>
                </IconButton>
              </Link>
                <IconButton
                  onClick={ () => handleClickedDelete(project.id)}
                >
                  <DeleteIcon ></DeleteIcon>
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
  