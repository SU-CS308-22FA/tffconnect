import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Container, Grid } from '../../../node_modules/@mui/material/index';
import { Fragment } from 'react';
import { API_URL } from 'app/constants';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CommentIcon from '@mui/icons-material/Comment';
import List from '@mui/material/List';
import { ListItemSecondaryAction } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import useAuth from 'app/hooks/useAuth';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import FlagIcon from '@mui/icons-material/Flag';


const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

  
export default function ProjectDashboard() {
    const { user } = useAuth();
    const [isexpanded, setIsExpanded] = useState({});
    let [allProjects, setResponseData] = useState([]);
    let [allComments, setComments] = useState([]);
    let [allUsers, setUsers] = useState([]);

    const handleReport = (item) => {
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
              is_approved: true,
            })
          });
    };
    
    const handleExpandClick = (projectid_index) => {
        if (isexpanded[projectid_index] === undefined) {
            setIsExpanded({
                ...isexpanded,
                [projectid_index]: false
            });
        }
        else {
            setIsExpanded({
                ...isexpanded,
                [projectid_index]: !isexpanded[projectid_index]
            });
        }
    };

    const defineIsExpanded = (projectid_index) => {
        if (isexpanded[projectid_index] === undefined) {
            setIsExpanded({
                ...isexpanded,
                [projectid_index]: false
            });
        }
    };

    const handleSettingsClick = () => {
        console.log("REPORTED");
    };

    const handleCommentClick = () => {
        console.log("COMMENTED");
    };

    useEffect(() => {
        getProjectItems();
        getUserNames();
    }, []);

    const  getProjectItems = () => {

        axios.get(API_URL + '/projects/')
            .then(response => {
                allProjects = response.data;
                //console.log(allProjects);
                setResponseData(allProjects);
            })
            .catch(err => {
                console.log(err);
            })

        axios.get(API_URL + '/projects/comments/')
            .then(response2 => {
                allComments = response2.data;
                //console.log(allComments);
                setComments(allComments);
            })
            .catch(err2 => {
                console.log(err2);
            })
    };
    const timeSeperator = (time) => {
        let date = time.split("T")[0];
        let hour = time.split("T")[1].split(".")[0];
        return date + "/ " + hour;
    };
    const getusername = (user_id) => {
        let len = allUsers.length;
        for (let i = 0; i < len; i++) {
            if (allUsers[i].id === user_id) {
                return allUsers[i].username;
            }
        }  
    };
    const getUserNames = (user_id) => {
        let accessToken = localStorage.getItem('accessToken');

        axios.get(API_URL + '/users/', {
            headers: {
                Authorization: "Token " + accessToken,
              },
        })
            .then(response => {
                let allUsers = response.data;
                setUsers(allUsers);
                //console.log(allUsers);
            })
            .catch(err => {
                console.log(err);
            })
        
    }; 

    return (
        <Fragment >
            <ContentBox className ="ProjectDashboard" style={{ margin: 'auto' }}>
                <Grid container spacing={-2} justifyContent="center" alignItems="center">
                    <Grid item xs={24} sm={12} md={8}>

                        {(() => {
                            let len = allProjects.length;

                            if (len === 0) {
                                return (
                                <Card sx={{ minWidth: 275, px: 3, py: 2, mb: 3  }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                                PROJE BULUNAMADI
                                        </Typography>
                                    </CardContent>
                                </Card>
                                );
                            }
                            else{
                                let projectList = [];
                                let projectName,projectStartDate, projectBudget, projectDescription;
                                
                                for (let i = 0; i<len ; i++){
                                    defineIsExpanded(i);
                                    projectName = allProjects[i].name;
                                    projectStartDate = allProjects[i].start_date;
                                    projectBudget = allProjects[i].budget;
                                    projectDescription = allProjects[i].description;
                                    projectStartDate = timeSeperator(projectStartDate);
                                    projectList.push(
                                        <Card expanded={isexpanded[i]} sx={{ minWidth: 275, px: 3, py: 2, mb: 3 }}>
                                            <CardHeader title={`${projectName}`} subheader = {`Başlangiç tarihi: ${projectStartDate}`}
                                                action = {
                                                    <IconButton aria-label="settings" onClick = {()=> handleSettingsClick()}>
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                }  
                                            />
                                            <CardContent>
                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                    Proje Bütçesi: {`${projectBudget}`}
                                                </Typography>
                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                    Proje Açıklaması: {`${projectDescription}`}
                                                </Typography>
                                            </CardContent>
                                            <CardActions disableSpacing>
                                                <IconButton>
                                                    <CommentIcon onClick = { ()=> handleExpandClick(i) }/>
                                                </IconButton>
                                            </CardActions>

                                            <Collapse in={isexpanded[i] === true} timeout="auto" unmountOnExit>
                                                {(() => {  
                                                    let commentList = [];
                                                    let commentLen = allComments.length;
                                                    let commentText, commentAuthor, commentDate;
                                                    for (let j = 0; j<commentLen ; j++){
                                                        if (allProjects[i].id === allComments[j].project){
                                                            commentText = allComments[j].text_body;
                                                            commentAuthor = allComments[j].author;
                                                            commentDate = allComments[j].date_added;
                                                            commentDate= timeSeperator(commentDate);
                                                            commentAuthor= getusername(commentAuthor);
                                                            commentList.push(
                                                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                                    <ListItem alignItems="flex-start">
                                                                        <ListItemText
                                                                        primary={`${commentText}`}
                                                                        secondary={
                                                                            <React.Fragment>
                                                                            <Typography
                                                                                sx={{ display: 'inline' }}
                                                                                component="span"
                                                                                variant="body2"
                                                                                color="text.primary"
                                                                            >
                                                                                {`${commentAuthor}:`}
                                                                            </Typography>
                                                                            {`${commentDate}`}
                                                                            </React.Fragment>
                                                                        }/>
                                                                        <ListItemSecondaryAction>
                                                                            <IconButton onClick={() => handleReport(allComments[j])}>
                                                                                <FlagIcon />
                                                                            </IconButton>
                                                                        </ListItemSecondaryAction>
                                                                    </ListItem>
                                                                    <Divider variant="inset" component="li" />
                                                                    </List>
                                                            );
                                                        }
                                                    }
                                                    if (commentList.length === 0){
                                                        commentList.push(
                                                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                                <ListItem alignItems="flex-start">
                                                                    <ListItemText
                                                                    primary="Yorum Yok..."
                                                                    />
                                                                </ListItem>
                                                                <Divider variant="inset" component="li" />
                                                            </List>
                                                        );
                                                    }
                                                    commentList.push(
                                                        <Box  
                                                            component="form" 
                                                            sx={{
                                                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                                                            }}
                                                            noValidate
                                                            autoComplete="off"
                                                        >
                                                            <TextField id="outlined-basic" label="Yorumunuz" variant="outlined" />
                                                                    
                                                            <Button onClick= {()=> handleCommentClick()} variant="contained" endIcon={<SendIcon />}>
                                                                Gonder
                                                            </Button>
                                                           
                                                        </Box>
                                                    );

                                                    return commentList;
                                                })()}

                                                               
                                            </Collapse>
                                        </Card>
                                    );
                                }
                                return projectList;
                            }
                        })()}
                    </Grid>
                </Grid>
            </ContentBox>
        </Fragment>
    );
  }