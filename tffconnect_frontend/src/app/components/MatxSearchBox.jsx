import { Icon, IconButton } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import { topBarHeight } from 'app/utils/constant';
import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import { API_URL } from 'app/constants';


const SearchInput = styled('input')(({ theme }) => ({
  width: '100%',
  border: 'none',
  outline: 'none',
  fontSize: '1rem',
  paddingLeft: '20px',
  height: 'calc(100% - 5px)',
  background: theme.palette.primary.main,
  color: theme.palette.text.primary,
  '&::placeholder': { color: theme.palette.text.primary },
}));

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 9,
  width: '500%',
  display: 'flex',
  alignItems: 'center',
  height: topBarHeight,
  background: theme.palette.primary.main,
  color: theme.palette.text.primary,
  '&::placeholder': {
    color: theme.palette.text.primary,
  },
}));

const AutoComplete = styled(Autocomplete)(() => ({
  width: 500,
  marginTop: '8px',
  marginBottom: '8px',
}));

const MatxSearchBox = () => {

  const [open, setOpen] = useState(false);
  let [allProjects, setResponseData] = useState([]);

  useEffect(() => {
    getProjectItems();
}, []);

  const getProjectItems = () => {

    axios.get(API_URL + '/projects/')
    .then((response) => {
        setResponseData(response.data);
        console.log("projeler");
        console.log(allProjects);
    })
    .catch(error => console.error(error));
  };

  const toggle = () => {
    setOpen(!open);
  };

  const { palette } = useTheme();
  const textColor = palette.text.primary;

  return (
    <React.Fragment>
      {!open && (
        <IconButton onClick={toggle}>
          <Icon sx={{ color: textColor }}>search</Icon>
        </IconButton>
      )}

      {open && (
        <SearchContainer>
          <AutoComplete
          options={allProjects}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="Search the projects here.." margin="normal" variant="outlined" fullWidth />
          )}
          />
          <IconButton onClick={toggle} sx={{ mx: 2, verticalAlign: 'middle' }}>
            <Icon sx={{ color: textColor }}>close</Icon>
          </IconButton>
        </SearchContainer>
      )}
    </React.Fragment>
  );
};

export default MatxSearchBox;
