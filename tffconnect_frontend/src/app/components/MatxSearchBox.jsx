import { Icon, IconButton } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import { topBarHeight } from 'app/utils/constant';
import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from 'app/constants';

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 9,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  height: topBarHeight,
  background: theme.palette.primary.main,
  color: theme.palette.text.primary,
  '&::placeholder': {
    color: theme.palette.text.primary,
  },
}));

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

const MatxSearchBox = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dataFiltered, setDataFiltered] = useState([]);
  let [allProjects, setResponseData] = useState([]);

  const filterData = (query, data) => {
    if (!query) {
        return data;
    } else {
        return data.filter((d) => d.name.toLowerCase().includes(query)); //neyini filtreliycek
    }
  };


  const HandleSearch = () => {
    // perform the search using the searchQuery value
    // and update the component's state with the search results
    console.log("HandleSearch e giriyo");

    axios.get(API_URL + '/projects/')
    .then((response) => {
        setResponseData(response.data);
        console.log("projeler");
        console.log(allProjects);
        setDataFiltered(filterData(searchQuery, allProjects));
        console.log("filtelenmiş projeler");
        console.log(dataFiltered);
    })
    .catch(error => console.error(error));
    
  };

  const handleInputChange = event => {
    setSearchQuery(event.target.value);
    console.log("query update ediliyo");
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
          <SearchInput 
            type="text" 
            placeholder="Search projects here..."
            autoFocus 
            value={searchQuery}
            onChange={handleInputChange}
          />
          <IconButton onClick={HandleSearch} sx={{ mx: 2, verticalAlign: 'middle' }}>
            <Icon sx={{ color: textColor }}>search</Icon>
          </IconButton>
          <IconButton onClick={toggle} sx={{ mx: 2, verticalAlign: 'middle' }}>
            <Icon sx={{ color: textColor }}>close</Icon>
          </IconButton>
          <div styled="display:block;"> 
          {dataFiltered.length > 0 && (
            <div>
              {dataFiltered.map(result => (
                <div style={{  fontSize: '1rem',paddingRight: '200px',paddingLeft: '30px'}} key={result.id}>{result.name}</div> //görsel biseyler yap allah için
              ))}
            </div>
          )}
          </div>
        </SearchContainer>
      )}
    </React.Fragment>
  );
};

export default MatxSearchBox;
