import {
  Card,
  CardActions,
  CardMedia,
  IconButton,
  Tooltip,
} from "@mui/material";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDataContext } from "../contexts/DataContext";

function ItemCard(props) {
  const data = props.data;
  const { deleteFromQueryArray, getTitleAndName } = useDataContext();
  return (
    <Card sx={{ maxWidth: 185 }}>
      <Tooltip title={getTitleAndName(data)}>
        <CardMedia
          component="img"
          height="140"
          image={`http://image.tmdb.org/t/p/w185${data["poster_path"]}`}
          alt={`${getTitleAndName(data)}`}
        />
      </Tooltip>
      <CardActions sx={{ justifyContent: "center" }}>
        <IconButton
          size="small"
          color="error"
          onClick={() => {
            deleteFromQueryArray(data.id);
          }}
        >
          <CancelIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ItemCard;
