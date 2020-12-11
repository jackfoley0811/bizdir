import React, { useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from 'src/components/LoadingScreen';
import Page from 'src/components/Page';
import Details from './Details';
import PriceChangeList from './PriceChangeList';
import PriceHistory from './PriceHistory';
import Header from './Header';
import Description from './Description';
import PriceHistoryList from './PriceHistoryList/index';
import Overview from './Overview';
import Financials from './Financials';
import {
  loadOneCompany
} from 'src/actions/companiesActions';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 64,
      paddingRight: 64
    }
  }
}));

function CompanyView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const companyState = useSelector(state => state.companies);
  const { selectedCompany } = companyState;
  const { companyId } = useParams();
  async function fetchCompanyDetail(pk) {
    dispatch(loadOneCompany(pk));
  }
  useEffect(() => {
    // if (selectedCompany?.id != companyId) {
      fetchCompanyDetail(companyId);
    // }
  }, []);
  console.log('companydetail', selectedCompany)
  return (
    <Page
      className={classes.root}
      title={`Detail - ${selectedCompany?.title}`}
    >
      <Container
        maxWidth={false}
        className={classes.container}
      >
        
        {
          selectedCompany?.id != companyId ? <LoadingScreen />
            :
            <>
              <Header company={selectedCompany} />
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  xs={12}
                >
                  <Overview company={selectedCompany} />
                </Grid>
                <Grid
                  item
                  lg={8}
                  xl={9}
                  xs={12}
                >
                  <PriceHistory company={selectedCompany} />
                </Grid>
                <Grid
                  item
                  lg={4}
                  xl={3}
                  xs={12}
                >
                  <Financials company={selectedCompany} />
                  {/* <EarningsSegmentation /> */}
                </Grid>
                <Grid
                  item
                  lg={8}
                  xs={12}
                >
                  <Description description={selectedCompany.description} />
                </Grid>
                <Grid
                  item
                  lg={4}
                  xs={12}
                >
                  <Details company={selectedCompany} />
                </Grid>
                <Grid
                  item
                  lg={4}
                  xs={12}
                >
                  <PriceChangeList price_history={selectedCompany.price_history} />
                </Grid>
                <Grid
                  item
                  lg={8}
                  xs={12}
                >
                  <PriceHistoryList price_history={selectedCompany.price_history}/>
                </Grid>
              </Grid>
            </>
            
        }
      </Container>
    </Page>
  );
}

export default CompanyView;
