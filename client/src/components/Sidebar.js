import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import UserCard from "./UserCard";

function Sidebar() {
  const users = [
    { id: 1, firstName: "Mahavirsinh", lastName: "Chauhan" },
    { id: 2, firstName: "Parth", lastName: "Bhavsar" },
    { id: 3, firstName: "Divyesh", lastName: "Varu" },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#f7f7f7",
        height: "100vh",
        width: "250px",
        padding: "10px",
      }}
    >
      <Typography variant="h6">Chat</Typography>
      <Divider />
      {users.map((item, index) => {
        return <UserCard key={item.id} item={item} />;
      })}
    </Box>
  );
}

export default Sidebar;
