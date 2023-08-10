import {
  Avatar,
  CardMedia,
  Container,
  Divider,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useDataContext } from "../contexts/DataContext";

function Roles() {
  const { id } = useParams();
  const { getPersonRoles } = useDataContext();
  const { person, roles } = getPersonRoles(id);
  const gender = ["Not specified", "Female", "Male", "Non-binary"];
  return (
    <Container>
      {person && roles && (
        <>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent={"center"}
            sx={{ mt: 5 }}
          >
            <Grid item>
              <Avatar
                src={`http://image.tmdb.org/t/p/w185${person[0]["profile_path"]}`}
              ></Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h5">{person[0]["name"]}</Typography>
              <Typography variant="body1">
                {person[0]["place_of_birth"]}
              </Typography>
              <Typography variant="body2">
                {gender[person[0]["gender"]]},{" "}
                {person[0]["known_for_department"]}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 5 }} />
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent={"center"}
          >
            <Grid item>
              {roles &&
                roles.map((e, i) => (
                  <ListItem key={i}>
                    <ListItemAvatar>
                      <CardMedia
                        component="img"
                        alt={e["name"]}
                        image={`http://image.tmdb.org/t/p/w185${e["image"]}`}
                        sx={{
                          height: "150px",
                          width: "auto",
                          m: 5,
                        }}
                      />
                    </ListItemAvatar>
                    {e["type"] === "movie" && (
                      <ListItemText
                        primary={e["name"]}
                        secondary={e["character"]}
                      />
                    )}
                    {e["type"] === "tv" && (
                      <ListItemText
                        primary={e["name"]}
                        secondary={e["roles"].map((r) => (
                          <>
                            {r["character"]}, {r["episode_count"]} episode
                            {r["episode_count"] > 0 ? "s" : ""}
                          </>
                        ))}
                      />
                    )}
                  </ListItem>
                ))}
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}

export default Roles;
