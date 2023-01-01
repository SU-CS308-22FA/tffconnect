import * as React from 'react';
import { Box, Icon, IconButton, styled, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from 'app/constants';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleClick = (item) => {
    const itemString = JSON.stringify(item);
    navigate('/data/referee_vote', {state:{game: itemString}});
  }

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
              <TableCell align="center">Maç Oylaması</TableCell>
              <TableCell align="center">Atandığı Maç</TableCell>
              <TableCell align="center">Oynanma Tarihi</TableCell>
              <TableCell align="center">Maç Sonucu</TableCell>
              <TableCell align="center">Oylanma Sayısı</TableCell>
              <TableCell align="center">Oyla</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {games_refNames.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="center">{item.referee.name + " " + item.referee.surname}</TableCell>
                <TableCell align="center">{item.referee_rating}</TableCell>
                <TableCell align="center">{item.game_name}</TableCell>
                <TableCell align="center">{item.game_date}</TableCell>
                <TableCell align="center">{item.game_result}</TableCell>
                <TableCell align="center">{item.rating_count}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleClick(item)}>
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
