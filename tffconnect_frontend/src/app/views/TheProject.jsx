import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
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
                        <TableRow>
                        <TableCell align="center">{project.name}</TableCell>
                        <TableCell align="center">{project.description}</TableCell>
                        <TableCell align="center">{project.location}</TableCell>
                        <TableCell align="center">{project.owner}</TableCell>
                        <TableCell align="center">{project.budget}</TableCell>
                        <TableCell align="center">{project.proposal_date}</TableCell>
                        <TableCell align="center">{project.confirmation_datetime}</TableCell>
                        <TableCell align="center">{project.start_date}</TableCell>
                        <TableCell align="center">{project.end_date}</TableCell>
                        </TableRow>   
                    </TableBody>
                </StyledTable>
            </Box>

        </SimpleCard>

      </Container>
    );
  };
  
  export default AppTable;