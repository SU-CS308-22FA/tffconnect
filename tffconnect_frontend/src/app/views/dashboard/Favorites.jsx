import * as React from 'react';
import { useEffect, useState } from 'react';
import { Card, Grid, styled, useTheme } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { Fragment } from 'react';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import axios from 'axios';
import useAuth from 'app/hooks/useAuth';
import { API_URL, IMAGE_URL } from 'app/constants';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize',
}));

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const Description = styled('span')(() => ({
  fontSize: '0.7rem',
}));

export default function Favorites() {
  const { user } = useAuth();
  const [news, setNews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [combined_favorites, setCombinedData] = useState([]);
  const [user_favorites, setUserFavorites] = useState([]);

  /**
   * @name useEffect function just below this statement makes two get requests to get the required
   * information from two endpoints.
   * @param newsResponse is the response turned back from the news endpoint
   * @param favoritesResponse is the response turned back from the favorites endpoint
   * The function sets the data turned back from the responses to the news and favorites arrays defined
   * above.
   */
  useEffect(() => {
    axios.all([
      axios.get(API_URL + '/news/'),
      axios.get(API_URL + '/favorites/')
    ])
    .then(axios.spread((newsResponse, favoritesResponse) => {
      setNews(newsResponse.data);
      setFavorites(favoritesResponse.data);
    }))
    .catch(error => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    const combinedNews = favorites.map((f) => {
      const newss = news.find((n) => n.id === f.news_id);
      return {
        ...f,
        newss: newss || null,
      };
    });
    setCombinedData(combinedNews)
  }, [news, favorites]);

  useEffect(() => {
    const userFavorites = combined_favorites.filter(item => item.user_id === user.id);
    setUserFavorites(userFavorites);
  }, [combined_favorites, user.id]);
  
  let whereToStart = Math.ceil(user_favorites.length/2);

  if (user == null) {
    return (
      <Fragment>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <ContentBox className="favorites">
          <Grid container spacing={-1}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <ul>
                {(() => {
                  let cards = [];
                  for (let i=0; i < whereToStart; i++) {
                    let imageUrlStr = IMAGE_URL + user_favorites[i].newss.image
                    cards.push (
                      <Card sx={{ px: 3, py: 2, mb: 3 }}>
                      <CardMedia
                        component="img"
                        height="300"
                        image={imageUrlStr}
                        alt={user_favorites[i].newss.image}
                      />
                      <Title>{user_favorites[i].newss.header}</Title>
                      <SubTitle>Haber</SubTitle><br></br>
                      <Description>{user_favorites[i].newss.details}</Description>
                      <CardActions disableSpacing>
                        <IconButton aria-label="delete">
                          <RemoveCircleIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                          <ShareIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                    );
                  }
                  return cards;
                })()}
              </ul>
            </Grid>
  
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <ul>
                  {(() => {
                    let cards = [];
                    for (let i=whereToStart; i < user_favorites.length; i++) {
                      let imageUrlStr = IMAGE_URL + user_favorites[i].newss.image
                      cards.push (
                        <Card sx={{ px: 3, py: 2, mb: 3 }}>
                        <CardMedia
                          component="img"
                          height="300"
                          image={imageUrlStr}
                          alt={user_favorites[i].newss.image}
                        />
                        <Title>{user_favorites[i].newss.header}</Title>
                        <SubTitle>Haber</SubTitle><br></br>
                        <Description>{user_favorites[i].newss.details}</Description>
                        <CardActions disableSpacing>
                          <IconButton aria-label="delete">
                            <RemoveCircleIcon />
                          </IconButton>
                          <IconButton aria-label="share">
                            <ShareIcon />
                          </IconButton>
                        </CardActions>
                      </Card>
                      );
                    }
                    return cards;
                  })()}
                </ul>
            </Grid>
  
          </Grid>
        </ContentBox>
      </Fragment>
    );
  }
};