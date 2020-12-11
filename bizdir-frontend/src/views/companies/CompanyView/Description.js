import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Label from 'src/components/Label';
import GenericMoreButton from 'src/components/GenericMoreButton';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

const labelColors = {
  complete: 'success',
  pending: 'warning',
  rejected: 'error'
};

const useStyles = makeStyles((theme) => ({
  root: {},
  navigateNextIcon: {
    marginLeft: theme.spacing(1)
  }
}));

function Description({ description, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        // action={<GenericMoreButton />}
        title="Description"
      />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={700} p={3}>
          <Typography
            variant="body1"
            color="textPrimary"
          >
            {description}
          </Typography>
        </Box>
      </PerfectScrollbar>

    </Card>
  );
}

Description.propTypes = {
  className: PropTypes.string
};

export default Description;
