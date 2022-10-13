import { Box, Typography } from "@mui/material";
import React from "react";

function MessageCard({ text, date, direction }) {
  return (
    <Box sx={{ display: "flex", justifyContent: direction }}>
      <Box>
        <Typography
          sx={{ backgroundColor: "#fff", padding: "5px" }}
          variant="body1"
        >
          {text}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "12px",
            display: "flex",
            justifyContent: direction,
            px: "4px",
          }}
        >
          {new Date(date).toLocaleTimeString('en-US')}
        </Typography>
      </Box>
    </Box>
  );
}

export default MessageCard;
