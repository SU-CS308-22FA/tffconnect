import { Card, Grid, styled, useTheme } from '@mui/material';
import { Fragment } from 'react';
import Campaigns from './shared/Campaigns';
import DoughnutChart from './shared/Doughnut';
import RowCards from './shared/RowCards';
import StatCards from './shared/StatCards';
import StatCards2 from './shared/StatCards2';
import TopSellingTable from './shared/TopSellingTable';
import UpgradeCard from './shared/UpgradeCard';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import axios from 'axios';
import useAuth from 'app/hooks/useAuth';
import { API_URL } from 'app/constants';

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

const H4 = styled('h4')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginBottom: '16px',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));

const Analytics = () => {
  const { palette } = useTheme();
  const { user } = useAuth();
  let [allNews, setResponseData] = useState('');
  const [newsId, setNewsId] = useState(null);

  /**
   * @name sendPostRequest function sends a request to the backend server to add an item favorited by a user
   * to be shown in the favorites view later.
   * @param news_id comes from the id of the news item favorited by the user
   * @param user_id is the id of the logged in user, if the user is not logged in
   * the post request is not sent!
   */
  useEffect(() => {
    const sendPostRequest = async () => {
      try {
        await axios.post('/api/favorites/', { news_id: newsId, user_id: user.id });
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
    axios.get(API_URL + '/news/')
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
                    let imageUrlStr = "https://tffconnect.com" + allNews[i].image
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
                      let imageUrlStr = "https://tffconnect.com" + allNews[i].image
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

            <H4>Ongoing Projects</H4>
            <RowCards />
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>Traffic Sources</Title>
              <SubTitle>Last 30 days</SubTitle>

              <DoughnutChart
                height="300px"
                color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
              />
            </Card>

            <UpgradeCard />
            <Campaigns />
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default Analytics;
