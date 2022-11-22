import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

function SubmitRequest() {
  return (
    <div>
      {" "}
      <Box
        sx={{
          height: 60,
        }}
      />
      <Typography variant="h4">Submit Request</Typography>
      <Box component="form">
        <Typography>What can I expect after completing this form? </Typography>
        <Typography>
          We’ll take some time to review the details below, and get in touch if
          we have any questions. You’ll hear from us if the listing is approved!
        </Typography>

        <Divider />
        <Typography>Information for us to contact you</Typography>
        <TextField
          label="Name"
          defaultValue="Enter Name"
          size="Normal"
          variant="outlined"
        />
        <TextField
          label="Email"
          defaultValue="Enter Email"
          size="Normal"
          variant="outlined"
        />
        <Divider />
        <Typography>
          Information you would like to post in the online public listing
        </Typography>

        <Typography>Organisation Logo </Typography>
        <Button variant="outlined"> Upload</Button>
        <TextField
          label="Skills Needed"
          multiline
          rows={4}
          defaultValue="What skills do you need? e.g. illustration, content creating, video, packaging design"
        />

        <TextField
          label="Contact Details"
          defaultValue="Contact email or link to sign up form for volunteers"
          size="Normal"
          variant="outlined"
        />

        <TextField
          label="About your non-profit/community initiative"
          multiline
          rows={4}
          defaultValue="Tell us more about your organisation"
        />

        <TextField
          label="Project Details"
          multiline
          rows={4}
          defaultValue="Tell us more about your project in detail."
        />

        <TextField
          label="Non-profit Location"
          defaultValue="Enter postal code"
        />
        <FormControl sx={{ m: 1, minWidth: 160 }}>
          <InputLabel>Renumeration </InputLabel>
          <Select>
            <MenuItem value={10}>Paid</MenuItem>
            <MenuItem value={20}>Low Bono</MenuItem>
            <MenuItem value={30}>Pro Bono</MenuItem>
          </Select>
        </FormControl>

        <Divider />
        <Button variant="contained">Submit</Button>
      </Box>
    </div>
  );
}

export default SubmitRequest;
