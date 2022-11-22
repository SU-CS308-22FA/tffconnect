import * as React from 'react';
import { useEffect, useState } from 'react';
import { Card, Grid, styled, useTheme } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import { Fragment } from 'react';
import Campaigns from './shared/Campaigns';
import DoughnutChart from './shared/Doughnut';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import RowCards from './shared/RowCards';
import StatCards from './shared/StatCards';
import StatCards2 from './shared/StatCards2';
import TopSellingTable from './shared/TopSellingTable';
import UpgradeCard from './shared/UpgradeCard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import axios from 'axios';
import logo from './components/voleybol.jpeg';
import logo2 from './components/haftanin_programi.jpeg';
import logo3 from './components/kadin_amilli.jpeg';
import proje from './components/stadyum.jpg';
import proje2 from './components/genc_yildiz.png';

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
  let [allNews, setResponseData] = useState('');

  useEffect(() => {
    getNewsItems();
  }, []);

  const getNewsItems = () => {
    axios.get('http://127.0.0.1:8000/api/news/')
    .then((response) => {
      allNews = response.data;
      setResponseData(allNews);
      console.log(allNews);
    })
    .catch(error => console.error('Error: ${error}'));
  }

    return (
      <Fragment>
        <ContentBox className="analytics">
          <Grid container spacing={3}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Card sx={{ px: 3, py: 2, mb: 3 }}>
                <CardMedia
                  component="img"
                  height="300"
                  image= {logo}
                  alt="dunya_samp"
                />
                <Title>Voleybol Dünya Şampiyonası Başlıyor</Title>
                <SubTitle>Haber</SubTitle>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
              <Card sx={{ px: 3, py: 2, mb: 3 }}>
                <CardMedia
                  component="img"
                  height="300"
                  image= {proje}
                  alt="stadyum"
                />
                <Title>Bitlis'te Stadyum İnşaatı Sürüyor</Title>
                <SubTitle>Proje</SubTitle>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>

            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Card sx={{ px: 3, py: 2, mb: 3 }}>
                <CardMedia
                  component="img"
                  height="300"
                  image= {proje2}
                  alt="gencyildiz"
                />
                <Title>Beylikdüzü Genç Yıldızlar Futbol Okulu Açılıyor</Title>
                <SubTitle>Proje</SubTitle>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>

              <Card sx={{ px: 3, py: 2, mb: 3 }}>
                <CardMedia
                  component="img"
                  height="300"
                  image= {logo2}
                  alt="ligler"
                />
                <Title>Liglerde Haftanın Programı</Title>
                <SubTitle>Haber</SubTitle>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>

            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Card sx={{ px: 3, py: 2, mb: 3 }}>
                <CardMedia
                  component="img"
                  height="300"
                  image= {logo3}
                  alt="amilli"
                />
                <Title>Kadın A Milli Takımı, Ürdün'ü 5-0 Yendi</Title>
                <SubTitle>Haber</SubTitle>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>

          </Grid>
        </ContentBox>
      </Fragment>
    );
};
