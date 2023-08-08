import {
  Autocomplete,
  Box,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDataContext } from "../contexts/DataContext";

function Searchbar() {
  const [value, setValue] = useState(null);
  const { searchData, setSearchData, addToQueryArray, getTitleAndName } =
    useDataContext();
  return (
    <Container sx={{ mt: 5 }}>
      <Grid container>
        <Grid item xs={12} md={6} lg={8} sx={{ margin: "auto" }}>
          <Autocomplete
            freeSolo
            autoFocus
            options={searchData.data ? searchData.data["results"] : []}
            getOptionLabel={(obj) => getTitleAndName(obj)}
            fullWidth
            loading={searchData.isPending}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              addToQueryArray(newValue);
            }}
            onInputChange={(event, newInputValue) => {
              setSearchData(newInputValue);
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
                      {searchData.isPending ? (
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
      {/* {JSON.stringify(queryArray)} */}
    </Container>
  );
}

export default Searchbar;
