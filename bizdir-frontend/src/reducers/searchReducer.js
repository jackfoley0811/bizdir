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
  searchCondition: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CONDITION: {
      return produce(state, (draft) => {
        console.log('searchCondition', action.payload)
        draft.searchCondition = action.payload;
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

export default searchReducer;
