import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";

function PersonCard(props) {
  const data = props.data;
  const history = useHistory();
  return (
    <Card sx={{ width: 345, height: 100 }}>
      <CardActionArea
        onClick={() => {
          history.push(`/${data.id}`);
        }}
      >
        <CardContent>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                src={`http://image.tmdb.org/t/p/w185${data["profile_path"]}`}
              ></Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={data["name"]}
              secondary={
                <Typography noWrap>{data["place_of_birth"]}</Typography>
              }
            />
          </ListItem>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PersonCard;
