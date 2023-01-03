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
    let [allProjects, setAllProjects] = useState([]);
    const {user} = useAuth();


    useEffect(() => { 
        getComments();
        getProjects();
    }, []);

    const handleClickedDelete = (commentID) => {
        console.log(commentID); 
        axios.delete(API_URL + '/projects/comments/' + commentID +'/')
        .then((response) => {
            console.log(response);
            getComments();
          })
          .catch(error => console.error(error));  
    };


    const findProjectName = (projectID) => {
        console.log(projectID);
        let projectName;

        for (let y = 0; y < allProjects.length; y++){

            if (allProjects[y].id === projectID){
                console.log(allProjects[y]);
                projectName = allProjects[y].name;
            }
        }
        console.log(projectName);
        return projectName;
    };

    const getProjects = () => {

        axios.get(API_URL + '/projects/')
        .then(response => {
            allProjects = response.data;
            console.log(allProjects);
            setAllProjects(allProjects);
            console.log(allProjects);

        })
        .catch((err) => {
            console.log(err);
        })

    };
    
    const getComments = () => {
  
        axios.get(API_URL + '/projects/comments/')
        .then((myresponse) => {
            console.log(myresponse.data);
            
            allComments=myresponse.data;
            setAllComments(allComments);

            console.log(allComments);

        })
        .catch(error => console.error(error));
        
    };


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
              <TableCell align="center">Proje İsmi</TableCell>
              <TableCell align="center">İçerik</TableCell>
              <TableCell align="center">Tarih</TableCell>
            </TableRow>
          </TableHead>

            {(() => {  
                let len = allComments.length;
                let usersCommentList = [];
                let comment_text, comment_project, comment_author, comment_date, comment_id;
                let commentProjectName;
                for (let i = 0; i < len; i++){
                    comment_text = allComments[i].text_body;
                    comment_project = allComments[i].project;
                    comment_author = allComments[i].author;
                    comment_date = allComments[i].date_added;
                    comment_id = allComments[i].id;

                    if (user.id === comment_author){
                        commentProjectName = findProjectName(comment_project);
                        usersCommentList.push(
                            <TableBody>
                                <TableRow >
                                    <TableCell align="center">{commentProjectName}</TableCell>
                                    <TableCell align="center">{comment_text}</TableCell>
                                    <TableCell align="center">{comment_date}</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                        onClick={ () => handleClickedDelete(comment_id)}
                                        >
                                        <DeleteIcon ></DeleteIcon>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        );
                    }
                    if (usersCommentList.len === 0){
                        usersCommentList.push(
                            <TableBody>
                            <TableRow >
                                <TableCell align="center">Kullanıcının yorumu yok</TableCell>
                            </TableRow>
                        </TableBody>
                        );
                    }

                }

                return usersCommentList;
            })()}
        </StyledTable>
      </Box>

      </SimpleCard>
    </Container>
  );
};

export default AppTable;
