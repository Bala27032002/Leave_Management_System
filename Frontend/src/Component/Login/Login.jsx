import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Snackbar,
  IconButton,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackgroundImage from "../../Assests/Images/loginbg-img.png";
import Logo from "../../Assests/Images/Logo.png";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    if (e.target.name === "email") {
      setEmailError(null);
    } else if (e.target.name === "password") {
      setPasswordError(null);
    }
  };

  const formSubmitter = async (event) => {
    event.preventDefault();
    setEmailError(null);
    setPasswordError(null);

    if (input.email === "" && input.password === "") {
      setEmailError("Enter your Email id");
      setPasswordError("Enter your password");
      return;
    } else if (input.email === "") {
      setEmailError("Enter your Email id");
      return;
    } else if (input.password === "") {
      setPasswordError("Enter your password");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email_id: input.email,
        password: input.password,
      
      });
      console.log(response.data.toekn);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("Name", response.data.Name);
        localStorage.setItem("empid", response.data.employeeId);
        localStorage.setItem("role", response.data.role);
const permissions = response.data.permissions;

const filteredPermissions = Object.keys(permissions).filter(key => permissions[key]);

localStorage.setItem("permissions", JSON.stringify(filteredPermissions));
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data) {
          setSnackbarMessage(error.response.data);
      } else {
          setSnackbarMessage("An error occurred. Please try again.");
      }
      setSnackbarOpen(true);
  }
};

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const isSmallScreen = useMediaQuery("(max-width:599px)");


  return (
    <div
      style={{
        position: "relative",
        minHeight: "94vh",
        display: "flex",
        alignItems: "center",
        background: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {!isSmallScreen &&(
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: "white",
                padding: "2rem",
              }}
            >
           
              <Typography
                id="text-40-700-47-Zen"
                variant="h5"
                style={{
                  color: "white",
                  fontSize: "2rem",
                }}
              >
                Building the Future...
              </Typography>
            </Grid>
   )}
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Paper
                style={{
                  padding: "2rem",
                  borderRadius: "24px",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                  width: "70%",
                }}
              >
                <form onSubmit={formSubmitter}>
                  <img
                    src={Logo}
                    style={{
                      maxWidth: "40%",
                      marginBottom: "1rem",
                    }}
                    alt="Logo"
                  />

                  <TextField
                    label="Email id"
                    placeholder="Email id"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      style: {
                        borderRadius: "10px",
                      },
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="email"
                    value={input.email}
                    onChange={handleChange}
                  />
                  {emailError && (
                    <Typography
                      style={{
                        color: "red",
                        fontFamily: "Zen Kaku Gothic Antique",
                        fontSize: "15px",
                        fontWeight: "600",
                      }}
                    >
                      {emailError}
                    </Typography>
                  )}
                  <TextField
                    label="Password"
                    placeholder="Password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    sx={{
                      borderRadius: "120px",
                      "& input::-ms-reveal, & input::-ms-clear": {
                        display: "none",
                      },
                    }}
                    value={input.password}
                    onChange={handleChange}
                    InputProps={{
                      style: {
                        borderRadius: "10px",
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {passwordError && (
                    <Typography
                      style={{
                        color: "red",
                        fontFamily: "Zen Kaku Gothic Antique",
                        fontSize: "15px",
                        fontWeight: "600",
                      }}
                    >
                      {passwordError}
                    </Typography>
                  )}

                  <Button
                    id="text-12-700-22-Zen"
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    style={{
                      height: "56px",
                      marginTop: "2rem",
                      borderRadius: "8px",
                    }}
                  >
                    CONTINUE
                  </Button>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Paper
            elevation={3}
            style={{ background: "red", color: "white", padding: "10px" }}
          >
            {snackbarMessage}
          </Paper>
        </Snackbar>
      </div>
    </div>
  );
};

export default Login;
