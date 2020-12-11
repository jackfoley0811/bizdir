import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  makeStyles
} from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import Chart from './Chart';

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    height: 400
  }
}));

function PriceHistory({ company, className, ...rest }) {
  const classes = useStyles();
  const INITIAL_STATE = {
    stats: {
      listPrice: [],
      revenue: [],
      cashFlow: [],
    },
    labels: []
  };
  let price_state = INITIAL_STATE;
  company.price_history.forEach(item => {
    price_state.labels.push(moment(item.created_at).format('MMM DD, YYYY'));
    price_state.stats.listPrice.push((parseFloat(item.asking_price || 0) / 1000).toFixed(2));
    price_state.stats.revenue.push((parseFloat(item.gross_revenue || 0) / 1000).toFixed(2));
    price_state.stats.cashFlow.push((parseFloat(item.cash_flow || 0) / 1000).toFixed(2));
  });
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        // action={<GenericMoreButton />}
        title="Price History Chart"
      />
      <Divider />
      <PerfectScrollbar>
        <Box
          minWidth={700}
          pt={4}
          pr={2}
          pl={2}
        >
          <Chart
            className={classes.chart}
            data={price_state.stats}
            labels={price_state.labels}
          />
        </Box>
      </PerfectScrollbar>
    </Card>
  );
}

PriceHistory.propTypes = {
  className: PropTypes.string
};

export default PriceHistory;
