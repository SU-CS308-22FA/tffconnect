import * as React from 'react';
import { Box, Icon, IconButton, styled, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from 'react';
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

export default function RefereeTable() {
  console.log("Hello");
  let [allGames, setResponseData] = useState([]);
  let [referees, setResponseData_ref] = useState([]);

  useEffect(() => {
    getGames();
  }, []);

  const getGames = () => {
    axios.get('http://127.0.0.1:8000/api/games/')
    .then((response) => {
      allGames = response.data;
      setResponseData(allGames);
      console.log(allGames);
      console.log(allGames.length);
    })
    .catch(error => console.error('Error: ${error}'));
  }

  const getRefNames = () => {
    axios.get('http://127.0.0.1:8000/api/referees/')
    .then((response) => {
      refNames = response.data;
      setResponseData_ref(refNames);
    })
    .catch(error => console.error('Error: ${error}'));
  }

    return (
      <Box width="100%" overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="center">Personel Adı</TableCell>
              <TableCell align="center">Puanı</TableCell>
              <TableCell align="center">Atandığı Maç</TableCell>
              <TableCell align="center">Oynanma Tarihi</TableCell>
              <TableCell align="center">Maç Sonucu</TableCell>
              <TableCell align="center">Oyla</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {allGames.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="center">{item.referee_id}</TableCell>
                <TableCell align="center">{item.referee_id}</TableCell>
                <TableCell align="center">{item.game_name}</TableCell>
                <TableCell align="center">{item.game_date}</TableCell>
                <TableCell align="center">{item.game_result}</TableCell>
                <TableCell align="center">
                  <IconButton>
                    <Icon color="success">offline_pin</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </Box>
    );
};
