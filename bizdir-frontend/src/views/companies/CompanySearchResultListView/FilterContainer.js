import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Typography,
  makeStyles,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NumberFilter from './filter/NumberFilter';
import KeywordFilter from './filter/KeywordFilter';
import CategoryFilter from './filter/CategoryFilter';
import MoreFilters from './filter/MoreFilters';

import {
  saveCondition
} from 'src/actions/companiesActions';

var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

const useStyles = makeStyles((theme) => ({
  root: {},
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  actionIcon: {
    marginRight: theme.spacing(1)
  },
  chips: {
    display: 'flex',
    marginTop: theme.spacing(1),
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

function FilterContainer({ onSaveCondition, searchCondition, totalCount, categoryList, sourceList, className, ...rest }) {
  const classes = useStyles();
  const [condition, setCondition] = useState(searchCondition);
  const updateCondition = (key, value) => {
    setCondition(oldCondition => ({
      ...oldCondition,
      [key]: value
    }));
  }
  const dispatch = useDispatch();
  useEffect(() => {
    if (condition !== searchCondition) {
      setCondition(searchCondition);
    }
  }, [searchCondition]);
  useEffect(() => {
    if (JSON.stringify(condition) != JSON.stringify(searchCondition)) {
      console.log('companydetail1', condition, searchCondition)
      onSaveCondition(condition);
    }
  }, [condition])
  return (
    <>
      <KeywordFilter updateCondition={updateCondition} defaultCondition={condition?.keyword} keyValue={'keyword'} keyLabel={'Keyword'} />
      <NumberFilter updateCondition={updateCondition} defaultCondition={condition?.asking_price} keyValue={'asking_price'} keyLabel={'Price'} isPrice />
      <NumberFilter updateCondition={updateCondition} defaultCondition={condition?.gross_revenue} keyValue={'gross_revenue'} keyLabel={'Revenue'} isPrice />
      <NumberFilter updateCondition={updateCondition} defaultCondition={condition?.cash_flow} keyValue={'cash_flow'} keyLabel={'Cash Flow'} isPrice />
      <NumberFilter updateCondition={updateCondition} defaultCondition={condition?.multiple} keyValue={'multiple'} keyLabel={'Multiple'} />
      <CategoryFilter updateCondition={updateCondition} defaultCondition={condition?.category} keyValue={'category'} keyLabel={'Category'} categoryList={categoryList} />
      <MoreFilters updateCondition={(newCondition) => setCondition(oldCondition => ({ ...oldCondition, ...newCondition }))} defaultCondition={condition} keyLabel={'More Filters'} sourceList={sourceList} />
      <Button variant="contained" color="default" onClick={() => setCondition({})}style={{ marginRight: "1rem" }}>
        Reset
      </Button>
      {/* <Button variant="contained" color="default" onClick={onSaveCondition} style={{marginLeft: "1rem"}}>
        Search
      </Button> */}
    </>
  );
}

FilterContainer.propTypes = {
};

export default FilterContainer;
