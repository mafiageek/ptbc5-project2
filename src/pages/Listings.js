import { Box, Grid, Typography } from "@mui/material";

import ListCard from "../components/ListCard";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";

export default function Listings(props) {
  return (
    <div>
      <Box
        sx={{
          height: 60,
        }}
      />

      <Box display="flex" sx={{ p: 4 }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h4" align="center">
              Browse Volunteer Opportunities for Designers and Creatives
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" maxWidth="900px" align="center">
              Looking to volunteer your creative magic for good?
            </Typography>
            <Typography maxWidth="900px" align="center">
              Search for projects that are paid, low bono, or pro bono as well
              as organisation names and skills needed. Get in touch with the
              non-profits through their contact details in the See Details page
              if you're interested in their cause!
            </Typography>
          </Grid>
          <Grid item>
            <Container>
              <Box bgcolor="#FCEDA5" p={2} >
                <Grid maxWidth="900px" container display="flex" justifyContent="center">
                  <Grid item>
                    <Typography variant="h6" maxWidth="900px">
                      For Non-profits looking for volunteers
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography align="center">
                      Check out our <Link to={"/HowItWorks"}>How it Works</Link>{" "}
                      page to find out how to create a volunteer listing!
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Grid>
        </Grid>
      </Box>
      <ListCard user={props.user} />
    </div>
  );
}
