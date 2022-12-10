import React from "react";
import { Container, Grid, Typography } from "@mui/material";
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
            <Typography variant="h6">
              Are you a non-profit looking for support?
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              If you would like to post a volunteer listing, please login to the
              site with your gmail account, and submit a request for our admin
              to review. You will also be able to keep track of your listings
              and edit or delete them through your personal listings page when
              you login.
              <br />
              We currently only accept gmail but will be adding more in the
              future
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              Are you a creative who wants to flex your design skills for good?
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              Browse the volunteer opportunities listings and get in touch with
              the non-profits if you're interested in their cause!
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">Note</Typography>
          </Grid>
          <Grid item>
            <Typography>
              This is a class project that is inspired by the site {" "}
              <a href="https://www.makingmeaning.net/">Making Meaning</a> and is
              currently a demo.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
