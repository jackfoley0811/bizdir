/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  makeStyles,
  CircularProgress,
  Chip,
  CardHeader
} from '@material-ui/core';
import EnhancedTableHead from 'src/components/EnhancedTableHead';
import GenericMoreButton from 'src/components/GenericMoreButton';
import { convertNumberFormat } from 'src/utils/number';
import { formatPhoneNumber } from 'src/utils/phone';
import { getComparator, stableSort } from 'src/utils/table';
import { SOURCE_LIST } from 'src/constants';
import Label from 'src/components/Label';

import {
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
  Search as SearchIcon
} from 'react-feather';
import {
  searchCompany,
  sendCompanies
} from 'src/actions/companiesActions';
import { getCompanyListExportFileName } from 'src/utils/excel';
const labelColors = {
  increase: 'success',
  initial: 'warning',
  decrease: 'error'
};

function applyFilters(companies, query, filters) {
  return companies.filter((company) => {
    let matches = true;

    if (query) {
      const properties = ['title', 'category', 'source', 'asking_price', 'gross_revenue', 'cash_flow', 'multiple'];
      let containsQuery = false;

      properties.forEach((property) => {
        if (company[property] && company[property].toString().toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value && company[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });
}

function applyPagination(companies, page, limit) {
  return companies.slice(page * limit, page * limit + limit);
}

const useStyles = makeStyles((theme) => ({
  root: {},
  queryField: {
    width: 500
  },
  bulkOperations: {
    position: 'relative'
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default
  },
  bulkAction: {
    marginLeft: theme.spacing(2)
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  },
  chips: {
    display: 'flex',
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  advancedSearch: {
    marginLeft: '1rem'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  condensed: {
    padding: '5px'
  }
}));

function Results({
  className, onSaveCondition, companies, totalCount, sourceList, condition, ...rest
}) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('title');
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const { user } = useSelector((state) => state.account);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const filters = {
    isProspect: null,
    isReturning: null,
    acceptsMarketing: null
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    const oldCondition = { ...condition };
    oldCondition['orderBy'] = property;
    oldCondition['order'] = isAsc ? 'desc' : 'asc';
    // onSaveCondition(oldCondition);
    setOrder(oldCondition['order']);
    setOrderBy(property);
  };
  const onSendCompanies = async () => {
    enqueueSnackbar('Sending Excel File...', {
      variant: 'info'
    });
    await dispatch(sendCompanies(companies, user.email, getCompanyListExportFileName()));
    enqueueSnackbar('Email with Excel File has been sent succesfully. \n Please check inbox of your email.', {
      variant: 'success'
    });
  };
  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSelectAllCompanies = (event) => {
    setSelectedCompanies(event.target.checked
      ? companies.map((company) => company.id)
      : []);
  };

  const handlePageChange = async (event, newPage) => {
    console.log('pagecount', newPage);
    if (!query && (newPage + 1) * limit > companies.length) {
      setPage(newPage);
      setLoading(true);
      await dispatch(searchCompany(condition, companies.length, limit));
      setLoading(false);
    } else {
      setLoading(false);
      setPage(newPage);
    }
  };
  const removeCondition = async (key) => {
    const newCondition = { ...condition };
    delete newCondition[key];
    setPageLoading(true);
    await dispatch(searchCompany(newCondition, 0));
    setPageLoading(false);
  };
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  // Usually query is done on backend with indexing solutions
  const filteredCompanies = applyFilters(companies, query, filters);
  const sortedCompanies = stableSort(filteredCompanies, getComparator(order, orderBy));
  // const sortedCompanies = filteredCompanies;

  const paginatedCompanies = applyPagination(sortedCompanies, page, limit);
  const enableBulkOperations = selectedCompanies.length > 0;
  const selectedSomeCompanies = selectedCompanies.length > 0 && selectedCompanies.length < companies.length;
  const selectedAllCompanies = selectedCompanies.length === companies.length;
  const headCells = [
    { id: 'title', label: 'Title' },
    { id: 'category', label: 'Category' },
    { id: 'asking_price', label: 'Price' },
    { id: 'gross_revenue', label: 'Revenue' },
    { id: 'cash_flow', label: 'Cashflow' },
    { id: 'multiple', label: 'Multiple' },
    { id: 'source', label: 'Source' },
    { id: 'bus_created_at', label: 'Date Added' },
    { id: 'created_at', label: 'Last Updated' },

    { id: 'action', disabled: true, label: 'Action' },
  ];
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title={`Search Results ${totalCount ? `- ${convertNumberFormat(totalCount)} found(${convertNumberFormat(companies?.length)} loaded)` : ''}`}
      />
      <Divider />
      <Box
        p={2}
        minHeight={56}
        display="flex"
        alignItems="center"
      >
        <TextField
          className={classes.queryField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon
                  fontSize="small"
                  color="action"
                >
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            )
          }}
          onChange={handleQueryChange}
          placeholder="Search companies"
          value={query}
          variant="outlined"
        />
        <Box flexGrow={1} />
        <TablePagination
          component="div"
          count={query ? filteredCompanies.length : totalCount}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Box>

      {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllCompanies}
              indeterminate={selectedSomeCompanies}
              onChange={handleSelectAllCompanies}
            />
            <Button
              variant="outlined"
              className={classes.bulkAction}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              className={classes.bulkAction}
            >
              Edit
            </Button>
          </div>
        </div>
      )}
      {pageLoading
        ? (
          <Box
            display="flex"
            justifyContent="center"
            my={5}
          >
            <CircularProgress />
          </Box>
        )
        : (
          <>
            <PerfectScrollbar>
              <Box minWidth={700}>
                <Table>
                  <EnhancedTableHead
                    classes={classes}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    headCells={headCells}
                  />
                  {loading ? (
                    <Box
                      display="flex"
                      justifyContent="center"
                      my={5}
                    >
                      <CircularProgress />
                    </Box>
                  ) : (
                      <TableBody>
                        {paginatedCompanies.map((company, index) => {
                          const isCompanySelected = selectedCompanies.includes(company.id);
                          console.log('sales_volume1', company.sales_volume, parseInt(company.sales_volume), company.sales_volume ? convertNumberFormat(parseInt(company.sales_volume)) : '');

                          return (
                            <TableRow
                              hover
                              key={company.id}
                              selected={isCompanySelected}
                            >
                              <TableCell>
                                <Link
                                  color="inherit"
                                  component={RouterLink}
                                  to={`/app/management/companies/${company.id}`}
                                  variant="h6"
                                >
                                  {company.title}
                                </Link>
                              </TableCell>
                              <TableCell>
                                {company.category}
                              </TableCell>
                              <TableCell>
                                {convertNumberFormat(company.asking_price) !== 'N/A' && '$'}
                                {convertNumberFormat(company.asking_price)}
                              </TableCell>
                              <TableCell>
                                {convertNumberFormat(company.gross_revenue) !== 'N/A' && '$'}
                                {convertNumberFormat(company.gross_revenue)}
                              </TableCell>
                              <TableCell>
                                {convertNumberFormat(company.cash_flow) !== 'N/A' && '$'}
                                {convertNumberFormat(company.cash_flow)}
                              </TableCell>
                              <TableCell>
                                {company.multiple}
                              </TableCell>
                              <TableCell>
                                <a href={company.url} target="_blank" style={{textDecoration: 'none'}}>
                                  <Label color={'success'}>
                                    {SOURCE_LIST[company.source]}
                                  </Label>
                                </a>
                              </TableCell>
                              <TableCell className={classes.condensed}>
                                {moment(company.bus_created_at).format('MMM-DD-YYYY')}
                              </TableCell>
                              <TableCell className={classes.condensed}>
                                {moment(company.created_at).format('MMM-DD-YYYY')}
                              </TableCell>
                              <TableCell align="right">
                                <IconButton
                                  component={RouterLink}
                                  to={`/app/management/companies/${company.id}`}
                                >
                                  <SvgIcon fontSize="small">
                                    <ArrowRightIcon />
                                  </SvgIcon>
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    )}
                </Table>
              </Box>
            </PerfectScrollbar>
            <TablePagination
              component="div"
              count={query ? filteredCompanies.length : totalCount}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </>
        )}

    </Card>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  companies: PropTypes.array,
  totalCount: PropTypes.number,
  condition: PropTypes.object
};

Results.defaultProps = {
  companies: []
};

export default Results;
