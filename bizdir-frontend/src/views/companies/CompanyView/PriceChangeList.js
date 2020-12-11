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
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import Label from 'src/components/Label';
import { convertNumberFormat } from 'src/utils/number';

const labelColors = {
  increase: 'success',
  initial: 'warning',
  decrease: 'error'
};
const labelText = {
  increase: 'Price Increase',
  initial: 'Initial Price',
  decrease: 'Price Decrease',
};
const useStyles = makeStyles((theme) => ({
  root: {},
  navigateNextIcon: {
    marginLeft: theme.spacing(1)
  }
}));

function PriceChangeList({ price_history, className, ...rest }) {
  const classes = useStyles();
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        // action={<GenericMoreButton />}
        title="Price Changes"
      />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Price
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {price_history.map((price, i) => {
                let status;
                if(i === 0 || price.asking_price === price_history[i].asking_price) {
                  status = 'initial';
                }
                else {
                  status = price.asking_price > price_history[i-1].asking_price ? 'increase': 'decrease';
                }

                const price_text = convertNumberFormat(price.asking_price);
                return (
                  <TableRow
                    hover
                    key={price.id}
                  >
                    <TableCell>
                      {price_text !== 'N/A' && '$'}
                      {price_text}
                      </TableCell>
                    <TableCell>
                      <Label color={labelColors[status]}>
                        {labelText[status]}
                      </Label>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
}

PriceChangeList.propTypes = {
  className: PropTypes.string
};

export default PriceChangeList;
