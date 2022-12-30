import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Container, Grid } from '../../../node_modules/@mui/material/index';
import { Fragment } from 'react';
import { API_URL } from 'app/constants';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CommentIcon from '@mui/icons-material/Comment';
import { async } from '../../../node_modules/regenerator-runtime/runtime';


const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

  
export default function ProjectDashboard() {
    const [isexpanded, setIsExpanded] = useState({});
    let [allProjects, setResponseData] = useState([]);
    let [allComments, setComments] = useState([]);

    
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
        
        console.log(isexpanded[projectid_index]);
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

    useEffect(() => {
        getProjectItems();
    }, []);

    const  getProjectItems = () => {

        axios.get(API_URL + '/projects/')
            .then(response => {
                allProjects = response.data;
                console.log(allProjects);
                setResponseData(allProjects);
            })
            .catch(err => {
                console.log(err);
            })

        axios.get(API_URL + '/projects/comments/')
            .then(response2 => {
                allComments = response2.data;
                console.log(allComments);
                setComments(allComments);
            })
            .catch(err2 => {
                console.log(err2);
            })
    };

    return (
        <Fragment>
            <ContentBox className ="ProjectDashboard">
                <Grid container spacing={-2}>
                    <Grid item xs={12} sm={6} md={4}>

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
                                let list = [];
                                let projectName,projectStartDate, projectBudget, projectDescription;
                                for (let i = 0; i<len ; i++){
                                    defineIsExpanded(i);
                                    projectName = allProjects[i].name;
                                    projectStartDate = allProjects[i].start_date;
                                    projectBudget = allProjects[i].budget;
                                    projectDescription = allProjects[i].description;
                                    list.push(
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
                                                <IconButton aria-label="add to favorites">
                                                    <FavoriteIcon />
                                                </IconButton>
                                                <IconButton>
                                                    <CommentIcon onClick = { ()=> handleExpandClick(i) }/>
                                                </IconButton>
                                            </CardActions>

                                            <Collapse in={isexpanded[i] === true} timeout="auto" unmountOnExit>
                                                <CardContent>
                                                <Typography paragraph>
                                                    COMMENT WILL SHOWN HERE:
                                                </Typography>

                                                </CardContent>
                                            </Collapse>
                                        </Card>
                                    );
                                }
                                return list;
                            }
                        })()}
                    </Grid>
                    <Grid item xs={6} sm={3} md={0.5}>
                        <Container>
                        
                        </Container>
                    </Grid>
                    Burda
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{ minWidth: 275, px: 3, py: 2, mb: 3 }}>

                        </Card>
                    </Grid>
                </Grid>
            </ContentBox>
        </Fragment>
    );
  }