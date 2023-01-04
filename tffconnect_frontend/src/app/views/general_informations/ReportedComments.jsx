import * as React from 'react';
import { styled } from '@mui/material';
import { Fragment } from 'react';
import ReportedCommentTable from '../used-components/ReportedCommentTable';

const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
  }));

export default function RefVote() {

    return (
        <Fragment>
          <ContentBox className="refereeVoting">
            <ReportedCommentTable>
            </ReportedCommentTable>
          </ContentBox>
        </Fragment>
    );
}