import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Route } from "wouter";
import { useTheme } from "@mui/material/styles";
import { Typography, Container } from "@mui/material";
import { Box } from "@mui/joy";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { ISODateFormat } from "../utils";

const RoverDetails = ({ name }) => {
  const theme = useTheme();
  const [fetchedRoverImages, setFetchedRoverImages] = useState([]);

  useEffect(() => {
    // Grab rover images with todays date
    getRoverImagesByDate(ISODateFormat(new Date()));
  }, []);

  const getRoverImagesByDate = async (date) => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${name}/photos?earth_date=${date}&api_key=${process.env.REACT_APP_NASA_KEY}`
      );
      setFetchedRoverImages(response.data.photos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: 3 }}>
        <Link href="/">
          <Typography
            variant="body"
            mt={1}
            color="secondary"
            sx={{
              textDecoration: "underline",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Go Back
          </Typography>
        </Link>
      </Box>
      <Typography variant="h4" mt={3} color="secondary">
        {name}
      </Typography>

      <Box sx={{ marginBottom: 5 }}>
        <DatePicker
          disableFuture
          sx={{
            background: theme.colors.white,
            borderRadius: 1,
            border: 0,
            marginTop: 1,
          }}
          defaultValue={dayjs(new Date())}
          onAccept={(value) => getRoverImagesByDate(ISODateFormat(value.$d))}
        />
      </Box>

      {fetchedRoverImages.length > 0 ? (
        <ImageList sx={{ height: "80vh" }} cols={3} rowHeight={200}>
          <>
            {fetchedRoverImages.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img_src}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img_src}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt="Rover Image"
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </>
          {fetchedRoverImages.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img_src}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.img_src}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt="Rover Image"
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <Typography sx={{ marginTop: 15 }} variant="body" color="secondary">
          Sorry, there are no photos for this date. Please select a different
          day.
        </Typography>
      )}
    </Container>
  );
};

export default RoverDetails;
