import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import LoginRegisterSwitchers from "./LoginRegisterSwitchers";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

//__typedef query

const useStyles = makeStyles({
  firstName: {
    marginRight: "10px",
  },
});

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const userRoleId = 3;

  const styles = useStyles();

  const USER = gql`
		mutation {
			createUser(
				username: "${username}"
				firstName: "${firstName}"
				lastName: "${lastName}"
				password: "${password}"
				userRoleId: ${userRoleId}
			) {
				password
				username
			}
		}
	`;

  const [addUser, { data }] = useMutation(USER);

  return (
    <div className="loginRegisterBody">
      <Container component="main" maxWidth="xs" className="main">
        <LoginRegisterSwitchers />
        <Typography component="h1" variant="h4">
          Register
        </Typography>
        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
            addUser();
            console.log(data);
            console.log("data");
          }}
        >
          <div className="name">
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="firstname"
              name="firstname"
              label="Firstname"
              autoComplete="off"
              autoFocus
              className={styles.firstName}
              onChange={(event) => setFirstname(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="lastname"
              name="lastname"
              label="Lastname"
              autoComplete="off"
              autoFocus
              onChange={(event) => setLastname(event.target.value)}
            />
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            name="username"
            label="Username"
            autoComplete="off"
            autoFocus
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            autoComplete="off"
            autoFocus
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            id="submit"
            color="primary"
            fullWidth
            variant="contained"
          >
            Register
          </Button>
        </form>
      </Container>
    </div>
  );
}
