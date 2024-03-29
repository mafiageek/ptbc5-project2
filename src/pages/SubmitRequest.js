import { useEffect, useState } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Stack,
  Snackbar,
} from "@mui/material";
import React from "react";
import { db, storage } from "../firebase";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { Container } from "@mui/system";

function SubmitRequest(props) {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
    navigate(-1);
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formData, setFormData] = useState({
    about: "",
    address: "",
    contact: "",
    isDisplay: false,
    email: "",
    location: "",
    lat: "",
    lng: "",
    mapURL: "",
    logoURL: "",
    organisationName: "",
    projectName: "",
    project: "",
    remuneration: "",
    skills: "",
    contactName: "",
    renumerationDetails: "",
    timestamp: "",
    dueDate: "",
    uid: "",
    replyTo: "",
  });

  const [logo, setLogo] = React.useState(null);
  const [fileValue, setFileValue] = React.useState("");

  const navigate = useNavigate();

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

  const generateEmailPayload = (
    receiver1,
    receiver2,
    subject,
    sender,
    message
  ) => {
    const TEMPLATE = {
      personalizations: [
        {
          to: [{ email: receiver1 }, { email: receiver2 }],
          subject,
        },
      ],
      from: { email: sender },
      content: [{ type: "text/plain", value: message }],
    };
    return JSON.stringify(TEMPLATE);
  };

  const emailNotify = (receiver1, receiver2) => {
    const options = {
      method: "POST",
      url: "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.REACT_APP_SENDGRID_API_KEY,
        "X-RapidAPI-Host": "rapidprod-sendgrid-v1.p.rapidapi.com",
      },
      data: generateEmailPayload(
        receiver1,
        receiver2,
        `A new request from ${props.user.displayName}`,
        "no-reply@mail.com",
        "Review"
      ),
    };

    axios
      .request(options)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  };

  const getGeoData = async (location) => {
    await axios
      .get(
        `https://developers.onemap.sg/commonapi/search?searchVal=${location}&returnGeom=Y&getAddrDetails=Y`
      )
      .then((response) => response.data.results[0])
      .then((response) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          address: response.ADDRESS,
          lat: response.LATITUDE,
          lng: response.LONGITUDE,
        }));
      })
      .catch((error) => console.log(error));
  };

  const getMapURL = async (lat, lng, location) => {
    await axios
      .get(
        `https://developers.onemap.sg/commonapi/staticmap/getStaticImage?layerchosen=default&lat=${lat}&lng=${lng}&postal=${location}&zoom=15&width=512&height=256&points=[${lat},${lng}]`
      )
      .then((response) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          mapURL: response.config.url,
        }));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (formData.location.length === 6) {
      getGeoData(formData.location);
      getMapURL(formData.lat, formData.lng, formData.location);
    }
  }, [formData.lat, formData.lng, formData.location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // file reference
    const fileRef = storageRef(storage, `logos/${logo.name}`);

    // collection reference
    const collectionRef = collection(db, "posts");

    uploadBytes(fileRef, logo).then(() => {
      getDownloadURL(fileRef).then((downloadUrl) => {
        addDoc(collectionRef, {
          ...formData,
          logoURL: downloadUrl,
          dueDate: selectedDate.toDateString(),
          uid: props.user.uid,
          replyTo: props.user.email,
          timestamp: serverTimestamp(),
        });
      });
    });

    emailNotify("anton.kho@gmail.com", "weimankow@gmail.com");
    setState({ ...state, open: true });
  };

  return (
    <div>
      {" "}
      <Box
        sx={{
          height: 60,
        }}
      />
      <Container sx={{ p: 2, mt: 2 }}>
        <Typography variant="h4" sx={{ pb: 2 }}>
          Submit Request
        </Typography>

        <Box component="form">
          <Typography>
            We’ll take some time to review the details below, and get in touch
            if we have any questions. You’ll hear from us if the listing is
            approved!
          </Typography>

          <Paper sx={{ p: 2, mt: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ mb: 1 }}>
                Information for us to contact you
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                gap={2}
                sx={{ mb: 3 }}
              >
                <TextField
                  required
                  fullWidth
                  sx={{ m: 1 }}
                  label="Contact Name"
                  id="contact name"
                  name="contactName"
                  onChange={handleChange}
                  //this is needs to be created
                  value={formData.contactName}
                  size="Normal"
                  variant="outlined"
                />
                <TextField
                  required
                  fullWidth
                  sx={{ m: 1 }}
                  label="Email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  // defaultValue="Enter Email"
                  size="Normal"
                  variant="outlined"
                />
              </Stack>

              <Divider />
              <Typography sx={{ mb: 1 }}>
                Information you would like to display in the volunteer
                opportunities page
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                sx={{ width: "100%" }}
                gap={2}
              >
                <Stack direction="column" sx={{ width: "100%" }} gap={2}>
                  {/* <Typography>Organisation Logo </Typography>
        <Button variant="outlined"> Upload</Button> */}
                  <TextField
                    required
                    fullWidth
                    sx={{ m: 1 }}
                    label="Organisation Name"
                    id="organisationName"
                    name="organisationName"
                    onChange={handleChange}
                    value={formData.organisationName}
                    // defaultValue="Enter Name"
                    size="Normal"
                    variant="outlined"
                  />

                  <TextField
                    label=""
                    fullWidth
                    sx={{ m: 1 }}
                    type="file"
                    id="logo"
                    name="logo"
                    onChange={handleFileChange}
                    value={fileValue}
                    size="Normal"
                    variant="outlined"
                  />

                  <TextField
                    required
                    fullWidth
                    sx={{ m: 1 }}
                    label="Project Name"
                    id="projectnName"
                    name="projectName"
                    onChange={handleChange}
                    value={formData.projectName}
                    // defaultValue="Enter Name"
                    size="Normal"
                    variant="outlined"
                  />
                  <TextField
                    required
                    label="Skills Needed"
                    fullWidth
                    sx={{ m: 1 }}
                    id="skills"
                    name="skills"
                    onChange={handleChange}
                    value={formData.skills}
                    multiline
                    rows={4}
                    // defaultValue="What skills do you need? e.g. illustration, content creating, video, packaging design"
                  />
                  <TextField
                    required
                    label="Contact Details"
                    fullWidth
                    sx={{ m: 1 }}
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
                    fullWidth
                    sx={{ m: 1 }}
                    id="about"
                    name="about"
                    onChange={handleChange}
                    value={formData.about}
                    multiline
                    rows={4}
                    // defaultValue="Tell us more about your organisation"
                  />
                </Stack>
                <Stack direction="column" sx={{ width: "100%" }} gap={2}>
                  <TextField
                    required
                    label="Project Details"
                    fullWidth
                    sx={{ m: 1 }}
                    id="project"
                    name="project"
                    onChange={handleChange}
                    value={formData.project}
                    multiline
                    rows={4}
                    // defaultValue="Tell us more about your project in detail."
                  />
                  <TextField
                    required
                    label="Location postal code"
                    fullWidth
                    sx={{ m: 1 }}
                    id="location"
                    name="location"
                    onChange={handleChange}
                    value={formData.location}
                    // defaultValue="Enter postal code"
                  />
                  <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel id="remuneration">Remuneration </InputLabel>
                    <Select
                      id="remuneration"
                      name="remuneration"
                      onChange={handleChange}
                      value={formData.remuneration}
                    >
                      <MenuItem value={"Paid Project"}>Paid Project</MenuItem>
                      <MenuItem value={"Low Bono"}>Low Bono</MenuItem>
                      <MenuItem value={"Pro Bono"}>Pro Bono</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    label="Remuneration Details"
                    fullWidth
                    sx={{ m: 1 }}
                    id="renumerationDetails"
                    name="renumerationDetails"
                    onChange={handleChange}
                    valugite={formData.renumerationDetails}
                    multiline
                    rows={4}
                    // defaultValue="Tell us more about your project in detail."
                  />
                  <DesktopDatePicker
                    name="selectedDate"
                    label="Date Picker"
                    value={selectedDate}
                    onChange={(newValue) => {
                      setSelectedDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </Stack>
              <Grid container justifyContent="space-between">
                <Button
                  sx={{ ml: 1, mt: 2 }}
                  variant="outlined"
                  component={Link}
                  to={"/MyListings"}
                >
                  Back
                </Button>
                <Button
                  sx={{ ml: 1, mt: 2 }}
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <Snackbar
                  anchorOrigin={{ vertical, horizontal }}
                  open={open}
                  onClose={handleClose}
                  message="Success"
                  key={vertical + horizontal}
                  autoHideDuration={1000}
                  ContentProps={{
                    sx: {
                      background: "green",
                    },
                  }}
                />
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}

export default SubmitRequest;
