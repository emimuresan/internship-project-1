import React, { useState } from "react";
import "./LoginRegisterForm.css";
import LoginRegisterSwitchers from "./LoginRegisterSwitchers";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useLazyQuery, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const {
    user,
    updateUsername,
    updatePassword,
    updateUserRoleId,
  } = useUserContext();

  const USERS = gql`
    query users {
      users {
        username
        password
      }
    }
  `;

  const [getUsers, { data }] = useLazyQuery(USERS, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      const found = data.users.find(
        (user) => user.username === username && user.password === password
      );

      if (found) {
        updatePassword(password);
        updateUsername(username);
        updateUserRoleId(3);

        history.push("/landingPage");
      } else {
        alert("Invalid user or password!");
      }
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    getUsers();
  };

  return (
    <div className="loginRegisterBody">
      <Container component="main" maxWidth="xs" className="main">
        <LoginRegisterSwitchers />
        <Typography component="h1" variant="h4">
          Log In
        </Typography>
        <form className="form" onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="off"
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VisibilityIcon />
                </InputAdornment>
              ),
            }}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            id="submit"
          >
            Log In
          </Button>
        </form>
      </Container>
    </div>
  );
}
