import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    '& dt': {
      marginTop: theme.spacing(2)
    }
  }
}));

function FAQS({ className, ...rest }) {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          color="textPrimary"
        >
          Frequently asked questions
        </Typography>
        <Box my={3}>
          <Divider />
        </Box>
        <Grid
          container
          spacing={3}
          component="dl"
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <Typography
              variant="overline"
              color="secondary"
            >
              How It Works
            </Typography>
            <Box mt={6}>
              <dd>
                <Typography
                  variant="h4"
                  color="textPrimary"
                >
                  What websites do you pull from?
                </Typography>
              </dd>
              <dt>
                <Typography
                  variant="body1"
                  color="textSecondary"
                >
                  We currently pull from: Flippa, EmpireFlippers, FE International, WebsiteClosers, Exchange Marketplace, and IndieMakers. We're continually adding new sources as we find them.
                </Typography>
              </dt>
            </Box>
            <Box mt={6}>
              <dd>
                <Typography
                  variant="h4"
                  color="textPrimary"
                >
                  How does the price tracking work?
                </Typography>
              </dd>
              <dt>
                <Typography
                  variant="body1"
                  color="textSecondary"
                >
                  If a seller on any of our source websites changes the price, without Aquirey you would never know. The marketplaces and brokers do not display price change information, which is often very important for potential negociation. We check each listing daily and maintain a record over time of price changes.
                </Typography>
              </dt>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <Typography
              variant="overline"
              color="secondary"
            >
              Price
            </Typography>
            <Box mt={6}>
              <dd>
                <Typography
                  variant="h4"
                  color="textPrimary"
                >
                  How much does Aquirey cost to use?
                </Typography>
              </dd>
              <dt>
                <Typography
                  variant="body1"
                  color="textSecondary"
                >
                  Aquirey is currently free, you can register an account and get instant access to the business search platform.
                </Typography>
              </dt>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

FAQS.propTypes = {
  className: PropTypes.string
};

export default FAQS;
