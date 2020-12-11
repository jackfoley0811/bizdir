import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  colors,
  makeStyles,
} from '@material-ui/core';
import Label from 'src/components/Label';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import GenericMoreButton from 'src/components/GenericMoreButton';
import CircularProgress from './CircularProgress';
import { convertNumberFormat } from 'src/utils/number';

const useStyles = makeStyles((theme) => ({
  root: {},
  image: {
    flexShrink: 0,
    height: 56,
    width: 56
  },
  subscriptions: {
    fontWeight: theme.typography.fontWeightMedium
  },
  value: {
    color: colors.green[600],
    fontWeight: theme.typography.fontWeightMedium
  },
  navigateNextIcon: {
    marginLeft: theme.spacing(1)
  }
}));
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
function PriceHistoryList({ price_history, className, ...rest }) {
  const classes = useStyles();
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        // action={<GenericMoreButton />}
        title="Price History List"
      />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
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
                      <Box
                        display="flex"
                        alignItems="center"
                      >
                        <Box ml={2}>
                          <Typography
                            variant="h6"
                            color="textPrimary"
                          >
                            {moment(price.created_at).format('MMM DD, YYYY')}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                          >
                            <Label color={labelColors[status]}>
                              {labelText[status]}
                            </Label>
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="h6"
                        color="textPrimary"
                      >
                        Price
                      </Typography>
                      <Label color={labelColors[status]}>
                        {price_text !== 'N/A' && '$'}
                        {price_text}
                      </Label>
                      {/* <Typography
                        noWrap
                        variant="body2"
                        color={labelColors[status]}
                      >
                        {price_text !== 'N/A' && '$'}
                        {price_text}
                      </Typography> */}
                    </TableCell>
                    <TableCell>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-end"
                      >
                        <Box mr={2}>
                          <Typography
                            align="right"
                            variant="h6"
                            color="textPrimary"
                          >
                            {price.multiple ? `${price.multiple}x` : 'N/A'}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textPrimary"
                          >
                            Multiple
                          </Typography>
                        </Box>
                      </Box>
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

PriceHistoryList.propTypes = {
  className: PropTypes.string
};

export default PriceHistoryList;
