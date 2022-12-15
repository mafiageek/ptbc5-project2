import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import axios from "axios";
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
  Container,
} from "@mui/material";

function EditListing() {
  const navigate = useNavigate();
  const params = useParams();
  const [formData, setFormData] = useState({
    about: "",
    contact: "",
    isDisplay: false,
    email: "",
    location: "",
    lat: "",
    lng: "",
    mapURL: "",
    logoURL: "",
    organisationName: "",
    project: "",
    remuneration: "",
    skills: "",
    contactName: "",
    renumerationDetails: "",
    timestamp: "",
    dueDate: "",
    uid: "",
  });

  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData({ ...docSnap.data() });
      } else {
        navigate("/");
      }
    }
    fetchListing();
  }, [navigate, params.id]);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "posts", params.id);

    axios
      .get(
        `https://developers.onemap.sg/commonapi/search?searchVal=${formData.location}&returnGeom=Y&getAddrDetails=Y`,
      )
      .then((response) => response.data.results[0])
      .then((geoData) =>
        axios.get(
          `https://developers.onemap.sg/commonapi/staticmap/getStaticImage?layerchosen=default&lat=${geoData.LATITUDE}&lng=${geoData.LONGITUDE}&postal=${formData.location}&zoom=15&width=512&height=256&points=[${geoData.LATITUDE},${geoData.LONGITUDE}]`,
        ),
      )
      .then((response) => {
        updateDoc(docRef, { ...formData, mapURL: response.config.url });
      });

    navigate("/MyListings?success=true");
  };

  console.log("editlisting data", formData);
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
          Edit Listing
        </Typography>

        <Box component="form">
          <Typography>
            Any updates to your information will be visible to the admin within
            a few minutes. If your listing is already online, the public listing
            will be updated directly.
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
                Information for us to contact you (Visible to Site Admin only)
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                gap={2}
                sx={{ mb: 3 }}
              >
                <TextField
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
                Information to display in the volunteer opportunities page
                (Public)
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                sx={{ width: "100%" }}
                gap={2}
              >
                <Stack direction="column" sx={{ width: "100%" }} gap={2}>
                  <TextField
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
                    value={formData.renumerationDetails}
                    multiline
                    rows={4}
                    // defaultValue="Tell us more about your project in detail."
                  />
                  <DesktopDatePicker
                    name="selectedDate"
                    label="Date Picker"
                    value={formData.dueDate}
                    onChange={(newValue) => {
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        dueDate: newValue.toDateString(),
                      }));
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
                  Cancel
                </Button>

                <Button
                  sx={{ ml: 1, mt: 2 }}
                  variant="contained"
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}

export default EditListing;
