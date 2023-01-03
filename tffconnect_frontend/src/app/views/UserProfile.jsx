import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from 'app/hooks/useAuth';
import { API_URL } from 'app/constants';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import {
    Icon,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
  } from "@mui/material";
  import { data } from '../../../node_modules/core-js/internals/is-forced';
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
    let [allComments, setAllComments] = useState([]);
    const {user} = useAuth();


    useEffect(() => { 
        getComments();
    }, []);

    const handleClickedDelete = (commentID) => {
        console.log(commentID); 
        axios.delete(API_URL + '/projects/comments/' + commentID +'/')
        .then((response) => {
            console.log(response);
            getComments();
          })
          .catch(error => console.error(error));  
    }


    const getComments = () => {

        console.log(user);
        console.log(user.id);
  
        axios.get(API_URL + '/projects/comments/')
        .then((myresponse) => {
            console.log(myresponse.data);
            
            allComments=myresponse.data;
            setAllComments(allComments);

            console.log(allComments);

          })
        .catch(error => console.error(error));
  
      }


  return (
    <Container>

      <SimpleCard title="Kullanıcı Bilgisi">
        
      <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="center">E-Mail</TableCell>
            <TableCell align="center">İsim</TableCell>
            <TableCell align="center">Soyisim</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
            <TableRow>
              <TableCell align="center">{user.username}</TableCell>
              <TableCell align="center">{user.first_name}</TableCell>
              <TableCell align="center">{user.last_name}</TableCell>
            </TableRow>   
        </TableBody>
      </StyledTable>
    </Box>
      </SimpleCard>



      <SimpleCard title="Yapılan Yorumlar">

      <Box width="100%" overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="center">Proje ID</TableCell>
              <TableCell align="center">İçerik</TableCell>
              <TableCell align="center">Tarih</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
          {allComments.map((comment, index) => {
            if (comment.author===user.id) {
              
                return (
                    <TableRow key={index}>

                        <TableCell align="center">{comment.project}</TableCell>
                        <TableCell align="center">{comment.text_body}</TableCell>
                        <TableCell align="center">{comment.date_added}</TableCell>
                    <TableCell align="center">
                    
                        <IconButton
                        onClick={ () => handleClickedDelete(comment.id)}
                        >
                        <DeleteIcon ></DeleteIcon>
                        </IconButton>
                    </TableCell>
                    </TableRow>
                )
                }
            })}
        </TableBody>
        </StyledTable>
      </Box>

      </SimpleCard>
    </Container>
  );
};

export default AppTable;
