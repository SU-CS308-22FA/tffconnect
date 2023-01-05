import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Icon,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
  } from "@mui/material";
import { API_URL } from 'app/constants';
import * as React from 'react';

const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: "pre",
    "& thead": {
        "& tr": { "& th": { paddingLeft: 1, paddingRight: 1 } },
    },
    "& tbody": {
        "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
    }));

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const AppTable = () => {

    let [project, setProject] = useState([]);

    useEffect(() => { 
        getProject(5); //parametre lazım
    }, []);

    const getProject = (projectID) => {

        console.log(projectID);
        axios.get(API_URL + '/projects/theproject/' + projectID + '/')
        .then(response => {
            console.log(response.data);
            setProject(response.data);
            console.log(project);

        })
        .catch((err) => {
            console.log(err);
        })
    };

    return (
      <Container>

        <SimpleCard title="Proje Bilgileri">
          
            <Box width="100%" overflow="auto">
                <StyledTable>
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">Proje İsmi</TableCell>
                        <TableCell align="center">Açıklama</TableCell>
                        <TableCell align="center">Lokasyon</TableCell>
                        <TableCell align="center">Sahibi</TableCell>
                        <TableCell align="center">Bütçe</TableCell>
                        <TableCell align="center">Gönderilme Tarihi</TableCell>
                        <TableCell align="center">Onaylanma Tarihi</TableCell>
                        <TableCell align="center">Başlanma Tarihi</TableCell>
                        <TableCell align="center">Bitiş Tarihi</TableCell>
                    </TableRow>
                    </TableHead>

                    <TableBody>
                        {project.length > 0 && (
                        <TableRow>
                        <TableCell align="center">{project[0].name}</TableCell>
                        <TableCell align="center">{project[0].description}</TableCell>
                        <TableCell align="center">{project[0].location}</TableCell>
                        <TableCell align="center">{project[0].owner}</TableCell>
                        <TableCell align="center">{project[0].budget}</TableCell>
                        <TableCell align="center">{project[0].proposal_date}</TableCell>
                        <TableCell align="center">{project[0].confirmation_datetime}</TableCell>
                        <TableCell align="center">{project[0].start_date}</TableCell>
                        <TableCell align="center">{project[0].end_date}</TableCell>
                        </TableRow>
                        )}   
                    </TableBody>
                </StyledTable>
            </Box>

        </SimpleCard>

      </Container>
    );
  };
  
  export default AppTable;