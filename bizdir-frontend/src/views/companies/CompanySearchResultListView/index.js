import React, {
  useState,
  useEffect,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import { useSnackbar } from 'notistack';

import Page from 'src/components/Page';
import FilterContainer from './FilterContainer';
import Results from './Results';
import {
  searchCompany,
  loadStatic,
  saveCondition
} from 'src/actions/companiesActions';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function CompnySearchResultListView() {
  const classes = useStyles();
  const companyState = useSelector((state) => state.companies);
  const searchState = useSelector((state) => state.search);
  const { searchCondition } = searchState;
  const { searchedCompanies, sourceList, categoryList, totalCount } = companyState;
  const { enqueueSnackbar } = useSnackbar();
  const { source } = useParams();
  const dispatch = useDispatch();
  async function fetchCompanies() {
    await dispatch(searchCompany(searchCondition, 0));
  }
  async function fetchStatic() {
    await dispatch(loadStatic());
  }
  const onSaveCondition = async (condition) => {
    await dispatch(saveCondition(condition));
  }
  useEffect(() => {
    if(source && sourceList?.length > 0) {
      const newCondition = {
        source: sourceList.find(item => item.title === source)
      };
      if(newCondition !== searchCondition) {
        onSaveCondition({
          source: sourceList.find(item => item.title === source)
        })
      }
    }
  }, [sourceList])
  useEffect(() => {
    fetchStatic();
    // if(companyState.searchedCompanies.length === 0) {
      fetchCompanies();
    // }
  }, [searchCondition]);
  useEffect(() => {
    enqueueSnackbar('Companies have been loaded.', {
      variant: 'success'
    });
  }, [searchedCompanies])
  return (
    <Page
      className={classes.root}
      title="Company List"
    >
      <Container maxWidth={false}>
        <FilterContainer onSaveCondition={onSaveCondition} searchCondition={searchCondition} categoryList={categoryList} sourceList={sourceList} />
        {searchedCompanies && (
          <Box mt={3}>
            <Results companies={searchedCompanies} totalCount={totalCount} sourceList={sourceList} condition={searchCondition} onSaveCondition={onSaveCondition} />
          </Box>
        )}
      </Container>
    </Page>
  );
}

export default CompnySearchResultListView;
