/* eslint-disable no-param-reassign */
import produce from 'immer';
import {
  SEARCH_SUCCESS,
  SUBMIT_SEARCH,
  LOAD_SUCCESS,
  LOAD_STATIC,
  LOAD_ONE_COMPANY,
  SAVE_CONDITION
} from 'src/actions/companiesActions';
import { cleanSearchResults } from 'src/utils/company';
const initialState = {
  searchedCompanies: null,
  searchCondition: null,
  savedSearches: null,
  totalCount: null,
  categoryList: null,
  sourceList: null,
  selectedCompany: null
};

const companiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ONE_COMPANY: {
      return produce(state, (draft) => {
        draft.selectedCompany = { 
          ...action.payload.company, 
          price_history: action.payload.price_history, 
          category: state.categoryList.find(item => item.id === action.payload.company.category_id).title,
          source: state.sourceList.find(item => item.id === action.payload.company.source_id).title,
        };
        console.log('companydetail', draft.selectedCompany)
      });
    }
    case LOAD_STATIC: {
      return produce(state, (draft) => {
        draft.categoryList = action.payload.categories;
        draft.sourceList = action.payload.sources;
      });
    }
    case LOAD_SUCCESS: {
      return produce(state, (draft) => {
        draft.searchedCompanies = action.payload;
      });
    }
    case SAVE_CONDITION: {
      return produce(state, (draft) => {
        console.log('searchCondition', action.payload)
        draft.searchCondition = action.payload;
      });
    }
    case SEARCH_SUCCESS: {
      return produce(state, (draft) => {
        // Ensure we clear current session
        console.log('pagecount1', draft.searchedCompanies, state)
        if (action.payload.startFrom === 0) {
          draft.searchedCompanies = cleanSearchResults(action.payload, state.categoryList, state.sourceList);
          draft.totalCount = action.payload.total_count;
        }
        else {
          console.log('pagecount2', draft.searchedCompanies)
          draft.searchedCompanies = (draft.searchedCompanies || []).concat(cleanSearchResults(action.payload, state.categoryList, state.sourceList));
          draft.totalCount = action.payload.total_count;
          console.log('pagecount3', draft.searchedCompanies)
        }
      });
    }
    case SUBMIT_SEARCH: {
      return produce(state, (draft) => {
        // Ensure we clear current session
        let condition = { ...action.payload };
        delete condition['startFrom'];
        delete condition['limit'];
        delete condition['city_id'];
        if (condition['search_id']) {
          delete condition['search_id']
        }
        draft.searchCondition = condition;
      });
    }
    default: {
      return state;
    }
  }
};

export default companiesReducer;
