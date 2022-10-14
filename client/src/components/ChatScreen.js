import { useMutation, useQuery } from "@apollo/client";
import {
  AppBar,
  Avatar,
  Box,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { height } from "@mui/system";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GET_MSG } from "../graphql/queries";
import MessageCard from "./MessageCard";
import SendIcon from "@mui/icons-material/Send";
import { SEND_MSG } from "../graphql/mutations";

function ChatScreen() {
  const { id, name } = useParams();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const { data, loading, error } = useQuery(GET_MSG, {
    variables: {
      receiverId: +id,
    },
    onCompleted(data) {
      setMessages(data.messageByUser);
    },
  });

  const [sendMessage] = useMutation(SEND_MSG, {
    onCompleted(data) {
      setMessages((prevMessages) => [...prevMessages, data.createMessage]);
    },
  });

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
          messages.map((msg) => {
            return (
              <MessageCard
                key={msg.createdAt}
                text={msg.text}
                date={msg.createdAt}
                direction={msg.receiverId == +id ? "end" : "start"}
              />
            );
          })
        )}
      </Box>
      <Stack direction="row">
        <TextField
          placeholder="Enter a message"
          variant="standard"
          fullWidth
          multiline
          rows={2}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <SendIcon
          onClick={() =>
            sendMessage({
              variables: {
                receiverId: +id,
                text: text,
              },
            })
          }
          fontSize="large"
        />
      </Stack>
    </Box>
  );
}

export default ChatScreen;
