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
import RefereeTable from '../used-components/RefereeTable';

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
    return (
        <Fragment>
          <ContentBox className="mainView">
            <RefereeTable>
              
            </RefereeTable>
          </ContentBox>
        </Fragment>
    );
  }