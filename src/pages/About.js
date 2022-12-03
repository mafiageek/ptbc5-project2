import React, { useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase";
import {
  TableContainer,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Button,
  ButtonGroup,
  TableBody,
} from "@mui/material";
import { Box } from "@mui/system";


export default function About() {
  
  return (
    <div>
      <Box
        sx={{
          height: 60,
        }}
      />
      <Typography variant="h4">About page</Typography>
      <Typography>
        At vero eos et accusamus et iusto odio dignissimos ducimus qui
        blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
        et quas molestias excepturi sint occaecati cupiditate non provident,
        similique sunt in culpa qui officia deserunt mollitia animi, id est
        laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
        distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
        cumque nihil impedit quo minus id quod maxime placeat facere possimus,
        omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem
        quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet
        ut et voluptates repudiandae sint et molestiae non recusandae. Itaque
        earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
        voluptatibus maiores alias consequatur aut perferendis doloribus
        asperiores repellat."
      </Typography>{" "}
      </div>

  );
}
