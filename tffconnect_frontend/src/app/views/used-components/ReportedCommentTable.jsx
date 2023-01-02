import * as React from 'react';
import { Box, Icon, IconButton, styled, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from 'app/constants';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
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
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [all_comments, setAllComments] = useState([]);
  const [reported_comments, setReportedComments] = useState([]);
  const navigate = useNavigate();
  let accessToken = localStorage.getItem('accessToken');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dateFormatter = new Intl.DateTimeFormat("tr", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    const formattedDate = dateFormatter.format(date);
    return formattedDate;
  };

  useEffect(() => {
    axios.all([
      axios.get(API_URL + '/projects/comments/'),
      axios.get(API_URL + '/projects/'),
      axios.get(API_URL + '/users/', {
        headers: {
            Authorization: "Token " + accessToken,
          },
      })
    ])
    .then(axios.spread((commentsResponse, projectsResponse, usersResponse) => {
      setAllComments(commentsResponse.data);
      setProjects(projectsResponse.data);
      setUsers(usersResponse.data);
    }))
    .catch(error => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    const reportedComments = all_comments.filter(item => item.is_approved === true);
    console.log(reportedComments);
    const combinedComments = reportedComments.map((r) => {
      const projectDetails = projects.find((p) => p.id === r.project);
      const userDetails = users.find((u) => u.id === r.author);
      return {
        ...r,
        projectDetails: projectDetails || null,
        userDetails: userDetails || null,
      };
    });
    setReportedComments(combinedComments)
  }, [all_comments, projects, users]);

  console.log(reported_comments);

  const handleDelete = (item) => {
    const updateResponse = fetch(API_URL + '/projects/comments/' + item.id + '/', {
      method: 'DELETE',
    });
    navigate('/dashboard');
  }

  const handleAccept = (item) => {
    const updateResponse = fetch(API_URL + '/projects/comments/' + item.id + '/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: item.id,
        project: item.project,
        author: item.author,
        text_body: item.text_body,
        date_added: item.date_added,
        is_approved: false,
      })
    });
    navigate('/dashboard');
  }

    return (
      <Box width="100%" overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="center">Kullanıcı Adı</TableCell>
              <TableCell align="center">Proje Adı</TableCell>
              <TableCell align="center">Yorum Tarihi</TableCell>
              <TableCell align="center">Yorum</TableCell>
              <TableCell align="center">Yorumu Onayla</TableCell>
              <TableCell align="center">Yorumu Sil</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
          {reported_comments.map((item, index) => (
            item.userDetails && item.projectDetails ? (
              <TableRow key={index}>
                <TableCell align="center">{item.userDetails.username}</TableCell>
                <TableCell align="center">{item.projectDetails.name}</TableCell>
                <TableCell align="center">{formatDate(item.date_added)}</TableCell>
                <TableCell align="center">{item.text_body}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleAccept(item)}>
                    <Icon color="success"><CheckCircleOutlineIcon/></Icon>
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleDelete(item)}>
                    <Icon color="error"><HighlightOffIcon/></Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ) : null
          ))}
          </TableBody>
        </StyledTable>
      </Box>
    );
};
