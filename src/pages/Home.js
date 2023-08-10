import React from "react";
import Searchbar from "../components/Searchbar";
import ItemCard from "../components/ItemCard";
import {
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useDataContext } from "../contexts/DataContext";
import PersonCard from "../components/PersonCard";
import { LoadingButton } from "@mui/lab";

function Home() {
  const { queryArray, result, calculate } = useDataContext();
  return (
    <Container>
      <Container sx={{ mt: 15, mb: 5 }}>
        <Searchbar />
      </Container>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        sx={{
          justifyContent: "center",
          mb: 5,
        }}
      >
        {queryArray.length > 0 &&
          queryArray.map((e) => (
            <Grid item key={e.id}>
              <ItemCard data={e} />{" "}
            </Grid>
          ))}
      </Grid>

      <Container sx={{ textAlign: "center" }}>
        <Divider />
        <LoadingButton
          size="small"
          loading={result.isPending}
          sx={{ m: 5, textTransform: "none" }}
          variant="contained"
          loadingPosition="center"
          color="success"
          onClick={() => {
            calculate();
          }}
        >
          <Typography fontWeight={400} variant="h6">
            Find matches
          </Typography>
        </LoadingButton>
        {result.data && <Divider sx={{ mb: 3 }} />}
      </Container>

      {result.isPending && (
        <Container sx={{ textAlign: "center", my: 5 }}>
          <CircularProgress size={50} />
        </Container>
      )}
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
            <>
              <Container sx={{ textAlign: "center", mt: 5, mb: 3 }}>
                <Typography fontWeight={400} variant="h6">
                  {result.data.length} match{result.data.length > 1 ? "es" : ""}{" "}
                  found
                </Typography>
              </Container>
              {result.data.map((e) => (
                <Grid item key={e.id}>
                  <PersonCard data={e} />
                </Grid>
              ))}
            </>
          ) : queryArray.length > 1 ? (
            <Grid item>
              <Typography fontWeight={400} variant="h6">
                No match found!
              </Typography>
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      )}
    </Container>
  );
}

export default Home;
