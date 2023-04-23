import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { Typography, Container, CardContent, Card } from "@mui/material";
import { Box, Stack } from "@mui/joy";
import CircularProgress from "@mui/material/CircularProgress";
import mars from "../Images/mars.png";
import RoverCard from "../components/RoverCard";

const Home = () => {
  const [fetchedRovers, setFetchedRovers] = useState([]);
  const [error, setError] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    getRovers();
  }, []);

  const getRovers = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=${process.env.REACT_APP_NASA_KEY}`
      );
      setFetchedRovers(response.data.rovers);
    } catch (error) {
      setError(true);
    }
  };

  const ImageWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.down("lg")]: {
      width: "50%",
    },
  }));

  return (
    <>
      <Stack
        direction={{ lg: "row" }}
        spacing={2}
        sx={{ width: "100%", height: "100vh" }}
      >
        <Box sx={{ padding: 2 }}>
          <Typography variant="h1" color="secondary">
            The Red Planet
          </Typography>
          <Typography variant="body2" color="secondary">
            Orbital period: <span style={{ fontWeight: "bold" }}>687 days</span>
          </Typography>
          <Typography variant="body2" color="secondary">
            Distance from Sun:{" "}
            <span style={{ fontWeight: "bold" }}>141.6 million mi</span>
          </Typography>
          <Typography variant="body2" color="secondary">
            Gravity: <span style={{ fontWeight: "bold" }}>3.721 m/s²</span>
          </Typography>
          <Typography variant="body2" color="secondary">
            Length of day: <span style={{ fontWeight: "bold" }}>1d 0h 37m</span>
          </Typography>
          <Typography variant="body2" color="secondary">
            Radius: <span style={{ fontWeight: "bold" }}>2,106.1 mi</span>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            direction: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <ImageWrapper sx={{ width: "100%" }}>
            <Box
              component="img"
              sx={{
                height: "100%",
                width: "100%",
              }}
              alt="Mars"
              src={mars}
            />
          </ImageWrapper>
        </Box>
      </Stack>
      <>
        <Box sx={{ padding: 4 }}>
          <Container>
            <Typography variant="h3" color="secondary">
              Rovers
            </Typography>
            <Stack
              spacing={2}
              flexWrap="wrap"
              direction="row"
              useFlexGap
              justifyContent="center"
              alignItems="start"
              sx={{ width: "100%", marginTop: 3 }}
            >
              {error ? (
                <Typography
                  sx={{ marginTop: 5 }}
                  variant="body"
                  color="secondary"
                >
                  Sorry, there was an issue getting the data.
                </Typography>
              ) : (
                <>
                  {Array.isArray(fetchedRovers) && fetchedRovers.length > 0 ? (
                    <>
                      {fetchedRovers.map((rover) => (
                        <Card
                          key={rover.id}
                          sx={{
                            background: "transparent",
                            border: 2,
                            borderColor: theme.colors.white,
                          }}
                          variant="outlined"
                        >
                          <RoverCard
                            name={rover.name}
                            landingDate={rover.landing_date}
                            launchDate={rover.launch_date}
                            totalPhotos={rover.total_photos}
                            cameras={rover.cameras}
                          />
                        </Card>
                      ))}
                    </>
                  ) : (
                    <Box sx={{ display: "flex", marginTop: 5 }}>
                      <CircularProgress color="secondary" />
                    </Box>
                  )}
                </>
              )}
            </Stack>
          </Container>
        </Box>
      </>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: 5,
        }}
      >
        <Typography variant="body2" color="secondary">
          hope you enjoy 👽
        </Typography>
      </Box>
    </>
  );
};

export default Home;
