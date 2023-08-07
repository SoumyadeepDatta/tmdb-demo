import {
  Autocomplete,
  Box,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

function Search() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState(null);
  const [data, setData] = useState([]);
  const fetchData = async (string) => {
    const url = `https://api.themoviedb.org/3/search/multi?query=${string}&include_adult=false&language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTY5ZDhkMmZhMDZhYzU5OGVhYjMwNTgzY2Y3ZTBlZSIsInN1YiI6IjY0Y2NhMjZmNzk4ZTA2MDEwMDBlNjhjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c6rtmLqA72C8UkKJlsVjPzKBaITdGAB774PtiN9ouks",
      },
    };

    setLoading(true);
    await fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setData(json["results"].filter((e) => e["media_type"] !== "person"));
        setLoading(false);
      })
      .catch((err) => {
        console.error("error:" + err);
        setLoading(false);
      });
  };
  return (
    <Container sx={{ mt: 5 }}>
      <Grid container>
        <Grid item xs={12} md={6} lg={8} sx={{ margin: "auto" }}>
          <Autocomplete
            freeSolo
            autoFocus
            options={data}
            getOptionLabel={(option) => {
              if (option["media_type"] === "tv") return option["name"];
              if (option["media_type"] === "movie") return option["title"];
            }}
            fullWidth
            loading={loading}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onInputChange={(event, newInputValue) => {
              fetchData(newInputValue);
            }}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img
                  loading="lazy"
                  width="20"
                  src={`http://image.tmdb.org/t/p/w185${option["poster_path"]}`}
                  alt=""
                />
                {option["media_type"] === "tv" && (
                  <>
                    {option["name"]} ({option["first_air_date"].slice(0, 4)})
                  </>
                )}
                {option["media_type"] === "movie" && (
                  <>
                    {option["title"]} ({option["release_date"].slice(0, 4)})
                  </>
                )}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Movies, TV Series etc."
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </Grid>
      </Grid>
      {JSON.stringify(value)}
    </Container>
  );
}

export default Search;
