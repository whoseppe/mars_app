import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";

import { Typography, CardContent } from "@mui/material";
import { Box } from "@mui/joy";
import { Link } from "wouter";

const RoverCard = ({ name, landingDate, launchDate, totalPhotos, cameras }) => {
  const [extend, setExtend] = useState(false);
  const theme = useTheme();

  return (
    <>
      <CardContent sx={{ width: 250, height: extend ? "100%" : 260 }}>
        <Typography variant="body2" color="secondary">
          Name: <span style={{ fontWeight: "bold" }}>{name}</span>
        </Typography>
        <Typography variant="body2" color="secondary">
          Landing Date:{" "}
          <span style={{ fontWeight: "bold" }}>{landingDate}</span>
        </Typography>
        <Typography variant="body2" color="secondary">
          Launch Date: <span style={{ fontWeight: "bold" }}>{launchDate}</span>
        </Typography>
        <Typography variant="body2" color="secondary">
          Total Photos:{" "}
          <span style={{ fontWeight: "bold" }}>{totalPhotos}</span>
        </Typography>

        <Box
          sx={{
            height: extend ? "100%" : 150,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                direction: "row",
                flexWrap: "wrap",
                height: extend ? "100%" : 60,
                overflow: "hidden",
              }}
            >
              <Typography variant="body2" color="secondary">
                Cameras:{" "}
              </Typography>
              {cameras.map((cam, index) => (
                <Typography
                  key={cam.id}
                  variant="body2"
                  color="secondary"
                  sx={{ marginLeft: 1 }}
                >
                  <span style={{ fontWeight: "bold" }}>
                    {cam.name}
                    {cameras.length - 1 === index ? "" : ","}
                  </span>
                </Typography>
              ))}
            </Box>
            {/* This is a hack. Only doing this for demo purposes. This is handling a the case where the list of cameras exceeds the card height */}
            {name === "Perseverance" && (
              <div
                color="secondary"
                onClick={() => setExtend(!extend)}
                style={{ marginBottom: 10 }}
              >
                <Typography
                  color="secondary"
                  variant="body2"
                  sx={{
                    textDecoration: "underline",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  See All {extend ? "▲" : "▼"}
                </Typography>
              </div>
            )}
          </Box>
          <Link href={`/details/${name}`}>
            <Box
              sx={{
                width: "100%",
                height: 56,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: theme.colors.white,
                borderRadius: 2,
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>View More</Typography>
            </Box>
          </Link>
        </Box>
      </CardContent>
    </>
  );
};

export default RoverCard;
