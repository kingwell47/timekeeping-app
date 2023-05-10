import { Link } from "react-router-dom";
import { Typography, Box, Grid } from "@mui/material";

const Footer = () => {
  return (
    <Box mt={8} bgcolor="primary.main" py={4}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          <Link to="/" style={{ color: "white" }}>
            <Typography variant="subtitle1">Home</Typography>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/about" style={{ color: "white" }}>
            <Typography variant="subtitle1">About Us</Typography>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/contact" style={{ color: "white" }}>
            <Typography variant="subtitle1">Contact Us</Typography>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/terms" style={{ color: "white" }}>
            <Typography variant="subtitle1">Terms of Use</Typography>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/privacy" style={{ color: "white" }}>
            <Typography variant="subtitle1">Privacy Policy</Typography>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
