import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: 128,
    paddingBottom: 128
  },
  title: {
    fontWeight: theme.typography.fontWeightRegular
  }
}));

function Testimonials({ className, ...rest }) {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          align="center"
          color="textPrimary"
          className={classes.title}
        >
          &quot;
            Nowhere else can I instantly find SaaS businesses with positive cashflow listed at a multiple between 1.0x to 2.0x from multiple marketplaces and brokerages
          &quot;
        </Typography>
        <Box
          mt={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar src="/static/home/olivier.png" />
          <Box ml={2}>
            <Typography
              variant="body1"
              color="textPrimary"
            >
              Olivier T
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

Testimonials.propTypes = {
  className: PropTypes.string
};

export default Testimonials;
