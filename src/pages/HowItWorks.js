import React from "react";
import { Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function HowItWorks() {
  return (
    <div>
      <Box
        sx={{
          height: 100,
        }}
      />
      <Container>
        <Grid
          container
          direction="column"
          rowSpacing={{ md: 2 }}
          columnSpacing={{ md: 2 }}
        >
          <Grid item>
            <Typography variant="h4">How it Works</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              Making Meaning is a ground-up community initiative that supports
              creatives who want to do meaningful work.
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              We believe that understanding the real value of design and using
              it to make change is a positive step towards understanding your
              role as a designer and finding meaning in your work.​ By sharing
              skills-based volunteering opportunities, we hope to empower people
              to consciously think about the value of design for good.
            </Typography>
          </Grid>
          <Grid item>
            <Grid container direction="row" alignItems="stretch" spacing={4}>
              <Grid item xs={6}>
                <Paper elevation={3} sx={{ height: "100%" }}>
                  <Container sx={{ p: 4 }}>
                    <Box
                      component="img"
                      sx={{
                        height: 100,
                        width: 100,
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 },
                      }}
                      src="../images/non-profit-img.png"
                    />
                    <Typography variant="h6">
                      Are you a non-profit looking for support?
                    </Typography>

                    <Typography>
                      If you would like to post a volunteer listing, please
                      follow the steps below.
                      <br />
                      <br />
                      1. Login to the site with your gmail account
                      <br /> 2. Submit a request for our admin to review.
                      <br />
                      <br />
                      You will also be able to keep track of your listings and
                      edit or delete them through your personal listings page
                      when you login. We currently only accept gmail but will be
                      adding more in the future.
                    </Typography>
                  </Container>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper elevation={3} sx={{ height: "100%" }}>
                  <Container sx={{ p: 4 }}>
                    <Box
                      component="img"
                      sx={{
                        height: 100,
                        width: 100,
                        maxHeight: { xs: 233, md: 167 },
                        maxWidth: { xs: 350, md: 250 },
                      }}
                      src="src/images/volunteer-img.png"
                    />
                    <Typography variant="h6">
                      Are you a creative who wants to flex your design skills
                      for good?
                    </Typography>

                    <Typography>
                      Browse the volunteer opportunities listings and get in
                      touch with the non-profits if you're interested in their
                      cause!
                      <br />
                      <br />
                      Have a specific non-profit or type of project you want to
                      volunteer for? You can search for projects that are paid
                      and low bono, as well as organisation names and skills
                      needed in the search bar on the listing site.
                    </Typography>
                  </Container>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h6">Note</Typography>
          </Grid>
          <Grid item>
            <Typography>
              This is a class project that is inspired by the site{" "}
              <a href="https://www.makingmeaning.net/">Making Meaning</a> and is
              currently a demo.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
