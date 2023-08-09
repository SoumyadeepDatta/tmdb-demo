import React from "react";
import Searchbar from "../components/Searchbar";
import ItemCard from "../components/ItemCard";
import { Button, Container, Divider, Grid, Typography } from "@mui/material";
import { useDataContext } from "../contexts/DataContext";

function Home() {
  const { queryArray, result, addCast } = useDataContext();
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
      {queryArray.length > 0 && (
        <Container sx={{ textAlign: "center" }}>
          <Divider />
          <Button
            size="small"
            sx={{ m: 5, textTransform: "none" }}
            variant="contained"
            onClick={() => {
              addCast();
            }}
          >
            <Typography fontWeight={400} variant="h6">
              Who's there?
            </Typography>
          </Button>
          {result.data && <Divider />}
        </Container>
      )}
      {JSON.stringify(queryArray)}
    </Container>
  );
}

export default Home;
