import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';
import getInitials from 'src/utils/getInitials';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import GenericMoreButton from 'src/components/GenericMoreButton';
import { SOURCE_LIST } from 'src/constants';

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    padding: theme.spacing(3),
    flexGrow: 1,
    '&:first-of-type': {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  }
}));

function Details({ company, className, ...rest }) {
  const classes = useStyles();
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title="Details"
        // action={<GenericMoreButton />}
      />
      <Divider />
      <Box display="flex">
        <div className={classes.item}>
          <Typography
            align="center"
            variant="h3"
            color="textPrimary"
          >
            {SOURCE_LIST[company.source]}
          </Typography>
          <Typography
            align="center"
            component="h4"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Source
          </Typography>
        </div>
        <Divider />
        <div className={classes.item}>
          <Typography
            align="center"
            variant="h3"
            color="textPrimary"
          >
            {company.category}
          </Typography>
          <Typography
            align="center"
            component="h4"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Category
          </Typography>
        </div>
      </Box>
      <Divider />
      <Box display="flex">
        <div className={classes.item}>
          <Typography
            align="center"
            variant="h3"
            color="textPrimary"
          >
            {(!company.county && !company.state) ? 'N/A' : `${company.county || ''}${company.state ? `, ${company.state}`: ''}`}
          </Typography>
          <Typography
            align="center"
            component="h4"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Location
          </Typography>
        </div>
        <Divider />
        <div className={classes.item}>
          <Typography
            align="center"
            variant="h3"
            color="textPrimary"
          >
            {company.established || 'N/A'}
          </Typography>
          <Typography
            align="center"
            component="h4"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Year Established
          </Typography>
        </div>
      </Box>
      <Divider />
      <Box display="flex">
        <div className={classes.item}>
          <Typography
            align="center"
            variant="h3"
            color="textPrimary"
          >
            {company.employee_count || 'N/A'}
          </Typography>
          <Typography
            align="center"
            component="h4"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Employees
          </Typography>
        </div>
        <Divider />
        <div className={classes.item}>
          <Typography
            align="center"
            variant="h3"
            color="textPrimary"
          >
            {company.seller_financing === true ? 'Yes' : 'No'}
          </Typography>
          <Typography
            align="center"
            component="h4"
            gutterBottom
            variant="overline"
            color="textSecondary"
          >
            Seller Financing
          </Typography>
        </div>
      </Box>
      <Divider />
    </Card>
  );
}

Details.propTypes = {
  className: PropTypes.string
};

export default Details;
