import * as React from 'react';
import { styled } from '@mui/material';
import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import VoteForm from '../used-components/RefereeVoteForm';

const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
  }));

export default function RefVote() {
    const location = useLocation();
    const gameID = location.state.gameID;

    return (
        <Fragment>
          <ContentBox className="refereeVoting">
            <VoteForm gameID={gameID} >
            </VoteForm>
          </ContentBox>
        </Fragment>
    );
}