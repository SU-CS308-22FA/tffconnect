import { Span } from "app/components/Typography";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));


const SimpleForm = () => {
    const [state, setState] = useState({});
   
    const navigator = useNavigate();
    const handleSubmit = (event) => {
      console.log("submitted");
      event.preventDefault();
      //console.log(state);
      postReferees();
      navigator('/material/ListReferees');
    }
  
    const postReferees = () => {
        axios.post('http://127.0.0.1:8000/api/referees/', state).then((response) => {
            console.log(response);
          })
          .catch(error => console.error(error));
    };

    const handleChange = (event) => {
      event.persist();
      setState({ ...state, [event.target.name]: event.target.value });
    };
  
    const {
      name,
      surname,
      city,
      classification,
    } = state;
  

    return (
      <div>
        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
          <Grid container spacing={6}>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

              <TextField
                type="text"
                name="name"
                id="standard-basic"
                value={name || ""}
                onChange={handleChange}
                errorMessages={["this field is required"]}
                label="Name"
                validators={["required"]}
              />
  
              <TextField
                type="text"
                name="surname"
                label="Surname"
                onChange={handleChange}
                value={surname || ""}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />

            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

              <TextField
              type="text"
              name="city"
              label="City"
              value={city || ""}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
              />

              <TextField
              sx={{ mb: 4 }}
              type="text"
              name="classification"
              label="Classification"
              onChange={handleChange}
              value={classification || ""}
              errorMessages={["this field is required"]}
              validators={["required"]}
              />

            </Grid>
          </Grid>
  
          <Button color="primary" variant="contained" type="submit">
            <Icon>send</Icon>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
          </Button>
        </ValidatorForm>
      </div>
    );
  };
    
  export default SimpleForm;
