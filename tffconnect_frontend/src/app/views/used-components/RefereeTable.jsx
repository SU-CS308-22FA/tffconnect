import * as React from 'react';
import { Box, Icon, IconButton, styled, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from 'app/constants';
import { Link } from 'react-router-dom';

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
  const [games, setGames] = useState([]);
  const [referees, setReferees] = useState([]);
  const [games_refNames, setGamesWithRefereeNames] = useState([]);

  useEffect(() => {
    axios.all([
      axios.get(API_URL + '/referees/'),
      axios.get(API_URL + '/games/')
    ])
    .then(axios.spread((refereesResponse, gamesResponse) => {
      setReferees(refereesResponse.data);
      setGames(gamesResponse.data);
    }))
    .catch(error => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    const combinedGames = games.map((g) => {
      const referee = referees.find((r) => r.id === g.referee_id);
      return {
        ...g,
        referee: referee || null,
      };
    });
    setGamesWithRefereeNames(combinedGames)
  }, [games, referees]);
  
  console.log(games_refNames);

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
            {games_refNames.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="center">{item.referee.name + " " + item.referee.surname}</TableCell>
                <TableCell align="center">{"5.0"}</TableCell>
                <TableCell align="center">{item.game_name}</TableCell>
                <TableCell align="center">{item.game_date}</TableCell>
                <TableCell align="center">{item.game_result}</TableCell>
                <TableCell align="center">
                  <IconButton component={Link} to={{pathname: '/data/referee_vote', search:'?param1=value1'}}>
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
