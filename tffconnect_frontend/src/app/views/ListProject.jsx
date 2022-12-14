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

    const handleClickedDelete = (projectID) => {
        console.log(projectID); 
        axios.delete('http://127.0.0.1:8000/api/projects/edit/' + projectID +'/')
        .then((response) => {
            console.log(response);
            getProjectItems();
          })
          .catch(error => console.error(error));  
    }
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
                <IconButton>
                  <EditIcon ></EditIcon>
                </IconButton>
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
  