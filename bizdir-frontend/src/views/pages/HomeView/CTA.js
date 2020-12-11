import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    paddingTop: 128,
    paddingBottom: 128
  },
  browseButton: {
    marginLeft: theme.spacing(2)
  }
}));

function CTA({ className, ...rest }) {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          align="center"
          color="textPrimary"
        >
          Ready to give it a try?
        </Typography>
        <Typography
          variant="h1"
          align="center"
          color="secondary"
        >
          Aquirey Is 100% Free To Use
        </Typography>
        <Box
          mt={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            color="secondary"
            component="a"
            href="/register"
            variant="contained"
          >
            View Businesses For Sale
          </Button>
        </Box>
      </Container>
    </div>
  );
}

CTA.propTypes = {
  className: PropTypes.string
};

export default CTA;
