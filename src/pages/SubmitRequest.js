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
import { db, storage } from "../firebase";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

function SubmitRequest() {
  const [formData, setFormData] = useState({
    about: "",
    contact: "",
    display: false,
    email: "",
    location: "",
    logoURL: "",
    name: "",
    project: "",
    remuneration: "",
    skills: "",
  });

  const [logo, setLogo] = React.useState(null);
  const [fileValue, setFileValue] = React.useState("");

  const handleFileChange = (e) => {
    setFileValue(e.target.value);
    setLogo(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fileRef = storageRef(storage, `logos/${logo.name}`);
    uploadBytes(fileRef, logo).then(() => {
      getDownloadURL(fileRef).then((downloadUrl) => {
        console.log(formData);
        const collectionRef = collection(db, "posts");
        addDoc(collectionRef, {
          ...formData,
          logoURL: downloadUrl,
        });
      });
    });
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
          name="name"
          onChange={handleChange}
          value={formData.name}
          // defaultValue="Enter Name"
          size="Normal"
          variant="outlined"
        />
        <TextField
          label="Email"
          id="email"
          name="email"
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

        {/* <Typography>Organisation Logo </Typography>
        <Button variant="outlined"> Upload</Button> */}
        <TextField
          label="Organization Logo"
          type="file"
          id="logo"
          name="logo"
          onChange={handleFileChange}
          value={fileValue}
          size="Normal"
          variant="outlined"
        />
        <TextField
          label="Skills Needed"
          id="skills"
          name="skills"
          onChange={handleChange}
          value={formData.skills}
          multiline
          rows={4}
          // defaultValue="What skills do you need? e.g. illustration, content creating, video, packaging design"
        />
        <TextField
          label="Contact Details"
          id="contact"
          name="contact"
          onChange={handleChange}
          value={formData.contact}
          // defaultValue="Contact email or link to sign up form for volunteers"
          size="Normal"
          variant="outlined"
        />
        <TextField
          label="About your non-profit/community initiative"
          id="about"
          name="about"
          onChange={handleChange}
          value={formData.about}
          multiline
          rows={4}
          // defaultValue="Tell us more about your organisation"
        />
        <TextField
          label="Project Details"
          id="project"
          name="project"
          onChange={handleChange}
          value={formData.project}
          multiline
          rows={4}
          // defaultValue="Tell us more about your project in detail."
        />
        <TextField
          label="Non-profit Location"
          id="location"
          name="location"
          onChange={handleChange}
          value={formData.location}
          // defaultValue="Enter postal code"
        />
        <FormControl sx={{ m: 1, minWidth: 160 }}>
          <InputLabel id="remuneration">Remuneration </InputLabel>
          <Select
            id="remuneration"
            name="remuneration"
            onChange={handleChange}
            value={formData.remuneration}
          >
            <MenuItem value={"Paid"}>Paid</MenuItem>
            <MenuItem value={"Low Bono"}>Low Bono</MenuItem>
            <MenuItem value={"Pro Bono"}>Pro Bono</MenuItem>
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
