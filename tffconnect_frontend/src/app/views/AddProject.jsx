import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Button,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  styled,
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from 'axios';
import useAuth from 'app/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'app/constants';

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const SimpleForm = () => {
  const { user } = useAuth();
  const [state, setState] = useState({
    proposal_date : new Date(),
    start_date : new Date(),
    end_date : new Date(),
    confirmation_date : new Date(),
    owner : user.id,
    is_finished : false
  });
  
  const navigator = useNavigate();

  const handleSubmit = (event) => {
    console.log("submitted");
    event.preventDefault();
    console.log(state);
    postProject();
    navigator('/material/listproject');
  }
  const postProject = () => {
    axios.post(API_URL + '/projects/', state).then((response) => {
        console.log(response);
      })
      .catch(error => console.error(error));
  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleProposalDateChange = (proposal_date) => setState({ ...state, proposal_date });
  const handleStartDateChange = (start_date) => setState({ ...state, start_date });
  const handleEndDateChange = (end_date) => setState({ ...state, end_date });
  const handleConfirmationDateChange = (confirmation_date) => setState({ ...state, confirmation_date });

  const {
    name,
    is_finished, // it will be false by default
    proposal_date,
    start_date,
    end_date,
    description, 
    location, 
    budget,
    owner, // will be automatically user???
    is_confirmed_by_tff, // optional
    confirmation_date, 
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
              label="Project Name"
              validators={["required"]}
            />

            <TextField
              type="text"
              name="description"
              label="Project Description"
              onChange={handleChange}
              value={description || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={proposal_date}
                onChange={handleProposalDateChange}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    label="Project Proposal Date"
                    id="mui-pickers-date"
                    sx={{ mb: 2, width: "100%" }}
                  />
                )}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={end_date}
                onChange={handleStartDateChange}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    label="Project Start Date"
                    id="mui-pickers-date"
                    sx={{ mb: 2, width: "100%" }}
                  />
                )}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={start_date}
                onChange={handleEndDateChange}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    label="Project End Date"
                    id="mui-pickers-date"
                    sx={{ mb: 2, width: "100%" }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

          <TextField
              type="text"
              name="location"
              label="Project Location"
              value={location || ""}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={"this field is required"}
            />

          <TextField
              sx={{ mb: 4 }}
              type="text"
              name="budget"
              label="Project Budget"
              onChange={handleChange}
              value={budget || ""}
              errorMessages={["this field is required"]}
              validators={["required"]}
            />

            <div>
              Is Confirmed by TFF?
            </div>

            <RadioGroup
              row
              label = "Is Confirmed by TFF"
              name="is_confirmed_by_tff"
              sx={{ mb: 2 }}
              value={is_confirmed_by_tff || ""}
              onChange={handleChange}
            >

              <FormControlLabel
                value="true"
                label="Yes"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

              <FormControlLabel
                value="false"
                label="No"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

            </RadioGroup>
            
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={confirmation_date}
                onChange={handleConfirmationDateChange}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    label="Confirmation Date by TFF"
                    id="mui-pickers-date"
                    sx={{ mb: 2, width: "100%" }}
                  />
                )}
              />
            </LocalizationProvider>
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
