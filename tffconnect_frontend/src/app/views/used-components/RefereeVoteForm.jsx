import { Button, Grid, Icon, styled } from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';
import { API_URL } from 'app/constants';

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

export default function VoteForm(props) {
  const gameID = props.gameID;
  console.log("Child reporting-GameID: " + gameID);
  const [rating, setRating] = useState(3.5);
  const [game, setGame] = useState([]);
  const [referee, setReferee] = useState([]);
  const [game_referee, setRefName] = useState([]);

  useEffect(() => {
    axios.all([
      axios.get(API_URL + '/referees/'),
      axios.get(API_URL + '/games/' + gameID + '/')
    ])
    .then(axios.spread((refereesResponse, gamesResponse) => {
      setReferee(refereesResponse.data);
      setGame(gamesResponse.data);
    }))
    .catch(error => {
      console.error(error);
    });
  }, []);

  console.log(game);

  const handleChange = (event) => {
    setRating(event.target.rating);
  };

  const handleSubmit = (event) => {
    // console.log("submitted");
    // console.log(event);
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12}>
            <TextField
              disabled
              type="text"
              name="game_name"
              label="Username (Min length 4, Max length 9)"
            />

            <TextField
              type="text"
              name="firstName"
              label="First Name"
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            <TextField
              label="Hakeme Verilen Puan"
              type="number"
              inputProps={{
                step: 0.1,
                min: 0.0,
                max: 5.0,
              }}
              value={rating}
              onChange={handleChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">(5.0 üzerinden)</InputAdornment>,
              }}
            />

          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Oyla</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};