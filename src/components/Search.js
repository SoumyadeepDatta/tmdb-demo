import {
  Autocomplete,
  Box,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import UseFetch from "../hooks/useFetch";

function Search() {
  const [value, setValue] = React.useState(null);

  const [fetchData, data, isPending, error] = UseFetch();

  const handleChange = async (string) => {
    const url = `https://api.themoviedb.org/3/search/multi?query=${string}&include_adult=false&language=en-US&page=1`;

    await fetchData(url);
  };
  return (
    <Container sx={{ mt: 5 }}>
      <Grid container>
        <Grid item xs={12} md={6} lg={8} sx={{ margin: "auto" }}>
          <Autocomplete
            freeSolo
            autoFocus
            options={data ? data["results"] : []}
            getOptionLabel={(option) => {
              if (option["media_type"] === "tv") return option["name"];
              if (option["media_type"] === "movie") return option["title"];
            }}
            fullWidth
            loading={isPending}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onInputChange={(event, newInputValue) => {
              handleChange(newInputValue);
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
                variant="filled"
                {...params}
                label="Search Movies, TV Series etc."
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {isPending ? (
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
