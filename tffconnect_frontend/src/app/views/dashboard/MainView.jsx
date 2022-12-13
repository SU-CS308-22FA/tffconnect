import * as React from 'react';
import { useEffect, useState } from 'react';
import { Card, Grid, styled, useTheme } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { Fragment } from 'react';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import axios from 'axios';
import useAuth from 'app/hooks/useAuth';

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

export default function MainView() {
  const { palette } = useTheme();
  const { user } = useAuth();
  let [allNews, setResponseData] = useState('');
  const [newsId, setNewsId] = useState(null);

  useEffect(() => {
    const sendPostRequest = async () => {
      try {
        await axios.post('http://127.0.0.1:8000/api/favorites/', { news_id: newsId, user_id: user.id });
      } catch (err) {
        console.error(err);
      }
    }
    if (newsId) {
      sendPostRequest();
    }
  }, [newsId]);

  useEffect(() => {
    getNewsItems();
  }, []);

  const getNewsItems = () => {
    axios.get('http://127.0.0.1:8000/api/news/')
    .then((response) => {
      allNews = response.data;
      setResponseData(allNews);
      console.log(allNews);
      console.log(allNews.length);
    })
    .catch(error => console.error('Error: ${error}'));
  }

  let whereToStart = Math.ceil(allNews.length/2);
  console.log(whereToStart);

    return (
      <Fragment>
        <ContentBox className="mainView">
          <Grid container spacing={-1}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <ul>
                {(() => {
                  let cards = [];
                  for (let i=0; i < whereToStart; i++) {
                    let imageUrlStr = "http://127.0.0.1:8000" + allNews[i].image
                    cards.push (
                      <Card sx={{ px: 3, py: 2, mb: 3 }}>
                      <CardMedia
                        component="img"
                        height="300"
                        image={imageUrlStr}
                        alt={allNews[i].image}
                      />
                      <Title>{allNews[i].header}</Title>
                      <SubTitle>Haber</SubTitle><br></br>
                      <Description>{allNews[i].details}</Description>
                      <CardActions disableSpacing>
                        <IconButton onClick={() => setNewsId(allNews[i].id)}>
                          <FavoriteIcon />
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
                    for (let i=whereToStart; i < allNews.length; i++) {
                      let imageUrlStr = "http://127.0.0.1:8000" + allNews[i].image
                      cards.push (
                        <Card sx={{ px: 3, py: 2, mb: 3 }}>
                        <CardMedia
                          component="img"
                          height="300"
                          image={imageUrlStr}
                          alt={allNews[i].image}
                        />
                        <Title>{allNews[i].header}</Title>
                        <SubTitle>Haber</SubTitle><br></br>
                        <Description>{allNews[i].details}</Description>
                        <CardActions disableSpacing>
                          <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
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
};
