import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Chip } from "@mui/material";
import { Stack } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxwidth: 1000,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ListingModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button color="primary" variant="contained" onClick={handleOpen}>
        See Details
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction="row" gap={5}>
            <Stack gap={2} sx={{ width: "100%" }}>
              <Box component="img" height="120" src={props.post.logoURL} />
              <Stack direction="row" gap={1}>
                <Chip label={props.post.remuneration} />
                <Chip label="Available" />
              </Stack>
              <Stack>
                <Typography variant="h6">Skills Needed</Typography>
                <Typography>{props.post.skills}</Typography>
              </Stack>
              <Stack>
                <Typography variant="h6">Deadline</Typography>
                <Typography>{props.post.dueDate}</Typography>
              </Stack>
              <Stack>
                <Typography variant="h6">Remuneration Details</Typography>
                <Typography>{props.post.renumerationDetails}</Typography>
              </Stack>

              <Typography variant="h6">Address & Map</Typography>
              <Typography>Address goes here</Typography>
              <Box component="img" height="120" src={props.post.mapURL} />
            </Stack>
            <Stack gap={2}>
              <Box bgcolor="#FCEDA5">
                <Typography variant="h6">Contact</Typography>
                <Typography>{props.post.contactName}</Typography>
                <Typography>{props.post.email}</Typography>
              </Box>
              <Stack>
                <Typography variant="h6">About the organisation</Typography>
                <Typography>{props.post.about}</Typography>
              </Stack>
              <Stack>
                <Typography variant="h6">Project Details</Typography>
                <Typography>{props.post.project}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
