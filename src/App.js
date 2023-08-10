import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Roles from "./pages/Roles";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar sx={{ justifyContent: "center", color: "white" }}>
            <Link to="/" className="link">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                TMDB-App
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </Box>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/:id">
          <Roles />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
