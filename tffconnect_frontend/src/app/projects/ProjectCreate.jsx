import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Button,
  Checkbox,
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

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const SimpleForm = () => {
  const [state, setState] = useState({ date: new Date() });

  const handleSubmit = (event) => {

    // console.log("submitted");
    // console.log(event);
  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleDateChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const {
    project_name,
    is_finished, // it will be false by default
    proposal_date,
    start_date,
    end_date,
    project_description, 
    project_location, 
    project_budget,
    project_owner, // will be automatically user???
    is_confirmed_by_tff, // optional
    confirmation_date, // optional

  } = state;

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="project_name"
              id="standard-basic"
              value={project_name || ""}
              onChange={handleChange}
              errorMessages={["this field is required"]}
              label="Project Name"
              validators={"required"}
            />

            <TextField
              type="text"
              name="project_description"
              label="Project Description"
              onChange={handleChange}
              value={project_description || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={proposal_date}
                onChange={handleDateChange}
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
                onChange={handleDateChange}
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
                onChange={handleDateChange}
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
              name="project_location"
              label="Project Location"
              value={project_location || ""}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={"this field is required"}
            />

          <TextField
              sx={{ mb: 4 }}
              type="text"
              name="project_budget"
              label="Project Budget"
              onChange={handleChange}
              value={project_budget || ""}
              errorMessages={["this field is required"]}
              validators={"required"}
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
                value="True"
                label="Yes"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

              <FormControlLabel
                value="False"
                label="No"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

            </RadioGroup>
            
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={confirmation_date}
                onChange={handleDateChange}
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
