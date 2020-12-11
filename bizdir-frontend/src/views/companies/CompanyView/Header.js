import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Menu,
  MenuItem,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Calendar as CalendarIcon } from 'react-feather';

const timeRanges = [
  {
    value: 'today',
    text: 'Today'
  },
  {
    value: 'yesterday',
    text: 'Yesterday'
  },
  {
    value: 'last_30_days',
    text: 'Last 30 days'
  },
  {
    value: 'last_year',
    text: 'Last year'
  }
];

const useStyles = makeStyles((theme) => ({
  root: {},
  actionIcon: {
    marginRight: theme.spacing(1)
  }
}));

function Header({ company, className, ...rest }) {
  const classes = useStyles();
  const actionRef = useRef(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [timeRange, setTimeRange] = useState(timeRanges[2].text);

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justify="space-between"
      spacing={3}
      {...rest}
    >
      <Grid item xs={12}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            variant="body1"
            color="inherit"
            to="/app/management/companies"
            component={RouterLink}
          >
            Search Results
          </Link>
          <Typography
            variant="body1"
            color="textPrimary"
          >
            {company.title}
          </Typography>
        </Breadcrumbs>
        <Typography
          variant="h2"
          color="textPrimary"
        >
          {company.title}
        </Typography>
        <Grid container>
          <Grid item xs={12} lg={9}>
          </Grid>
          <Grid item xs={12} lg={3} style={{ textAlign: "right" }}>
            <a href={company.url} target="_blank" style={{textDecoration: 'none'}}>
              <Button color="secondary" >View Listings</Button>
            </a>
          </Grid>
          
        </Grid>
      </Grid>
    </Grid>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

Header.defaultProps = {};

export default Header;
