import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function UserCard({ item: { id, firstName, lastName } }) {
  const navigate = useNavigate();
  return (
    <Stack
      onClick={() => navigate(`/${id}/${firstName} ${lastName}`)}
      direction="row"
      spacing={2}
      sx={{
        py: 1,
        display: "flex",
        alignItems: "center",
        "&:hover": { backgroundColor: "white", cursor: "pointer" },
      }}
    >
      <Avatar
        sx={{ width: "32px", height: "32px" }}
        src={`https://avatars.dicebear.com/api/initials/${firstName} ${lastName}.svg`}
      ></Avatar>
      <Typography variant="subtitle2">
        {firstName} {lastName}
      </Typography>
    </Stack>
  );
}

export default UserCard;
