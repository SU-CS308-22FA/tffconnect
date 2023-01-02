import { Button, Grid, Icon, styled } from "@mui/material";
import { Span } from "app/components/Typography";
import { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import InputAdornment from '@mui/material/InputAdornment';
import { API_URL } from 'app/constants';
import { useNavigate } from 'react-router-dom';

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

export default function VoteForm(props) {
  const gameDetails = props.game;
  console.log("Child reporting-GameID: " + gameDetails);
  const game = JSON.parse(gameDetails);
  const [rating, setRating] = useState(3.5);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setRating(event.target.value);
  };

  const handleSubmit = async () => {
    const response = await fetch(API_URL + '/games/' + game.id + '/',);
    const gameData = await response.json();
    const newCount = parseFloat(gameData.rating_count) + 1;
    const newRating = (parseFloat(gameData.referee_rating) + parseFloat(rating));
    console.log(newRating);
    console.log(newCount);
    const roundedRating = newRating.toFixed(2);
    const updateResponse = await fetch(API_URL + '/games/' + game.id + '/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: gameData.id,
        referee_id: gameData.referee_id,
        game_name: gameData.game_name,
        game_date: gameData.game_date,
        game_result: gameData.game_result,
        referee_rating: roundedRating,
        rating_count: newCount
      })
    });
    const data = await updateResponse.json();
    console.log(data);
    navigate('/data/referee_games');
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12}>
            <TextField
              disabled
              type="text"
              name="referee_fullname"
              label={game.game_name}
            />
            <TextField
              disabled
              type="text"
              name="referee_fullname"
              label={game.referee.name + " " + game.referee.surname}
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