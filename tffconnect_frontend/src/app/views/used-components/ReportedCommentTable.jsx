import * as React from 'react';
import { Box, Icon, IconButton, styled, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from 'app/constants';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
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

export default function ReportedCommentTable() {
  const [games, setGames] = useState([]);
  const [referees, setReferees] = useState([]);
  const [games_refNames, setGamesWithRefereeNames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const combinedNews = [0,0,0,0];
    setGamesWithRefereeNames(combinedNews);
  }, []);

  const handleClick = (item) => {
    const itemString = JSON.stringify(item);
    navigate('/data/referee_vote', {state:{game: itemString}});
  }

    return (
      <Box width="100%" overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="center">Kullanıcı Adı</TableCell>
              <TableCell align="center">Proje Adı</TableCell>
              <TableCell align="center">Yorum</TableCell>
              <TableCell align="center">Yorumu Sil</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {games_refNames.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="center">0</TableCell>
                <TableCell align="center">0</TableCell>
                <TableCell align="center">0</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleClick(item)}>
                    <Icon color="error"><HighlightOffIcon/></Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </Box>
    );
};
