import React from "react";
import Searchbar from "../components/Searchbar";
import ItemCard from "../components/ItemCard";
import { Button, Container, Divider, Grid, Typography } from "@mui/material";
import { useDataContext } from "../contexts/DataContext";

function Home() {
  const { queryArray, result, calculate } = useDataContext();
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
      {queryArray.length > 1 && (
        <>
          <Container sx={{ textAlign: "center" }}>
            <Divider />
            <Button
              size="small"
              disabled={result.isPending}
              sx={{ m: 5, textTransform: "none" }}
              variant="contained"
              color="success"
              onClick={() => {
                calculate();
              }}
            >
              <Typography fontWeight={400} variant="h6">
                Find matches
              </Typography>
            </Button>
            {result.data && <Divider />}
          </Container>

          {result.isPending && <>Loading...</>}
          {result.error && <>{result.error}</>}
          {result.data && (
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              sx={{
                justifyContent: "center",
                mb: 10,
              }}
            >
              {result.data.length > 0 ? (
                <>{JSON.stringify(result.data)}</>
              ) : (
                <Grid item>No match found!</Grid>
              )}
            </Grid>
          )}
        </>
      )}
    </Container>
  );
}

export default Home;
