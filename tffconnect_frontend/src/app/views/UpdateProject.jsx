import * as React from 'react';
import { useEffect, useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
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
import axios from 'axios';
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useNavigate } from 'react-router-dom';

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
  }));


const SimpleForm = () => {

    const [id, setID] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [is_finished, setIsFinished] = useState(false);
    const [proposal_date, setProposalDate] = useState(new Date());
    const [start_date, setStartDate] = useState(new Date());
    const [end_date, setEndDate] = useState(new Date());
    const [location, setLocation] = useState('');
    const [budget, setBudget] = useState('');
    const [owner, setOwner] = useState(''); // must be project object id !!! // objectteki owner
    const [is_confirmed_by_tff, setIsConfirmedByTff] = useState(false);
    const [confirmation_datetime, setConfirmationDate] = useState(new Date());

    const navigator = useNavigate();

      /**
   * @name updateSubmit function sends a request to the backend server to update a project item with the given id
   * @param id comes from the listing page and is used to update the project item. its the Project object id.
   * @param  description is the description of the project
   */
    const updateSubmit = () => {
        axios.put('https://tffconnect.com/api/projects/edit/' + id +'/' , 
        {
            id: id,
            name: name,
            description: description,
            is_finished: is_finished,
            proposal_date: proposal_date,
            start_date: start_date,
            end_date: end_date,
            location: location,
            budget: budget,
            owner: owner,
            is_confirmed_by_tff: is_confirmed_by_tff,
            confirmation_datetime: confirmation_datetime
        })
        .then((response) => {
            console.log(response);
            navigator('/material/listproject');
        })
        .catch(error => console.error(error));


    }
    useEffect(() => {
        setID(localStorage.getItem('id'));
        setName(localStorage.getItem('name'));
        setDescription(localStorage.getItem('description'));
        setIsFinished(localStorage.getItem('is_finished'));
        setProposalDate(localStorage.getItem('proposal_date'));
        setStartDate(localStorage.getItem('start_date'));
        setEndDate(localStorage.getItem('end_date'));
        setLocation(localStorage.getItem('location'));
        setBudget(localStorage.getItem('budget'));
        setOwner(localStorage.getItem('owner'));
        setIsConfirmedByTff(localStorage.getItem('is_confirmed_by_tff'));
        setConfirmationDate(localStorage.getItem('confirmation_datetime'));
    }, []);

    const handleProposalDateChange = (proposal_date) => setProposalDate(proposal_date);
    const handleStartDateChange = (start_date) => setStartDate( start_date );
    const handleEndDateChange = (end_date) => setEndDate(end_date );
    const handleConfirmationDateChange = (confirmation_datetime) => setConfirmationDate(confirmation_datetime );

    return (
        <div>
          <ValidatorForm onSubmit={updateSubmit} onError={() => null}>
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  type="text"
                  name="name"
                  id="standard-basic"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                  errorMessages={["this field is required"]}
                  label="Project Name"
                  validators={["required"]}
                />
    
                <TextField
                  type="text"
                  name="description"
                  label="Project Description"
                  onChange={(e) => setDescription(e.target.value)}
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
                    onChange={handleEndDateChange}
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
                    onChange={handleStartDateChange}
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

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={confirmation_datetime}
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
    
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
    
              <TextField
                  type="text"
                  name="location"
                  label="Project Location"
                  value={location || ""}
                  onChange={e => setLocation(e.target.value)}
                  validators={["required"]}
                  errorMessages={"this field is required"}
                />
    
              <TextField
                  sx={{ mb: 4 }}
                  type="text"
                  name="budget"
                  label="Project Budget"
                  onChange={(e) => setBudget(e.target.value)}
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
                  onChange={(e) => setIsConfirmedByTff(e.target.value)}
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
              </Grid>
            </Grid>
    
            <Button color="primary" variant="contained" type="submit">
              <Icon>send</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Update</Span>
            </Button>
          </ValidatorForm>
        </div>
      );
};
export default SimpleForm;