import { useQuery } from "@apollo/client";
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
import { GET_MSG } from "../graphql/queries";
import MessageCard from "./MessageCard";

function ChatScreen() {
  const { id, name } = useParams();
  const { data, loading, error } = useQuery(GET_MSG, {
    variables: {
      receiverId: +id,
    },
  });

  console.log("Messages:", data);

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
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          height: "80vh",
          padding: "10px",
          overflowY: "auto",
        }}
      >
        {loading ? (
          <Typography variant="h6">loading chats</Typography>
        ) : (
          data.messageByUser.map(msg=>{
            return <MessageCard key={msg.createdAt} text={msg.text} date={msg.createdAt} direction={msg.receiverId == +id ? "end" : "start" } />
          })
        )}
        {/* <MessageCard text="Hi Mahavirbha" date="12345" direction="start" />
        <MessageCard text="Hi Mahavirbha" date="12345" direction="end" />
        <MessageCard text="Hi Mahavirbha" date="12345" direction="end" /> */}
      </Box>
      <TextField
        placeholder="Enter a message"
        variant="standard"
        fullWidth
        multiline
        rows={2}
      />
    </Box>
  );
}

export default ChatScreen;
