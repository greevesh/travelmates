"use client";
import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SignInGoogleButton from "./SignInGoogleButton";

const AuthCard: React.FC = (): React.JSX.Element => {
  return (
    <Card sx={{ maxWidth: 345, width: "95%" }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "25vh" }}
      >
        <Typography variant="h5" component="div">
          Welcome to TravelM@tes!
        </Typography>
        <Typography color="textSecondary" variant="h6" component="div" mb={4}>
          You must be signed in to use the app
        </Typography>
        <SignInGoogleButton />
      </Grid>
    </Card>
  );
};

export default AuthCard;
