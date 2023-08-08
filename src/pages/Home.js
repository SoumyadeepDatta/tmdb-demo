import React from "react";
import Searchbar from "../components/Searchbar";
import { Container } from "@mui/material";

function Home() {
  return (
    <Container>
      <Container sx={{ mt: 15 }}>
        <Searchbar />
      </Container>
      <Container></Container>
    </Container>
  );
}

export default Home;
