import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
} from "../constants/productConstants";

export const productListReducers = (state = { product: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, product: [] };

    case PRODUCT_LIST_SUCCESS:
      return { loading: false, product: action.payload };

    case PRODUCT_LIST_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
