import {
  AppBar,
  Avatar,
  Box,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { height } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";

function ChatScreen() {
  const { id, name } = useParams();
  return (
    <Box flexGrow={1}>
      <AppBar position="static" sx={{ backgroundColor: "#fff", boxShadow: 0 }}>
        <Toolbar>
          <Avatar
            sx={{ width: "32px", height: "32px", mr: 2 }}
            src={`https://avatars.dicebear.com/api/initials/${name}.svg`}
          ></Avatar>
          <Typography variant="h6">{name}</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ backgroundColor: "#f5f5f5", height: "80vh" }}>hi</Box>
      <TextField placeholder="Enter a message" variant="standard" fullWidth multiline rows={2} />
    </Box>
  );
}

export default ChatScreen;
