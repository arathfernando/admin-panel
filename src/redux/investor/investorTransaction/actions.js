import {
  DELETE_INVESTOR_ASSIGN_SHARE,
  DELETE_INVESTOR_ASSIGN_SHARE_FAILED,
  DELETE_INVESTOR_ASSIGN_SHARE_SUCCESSFUL,
  DELETE_INVESTOR_SHARE_PRICE,
  DELETE_INVESTOR_SHARE_PRICE_FAILED,
  DELETE_INVESTOR_SHARE_PRICE_SUCCESSFUL,
  GET_ALL_INVESTOR_USERS,
  GET_ALL_INVESTOR_USERS_FAILED,
  GET_ALL_INVESTOR_USERS_SUCCESSFUL,
  GET_INVESTOR_TRANSACTIONS,
  GET_INVESTOR_TRANSACTIONS_FAILED,
  GET_INVESTOR_TRANSACTIONS_OF_USER,
  GET_INVESTOR_TRANSACTIONS_OF_USER_FAILED,
  GET_INVESTOR_TRANSACTIONS_OF_USER_SUCCESSFUL,
  GET_INVESTOR_TRANSACTIONS_SUCCESSFUL,
  GET_SHARE_PRICES,
  GET_SHARE_PRICES_FAILED,
  GET_SHARE_PRICES_SUCCESSFUL,
  INVESTOR_ASSIGN_PRICE,
  INVESTOR_ASSIGN_PRICE_FAILED,
  INVESTOR_ASSIGN_PRICE_SUCCESSFUL,
  INVESTOR_ASSIGN_SHARES,
  INVESTOR_ASSIGN_SHARES_FAILED,
  INVESTOR_ASSIGN_SHARES_SUCCESSFUL,
  UPDATE_INVESTOR_ASSIGN_SHARE,
  UPDATE_INVESTOR_ASSIGN_SHARE_FAILED,
  UPDATE_INVESTOR_ASSIGN_SHARE_SUCCESSFUL,
  UPDATE_INVESTOR_SHARE_PRICE,
  UPDATE_INVESTOR_SHARE_PRICE_FAILED,
  UPDATE_INVESTOR_SHARE_PRICE_SUCCESSFUL,
} from '../../types/investor/investorTransaction';

// create_investor_investorTransaction
export const investorAssignShares = (payload) => {
  return {
    type: INVESTOR_ASSIGN_SHARES,
    payload,
  };
};
export const investorAssignSharesSuccessful = (payload) => {
  return {
    type: INVESTOR_ASSIGN_SHARES_SUCCESSFUL,
    payload,
  };
};
export const investorAssignSharesFailed = (payload) => {
  return {
    type: INVESTOR_ASSIGN_SHARES_FAILED,
    payload,
  };
};

// get_investor_investorTransactions
export const getInvestorTransactions = (payload) => {
  return {
    type: GET_INVESTOR_TRANSACTIONS,
    payload,
  };
};
export const getInvestorTransactionsSuccessful = (payload) => {
  return {
    type: GET_INVESTOR_TRANSACTIONS_SUCCESSFUL,
    payload,
  };
};
export const getInvestorTransactionsFailed = (payload) => {
  return {
    type: GET_INVESTOR_TRANSACTIONS_FAILED,
    payload,
  };
};

// investor_assign_price
export const investorAssignPrice = (payload) => {
  return {
    type: INVESTOR_ASSIGN_PRICE,
    payload,
  };
};
export const investorAssignPriceSuccessful = (payload) => {
  return {
    type: INVESTOR_ASSIGN_PRICE_SUCCESSFUL,
    payload,
  };
};
export const investorAssignPriceFailed = (payload) => {
  return {
    type: INVESTOR_ASSIGN_PRICE_FAILED,
    payload,
  };
};

// get_share_prices
export const getSharePrices = (payload) => {
  return {
    type: GET_SHARE_PRICES,
    payload,
  };
};
export const getSharePricesSuccessful = (payload) => {
  return {
    type: GET_SHARE_PRICES_SUCCESSFUL,
    payload,
  };
};
export const getSharePricesFailed = (payload) => {
  return {
    type: GET_SHARE_PRICES_FAILED,
    payload,
  };
};

// get_investor_transactions_of_user
export const getInvestorTransactionsOfUser = (payload) => {
  return {
    type: GET_INVESTOR_TRANSACTIONS_OF_USER,
    payload,
  };
};
export const getInvestorTransactionsOfUserSuccessful = (payload) => {
  return {
    type: GET_INVESTOR_TRANSACTIONS_OF_USER_SUCCESSFUL,
    payload,
  };
};
export const getInvestorTransactionsOfUserFailed = (payload) => {
  return {
    type: GET_INVESTOR_TRANSACTIONS_OF_USER_FAILED,
    payload,
  };
};

// update_investor_share_price
export const updateInvestorSharePrice = (payload) => {
  return {
    type: UPDATE_INVESTOR_SHARE_PRICE,
    payload,
  };
};
export const updateInvestorSharePriceSuccessful = (payload) => {
  return {
    type: UPDATE_INVESTOR_SHARE_PRICE_SUCCESSFUL,
    payload,
  };
};
export const updateInvestorSharePriceFailed = (payload) => {
  return {
    type: UPDATE_INVESTOR_SHARE_PRICE_FAILED,
    payload,
  };
};

// delete_investor_share_price
export const deleteInvestorSharePrice = (payload) => {
  return {
    type: DELETE_INVESTOR_SHARE_PRICE,
    payload,
  };
};
export const deleteInvestorSharePriceSuccessful = (payload) => {
  return {
    type: DELETE_INVESTOR_SHARE_PRICE_SUCCESSFUL,
    payload,
  };
};
export const deleteInvestorSharePriceFailed = (payload) => {
  return {
    type: DELETE_INVESTOR_SHARE_PRICE_FAILED,
    payload,
  };
};

// update_investor_assign_share
export const updateInvestorAssignShare = (payload) => {
  return {
    type: UPDATE_INVESTOR_ASSIGN_SHARE,
    payload,
  };
};
export const updateInvestorAssignShareSuccessful = (payload) => {
  return {
    type: UPDATE_INVESTOR_ASSIGN_SHARE_SUCCESSFUL,
    payload,
  };
};
export const updateInvestorAssignShareFailed = (payload) => {
  return {
    type: UPDATE_INVESTOR_ASSIGN_SHARE_FAILED,
    payload,
  };
};

// delete_investor_assign_share
export const deleteInvestorAssignShare = (payload) => {
  return {
    type: DELETE_INVESTOR_ASSIGN_SHARE,
    payload,
  };
};
export const deleteInvestorAssignShareSuccessful = (payload) => {
  return {
    type: DELETE_INVESTOR_ASSIGN_SHARE_SUCCESSFUL,
    payload,
  };
};
export const deleteInvestorAssignShareFailed = (payload) => {
  return {
    type: DELETE_INVESTOR_ASSIGN_SHARE_FAILED,
    payload,
  };
};

// get_all_investor_users
export const getAllInvestorUsers = () => {
  return {
    type: GET_ALL_INVESTOR_USERS,
  };
};
export const getAllInvestorUsersSuccessful = (payload) => {
  return {
    type: GET_ALL_INVESTOR_USERS_SUCCESSFUL,
    payload,
  };
};
export const getAllInvestorUsersFailed = (payload) => {
  return {
    type: GET_ALL_INVESTOR_USERS_FAILED,
    payload,
  };
};
