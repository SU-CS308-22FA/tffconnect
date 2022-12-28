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
import { Grid } from '../../../node_modules/@mui/material/index';
import { Fragment } from 'react';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
}));

const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);
  

export default function ProjectDashboard() {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleSettingsClick = () => {
        console.log("REPORTED");
    };
    return (
        <Fragment>
            <ContentBox className ="ProjectDashboard">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>

                        <Card sx={{ minWidth: 275 }}>
                            <CardHeader title = "Proje 1" subheader = "BAŞLAMA TARİHi" 
                                action = {
                                    <IconButton aria-label="settings" onClick = {()=> handleSettingsClick()}>
                                        <MoreVertIcon />
                                    </IconButton>
                                }  
                            />
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    PROJE bütçesi
                                </Typography>
                                <Typography variant="h5" component="div">
                                    PROJE 1 DESCRIPTION
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton>
                                <ExpandMore
                                expand={expanded}
                                onClick={() => handleExpandClick()}
                                aria-expanded={expanded}
                                aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                <Typography paragraph>
                                    Method:
                                </Typography>
                                <Typography paragraph>
                                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                    aside for 10 minutes.
                                </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </Grid>
                </Grid>
            </ContentBox>
        </Fragment>
    );
  }