import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Chip, Grid } from "@mui/material";
import { Stack } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxwidth: 1500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ListingModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const buttonProps = props.buttonProps || {};

  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        onClick={handleOpen}
        {...buttonProps}
      >
        See Details
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={4}
          >
            <Grid item xs={6}>
              <Stack gap={1}>
                <Box component="img" height="40" src={props.post.logoURL} />

                <Chip label={props.post.remuneration} />

                <Typography variant="h6">Skills Needed</Typography>

                <Typography>{props.post.skills}</Typography>

                <Typography variant="h6">Deadline</Typography>

                <Typography>{props.post.dueDate}</Typography>

                <Typography variant="h6">Remuneration Details</Typography>
                <Typography>{props.post.renumerationDetails}</Typography>

                <Typography variant="h6">Address & Map</Typography>
                <Typography>{props.post.address}</Typography>
                <Box component="img" height="60" src={props.post.mapURL} />
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack gap={1}>
                <Box bgcolor="#FCEDA5" sx={{ p: 2 }}>
                  <Typography variant="h6">Interested?</Typography>
                  <Typography>
                    Contact {props.post.contactName} at {props.post.email}
                  </Typography>
                </Box>

                <Typography variant="h6">About the organisation</Typography>
                <Typography>{props.post.about}</Typography>

                <Typography variant="h6">Project Details</Typography>
                <Typography>{props.post.project}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
