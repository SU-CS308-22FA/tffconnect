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
import { API_URL } from 'app/constants';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import useAuth from 'app/hooks/useAuth';
  
  /**
   * @name useEffect function just below this statement makes a call to the project endpoint to list all the projects.
   * @param getProjectItems is the response turned back from the projects endpoint
   * @param setData is the function that sets the data for a spesific project object which will be used in the edit page
   */

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
    const { user } = useAuth();
    let [allProjects, setResponseData] = useState([]);
    let list = [];
  
  const navigator = useNavigate();

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
      navigator('/material/updateproject');
   }

    const handleClickedDelete = (projectID) => {
        console.log(projectID); 
        axios.delete(API_URL + '/projects/edit/' + projectID +'/')
        .then((response) => {
            console.log(response);
            getProjectItems();
          })
          .catch(error => console.error(error));  
    }
    const getProjectItems = () => {
      
        axios.get(API_URL + '/projects/')
        .then((response) => {

            allProjects = response.data;

            setResponseData(allProjects);
            console.log(allProjects);
          })
          .catch(error => console.error(error));
    }
    const handleAddButton = () => {
      navigator('/material/addproject');
    }

    return (
      <Box width="100%" overflow="auto">
        <div style = {{ marginLeft: '20px' ,display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
          <h1>Projelerim</h1>
        </div>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="center">Proje İsmi</TableCell>
              <TableCell align="center">Açıklaması</TableCell>
              <TableCell align="center">Sunulma Tarihi</TableCell>
              <TableCell align="center">Başlangıç Tarihi</TableCell>
              <TableCell align="center">Bitiş Tarihi</TableCell>
              <TableCell align="center">Lokasyonu</TableCell>
              <TableCell align="center">Bütçesi</TableCell>
              <TableCell align="center">Sahibi</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
          {(() => {
            let length = allProjects.length;
            if (length === 0) {
              return (
                <TableRow>
                  <TableCell align="center" colSpan={8}>
                    <h1>Proje Bulunamadı</h1>
                  </TableCell>
                </TableRow>
              );
            }
            else {
              let list = [];
              for (let i =0; i < length; i++) {
                if (allProjects[i].owner === user.id) {
                  list.push(
                    <TableRow key={i}>
                      <TableCell align="center">{allProjects[i].name}</TableCell>
                      <TableCell align="center">{allProjects[i].description}</TableCell>
                      <TableCell align="center">{allProjects[i].proposal_date}</TableCell>
                      <TableCell align="center">{allProjects[i].start_date}</TableCell>
                      <TableCell align="center">{allProjects[i].end_date}</TableCell>
                      <TableCell align="center">{allProjects[i].location}</TableCell>
                      <TableCell align="center">{allProjects[i].budget}</TableCell>
                      <TableCell align="center">{ user.username }</TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => setData(allProjects[i])}
                        >
                          <EditIcon ></EditIcon>
                        </IconButton>

                        <IconButton
                          onClick={() => handleClickedDelete(allProjects[i].id)}
                        >
                          <DeleteIcon></DeleteIcon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                }
              }
              if (list.length === 0) {
                list.push(
                  <TableRow>
                    <TableCell align="center" colSpan={8}>
                      <h1>Proje Bulunamadı</h1>
                    </TableCell>
                  </TableRow>
                );
              }
              return list;
            }

          })()}
        </TableBody>
        </StyledTable>
        <div style= {{marginTop :'20px', alignItems: 'center'}}>
        <Button size ="large"variant ="contained" onClick = {  () => handleAddButton() } >
            Proje Ekle
        </Button>
        </div>
      </Box>
    );
  };
  
  export default SimpleTable;
  