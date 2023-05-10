import { Card, CardHeader, CardMedia } from "@mui/material";

import avatarImg from "../assets/avatar.png";

const Profile = ({ name, position }) => {
  return (
    <Card sx={{ maxWidth: 400, margin: "auto" }}>
      <CardHeader title={name} subheader={position} />
      <CardMedia
        component="img"
        height="300"
        image={avatarImg}
        alt="Placeholder"
        sx={{ objectFit: "contain" }}
      />
    </Card>
  );
};

export default Profile;
