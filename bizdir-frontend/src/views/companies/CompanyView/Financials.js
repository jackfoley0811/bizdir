import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { colors } from '@material-ui/core';
import {
  Avatar,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  makeStyles
} from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { convertNumberFormat } from 'src/utils/number';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  avatar: {
    fontSize: 14,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.common.white
  }
}));

function Financials({company, className, ...rest }) {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  
  
  const last_price = company.price_history[company.price_history.length - 1];
  const financials = {
    "Listing Price": {
      value: convertNumberFormat(last_price.asking_price),
      initials: 'LP',
      color: colors.blueGrey['700'],
    },
    "Gross Revenue": {
      value: convertNumberFormat(last_price.gross_revenue),
      initials: 'GP',
      color: colors.cyan['500'],
    },
    "Cash Flow": {
      value: convertNumberFormat(last_price.cash_flow),
      initials: 'CF',
      color: colors.indigo[600],
    },
    "EBITDA": {
      value: convertNumberFormat(company.ebitda),
      initials: 'EB',
      color: colors.red['500'],
    },
    "FF&E": {
      value: convertNumberFormat(company.ff_e),
      initials: 'FF',
      color: colors.orange['900'],
    },
    "Inventory": {
      value: convertNumberFormat(company.inventory),
      initials: 'IV',
      color: colors.blueGrey['900'],
    }
  };
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        // action={<GenericMoreButton />}
        title="Financials"
      />
      <Divider />
      <List disablePadding>
        {Object.keys(financials).map((key, i) => (
          <ListItem
            divider={i < financials.length - 1}
            key={key}
          >
            <ListItemAvatar>
              <Avatar
                className={classes.avatar}
                size="small"
                style={{ backgroundColor: financials[key].color}}
              >
                {financials[key].initials}
              </Avatar>
            </ListItemAvatar>
            {/* <ListItemAvatar>
              <Avatar
                className={classes.avatar}
                size="small"
                style={{ backgroundColor: referral.color }}
              >
                {referral.initials}
              </Avatar>
            </ListItemAvatar> */}
            <ListItemText
              primary={key}
              primaryTypographyProps={{ variant: 'h6' }}
            />
            <Typography
              variant="body2"
              color="textSecondary"
            >
              {financials[key].value !== 'N/A' && '$'}
              {financials[key].value}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

Financials.propTypes = {
  className: PropTypes.string
};

export default Financials;
