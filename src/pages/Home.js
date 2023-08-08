import React from "react";
import Searchbar from "../components/Searchbar";
import ItemCard from "../components/ItemCard";
import { Container, Grid } from "@mui/material";
import { useDataContext } from "../contexts/DataContext";

function Home() {
  const { queryArray } = useDataContext();
  return (
    <Container>
      <Container sx={{ my: 15 }}>
        <Searchbar />
      </Container>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{
          justifyContent: "center",
          mb: 10,
        }}
      >
        {queryArray.length > 0 &&
          queryArray.map((e) => (
            <Grid item key={e.id}>
              <ItemCard data={e} />{" "}
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}

export default Home;
