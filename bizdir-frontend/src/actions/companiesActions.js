import axios from 'src/utils/axios';
import { PER_LOAD_COMPANIES } from 'src/constants';

export const SEARCH_COMPANY = '@companies/search-company';
export const SEARCH_SUCCESS = '@companies/search-success';
export const SUBMIT_SEARCH = '@companies/submit-search';
export const LOAD_SUCCESS = '@companies/load-success';
export const LOAD_STATIC = '@companies/load-static';
export const LOAD_ONE_COMPANY = '@companies/load-one-company';
export const SAVE_CONDITION = '@companies/save-condition';


export function saveCondition(condition) {
  return (dispatch) => dispatch({
    type: SAVE_CONDITION,
    payload: condition
  });
}

export function loadCompanies() {
  const request = axios.get('/api/business/');
  return (dispatch) => request.then((response) => dispatch({
    type: LOAD_SUCCESS,
    payload: response.data
  })).catch((err) => console.error(err));
}

export function loadOneCompany(business_id) {
  const request = axios.get(`/api/company/${business_id}`);
  return (dispatch) => request.then((response) => dispatch({
    type: LOAD_ONE_COMPANY,
    payload: response.data
  })).catch((err) => console.error(err));
}
export function loadStatic() {
  const request = axios.get('/api/load_static/');
  return (dispatch) => request.then((response) => dispatch({
    type: LOAD_STATIC,
    payload: response.data
  })).catch((err) => console.error(err));
}

export function searchCompany(condition, start, limit = PER_LOAD_COMPANIES) {
  const form = { ...condition };
  Object.keys(form).forEach((key) => {
    if (form[key] === '' || !form[key]) {
      delete form[key];
    }
  });
  form.startFrom = start;
  form.limit = PER_LOAD_COMPANIES;

  // wcupa.edu
  const request = axios.post('/api/company_enrich/', form);
  return (dispatch) => {
    // dispatch({ type: SUBMIT_SEARCH, payload: form });
    return request.then((response) => dispatch({
      type: SEARCH_SUCCESS,
      payload: response.data
    })).catch((err) => console.error(err));
  };
}

export function sendCompanies(companies, email, filename = 'companies') {
  // wcupa.edu
  const request = axios.post('/api/send_excel/', { companies, email, filename });
  return (dispatch) => request.then((response) => { }).catch((err) => console.error(err));
}
