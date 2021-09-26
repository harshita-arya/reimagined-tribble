import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  alpha,
  Paper,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from "@material-ui/icons/Lock";
import FaceIcon from "@material-ui/icons/Face";
import EmailIcon from "@material-ui/icons/Email";
import { authCantSeeAuthScreen } from "../utils/helpers";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "30ch",
    },
  },
}));

const defaultProps = {
  bgcolor: "background.paper",
  m: 1,
  style: { width: "31.3rem", height: "4rem" },
  borderColor: alpha("#AAAAAA", 2.7),
};

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    authCantSeeAuthScreen(props);
  }, [props]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    axios({
      method: "POST",
      url: "https://api.gymslate.ml/auth/login/",
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        setLoading(false);

        const user = JSON.stringify(res.data);
        window.localStorage.setItem("user", user);

        props.history.push("/");
      })
      .catch(() => {
        setLoading(false);
        setError("Invalid Credentials");
      });
  };

  return (
    <Container
      maxWidth="xl"
      style={{
        maxheight: "100vh",
        height: "100%",
        backgroundColor: alpha("#1e699d", 0.6),
      }}
    >
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={4}></Grid>
          <Grid style={{ height: "100vh" }} item xs={4}>
            <Paper
              elevation={0}
              style={{ height: "50%", marginTop: "190px" }}
              align="center"
            >
              <form
                onSubmit={handleSubmit}
                className={classes.root}
                noValidate
                autoComplete="off"
              >
                <Box borderTop={6} {...defaultProps} />
                <FaceIcon style={{ color: "#666666" }} fontSize="large" />
                <Grid style={{ height: "50px" }} item xs={12}>
                  <Typography
                    variant="h4"
                    style={{ color: alpha("#1e699d", 0.6) }}
                  >
                    Sign In
                  </Typography>
                </Grid>
                <Grid style={{ height: "100px" }} item xs={12}>
                  <Grid container spacing={5}>
                    <Grid
                      style={{
                        height: "100px",
                        paddingBottom: "35px",
                      }}
                      item
                      xs={12}
                    >
                      {/* <form
                      onSubmit={handleSubmit}
                      className={classes.root}
                      noValidate
                      autoComplete="off"
                    > */}
                      <div>
                        <TextField
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setError(null);
                            setEmail(e.target.value);
                          }}
                          style={{ width: "75%", paddingBottom: "200px" }}
                          className={classes.form}
                          placeholder="Email"
                          variant="filled"
                          size="medium"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon
                                  style={{ color: "#666666" }}
                                  fontSize="medium"
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                      {/* </form> */}
                    </Grid>
                    <Grid style={{ height: "100px" }} item xs={12}>
                      {/* <form
                      className={classes.root}
                      noValidate
                      autoComplete="off"
                    > */}
                      <div>
                        <TextField
                          type="password"
                          value={password}
                          onChange={(e) => {
                            setError(null);
                            setPassword(e.target.value);
                          }}
                          style={{ width: "75%" }}
                          className={classes.form}
                          placeholder="Password"
                          variant="filled"
                          size="medium"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon
                                  style={{ color: "#666666" }}
                                  fontSize="small"
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                      {/* </form> */}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        height: "70px",
                      }}
                    >
                      <Button
                        disabled={loading}
                        type="submit"
                        variant="contained"
                        style={{
                          backgroundColor: alpha("#1e699d", 0.6),
                          color: "#FFFFFF",
                          marginBottom: "30px",
                          height: "25px",
                          width: "180px",
                        }}
                      >
                        {loading ? "Submitting.." : "Submit"}
                      </Button>
                    </Grid>

                    {error ? (
                      <p
                        style={{
                          color: "red",
                        }}
                      >
                        {error}
                      </p>
                    ) : null}
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
