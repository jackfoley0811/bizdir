import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import Label from 'src/components/Label';
import { convertNumberFormat } from 'src/utils/number';

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    padding: theme.spacing(3),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      '&:not(:last-of-type)': {
        borderRight: `1px solid ${theme.palette.divider}`
      }
    },
    [theme.breakpoints.down('sm')]: {
      '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.palette.divider}`
      }
    }
  },
  valueContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    marginLeft: theme.spacing(1)
  }
}));

function Overview({ company, className, ...rest }) {
  const classes = useStyles();
  const last_price = company.price_history[company.price_history.length - 1];
  const before_price = company.price_history.length > 1 && company.price_history[company.price_history.length - 2];
  let variance = {};
  if (last_price && before_price) {
    variance = {
      asking_price: last_price.asking_price && before_price.asking_price > 0 && parseInt(((parseFloat(last_price.asking_price) / before_price.asking_price) * 100 - 100)),
      gross_revenue: last_price.gross_revenue && before_price.gross_revenue > 0 && parseInt(((parseFloat(last_price.gross_revenue) / before_price.gross_revenue) * 100 - 100)),
      cash_flow: last_price.cash_flow && before_price.cash_flow > 0 && parseInt(((parseFloat(last_price.cash_flow) / before_price.cash_flow) * 100 - 100)),
    }
  }
  console.log('companydetail', last_price)
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid
        alignItems="center"
        container
        justify="space-between"
      >
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            List Price
          </Typography>
          <div className={classes.valueContainer}>
            <Typography
              variant="h3"
              color="textPrimary"
            >
              {convertNumberFormat(last_price.asking_price) !== 'N/A' && '$'}
              {convertNumberFormat(last_price.asking_price)}
            </Typography>
            {(variance.asking_price && variance.asking_price !== 0) ?
              <Label
                className={classes.label}
                color={variance.asking_price > 0 ? "success" : "error"}
              >
                {variance.asking_price > 0 && '+'}{variance.asking_price}%
              </Label>
              :
              <></>
            }
          </div>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Revenue
          </Typography>
          <div className={classes.valueContainer}>
            <Typography
              variant="h3"
              color="textPrimary"
            >
              {convertNumberFormat(last_price.gross_revenue) !== 'N/A' && '$'}
              {convertNumberFormat(last_price.gross_revenue)}
            </Typography>
            {(variance.gross_revenue && variance.gross_revenue !== 0) ?
              <Label
                className={classes.label}
                color={variance.gross_revenue > 0 ? "success" : "error"}
              >
                {variance.gross_revenue > 0 && '+'}{variance.gross_revenue}%
              </Label>
              :
              <></>
            }
          </div>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Cash flow
          </Typography>
          <div className={classes.valueContainer}>
            <Typography
              variant="h3"
              color="textPrimary"
            >
              {convertNumberFormat(last_price.cash_flow) !== 'N/A' && '$'}
              {convertNumberFormat(last_price.cash_flow)}
            </Typography>
            {(variance.cash_flow && variance.cash_flow !== 0) ?
              <Label
                className={classes.label}
                color={variance.cash_flow > 0 ? "success" : "error"}
              >
                {variance.cash_flow > 0 && '+'}{variance.cash_flow}%
              </Label>
              :
              <></>
            }
          </div>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Multiple
          </Typography>
          <div className={classes.valueContainer}>
            <Typography
              variant="h3"
              color="textPrimary"
            >
              {convertNumberFormat(last_price.multiple)} x
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
}

Overview.propTypes = {
  className: PropTypes.string
};

export default Overview;
