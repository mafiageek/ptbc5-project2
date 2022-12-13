import { Box, Button, Grid, Typography } from "@mui/material";

import ListCard from "../components/ListCard";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";

export default function Listings(props) {
  return (
    <div>
      <Box
        sx={{
          height: 100,
        }}
      />
      <Container>
        <Box bgcolor="#FCEDA5" p={4}>
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="space-between"
            display="flex"
            alignItems="center"
          >
            <Typography>
              Are you a non-profit organisation, community or ground-up
              initiative who has a project that needs a little bit of creative
              magic? Check out our <Link>How it Works</Link> page on how to
              create a listing to call out to creative volunteers who have the
              skills to help you with design, branding, social media, or run a
              problem-solving workshop with you!
            </Typography>
          </Grid>
        </Box>
      </Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ p: 4 }}
      >
        <Typography variant="h4">
          Browse Volunteer Opportunities for Designers and Creatives
        </Typography>
      </Box>
      <ListCard user={props.user} />
    </div>
  );
}
