import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import UserCard from "./UserCard";
import LogoutIcon from "@mui/icons-material/Logout";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../graphql/queries";

function Sidebar({ setLoggedIn }) {
  const { loading, data, error } = useQuery(GET_ALL_USERS);

  if(loading) return <Typography variant="h6">Loading chats</Typography>

  if(data){
    console.log("chats data:",data)
  }

  if(error){
    console.log(error.message)
  }


  function handleLogout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  return (
    <Box
      sx={{
        backgroundColor: "#f7f7f7",
        height: "100vh",
        width: "250px",
        padding: "10px",
      }}
    >
      <Stack
        direction="row"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Chat</Typography>
        <LogoutIcon onClick={() => handleLogout()} />
      </Stack>
      <Divider />
      {data.users.map((item, index) => {
        return <UserCard key={item.id} item={item} />;
      })}
    </Box>
  );
}

export default Sidebar;
