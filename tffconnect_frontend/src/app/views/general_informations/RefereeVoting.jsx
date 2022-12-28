import * as React from 'react';
import { styled } from '@mui/material';
import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';

const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
  }));

export default function RefVote() {
    const location = useLocation();
    console.log(location);

    const params = new URLSearchParams(location.search);
    const param1 = params.get('param1');
    console.log("Game ID: " + param1);

    return (
        <Fragment>
          <ContentBox className="refereeVoting">
          </ContentBox>
        </Fragment>
    );
}