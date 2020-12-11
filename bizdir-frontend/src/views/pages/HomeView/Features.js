import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Button,
  Box,
  Container,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    paddingTop: 128,
    paddingBottom: 128
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  }
}));

function Features({ className, ...rest }) {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth="lg">
        <Typography
          component="p"
          variant="overline"
          color="secondary"
          align="center"
        >
          Explore Aquirey
        </Typography>
        <Typography
          variant="h1"
          align="center"
          color="textPrimary"
        >
          Stop Browsing 10 Different Websites
        </Typography>
        <Box mt={8}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              md={4}
            >
              <Box display="flex">
                <Avatar className={classes.avatar}>
                  01
                </Avatar>
                <Box ml={2}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    color="textPrimary"
                  >
                    Daily Updated Listings From All Key Marketplaces
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                  >
                    Aquirey pulls daily updates from each site, providing up to date listing and price data
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
            >
              <Box display="flex">
                <Avatar className={classes.avatar}>
                  02
                </Avatar>
                <Box ml={2}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    color="textPrimary"
                  >
                    Powerful Filters
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                  >
                    Filter by price/profit multiple, monetization method, and much more to easily curate potential sale opportunities from across the web
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
            >
              <Box display="flex">
                <Avatar className={classes.avatar}>
                  03
                </Avatar>
                <Box ml={2}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    color="textPrimary"
                  >
                    Track Pricing Changes
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    gutterBottom
                  >
                    Aquirey monitors every listing for price changes, making it easy to recognize price increases and decreases otherwise unknown.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

Features.propTypes = {
  className: PropTypes.string
};

export default Features;
