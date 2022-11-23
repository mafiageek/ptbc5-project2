import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
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
import { db } from "../firebase";

function SubmitRequest() {
  const [formData, setFormData] = useState({
    about: "",
    contact: "",
    display: false,
    email: "",
    location: "",
    name: "",
    project: "",
    renumeration: "",
    skills: "",
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const collectionRef = collection(db, "posts");
    const docRef = await addDoc(collectionRef, formData);
    console.log("The new ID is: " + docRef.id);
  };

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
          id="name"
          onChange={handleChange}
          value={formData.name}
          // defaultValue="Enter Name"
          size="Normal"
          variant="outlined"
        />
        <TextField
          label="Email"
          id="email"
          onChange={handleChange}
          value={formData.email}
          // defaultValue="Enter Email"
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
          id="skills"
          onChange={handleChange}
          value={formData.skills}
          multiline
          rows={4}
          // defaultValue="What skills do you need? e.g. illustration, content creating, video, packaging design"
        />

        <TextField
          label="Contact Details"
          id="contact"
          onChange={handleChange}
          value={formData.contact}
          // defaultValue="Contact email or link to sign up form for volunteers"
          size="Normal"
          variant="outlined"
        />

        <TextField
          label="About your non-profit/community initiative"
          id="about"
          onChange={handleChange}
          value={formData.about}
          multiline
          rows={4}
          // defaultValue="Tell us more about your organisation"
        />

        <TextField
          label="Project Details"
          id="project"
          onChange={handleChange}
          value={formData.project}
          multiline
          rows={4}
          // defaultValue="Tell us more about your project in detail."
        />

        <TextField
          label="Non-profit Location"
          id="location"
          onChange={handleChange}
          value={formData.location}
          // defaultValue="Enter postal code"
        />
        <FormControl sx={{ m: 1, minWidth: 160 }}>
          <InputLabel id="renumeration">Renumeration </InputLabel>
          <Select
            id="renumeration"
            onChange={handleChange}
            value={formData.renumeration}
          >
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Low Bono">Low Bono</MenuItem>
            <MenuItem value="Pro Bono">Pro Bono</MenuItem>
          </Select>
        </FormControl>

        <Divider />
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </div>
  );
}

export default SubmitRequest;
