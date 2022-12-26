import * as React from 'react';
import { styled } from '@mui/material';
import { Fragment } from 'react';
import RefereeTable from '../used-components/RefereeTable';

const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
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