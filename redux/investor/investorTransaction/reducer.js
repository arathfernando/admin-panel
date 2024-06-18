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

const INIT_STATE = {
  investorTransactionAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  investorTransactions: {
    loading: false,
    error: null,
    data: [],
  },
  investorAssignPriceAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  sharePrices: {
    loading: false,
    error: null,
    data: [],
  },
  investorTransactionsOfUser: {
    loading: false,
    error: null,
    data: [],
  },
  updateInvestorSharePriceAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteInvestorSharePriceAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  updateInvestorAssignShareAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  deleteInvestorAssignShareAction: {
    status: 'idle',
    error: null,
    data: {},
  },
  allInvestorUsers: {
    loading: false,
    error: null,
    data: [],
  },
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    // ------ create_investor_investorTransaction ------
    case INVESTOR_ASSIGN_SHARES:
      return {
        ...state,
        investorTransactionAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case INVESTOR_ASSIGN_SHARES_SUCCESSFUL:
      return {
        ...state,
        investorTransactionAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case INVESTOR_ASSIGN_SHARES_FAILED:
      return {
        ...state,
        investorTransactionAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ get_investor_investorTransactions ------
    case GET_INVESTOR_TRANSACTIONS:
      return {
        ...state,
        investorTransactions: {
          ...state.investorTransactions,
          loading: true,
          error: null,
        },
      };
    case GET_INVESTOR_TRANSACTIONS_SUCCESSFUL:
      return {
        ...state,
        investorTransactions: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_INVESTOR_TRANSACTIONS_FAILED:
      return {
        ...state,
        investorTransactions: {
          loading: false,
          ...action.payload,
        },
      };
    // ------ investor_assign_price ------
    case INVESTOR_ASSIGN_PRICE:
      return {
        ...state,
        investorAssignPriceAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case INVESTOR_ASSIGN_PRICE_SUCCESSFUL:
      return {
        ...state,
        investorAssignPriceAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case INVESTOR_ASSIGN_PRICE_FAILED:
      return {
        ...state,
        investorAssignPriceAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ get_share_prices ------
    case GET_SHARE_PRICES:
      return {
        ...state,
        sharePrices: {
          ...state.sharePrices,
          loading: true,
          error: null,
        },
      };
    case GET_SHARE_PRICES_SUCCESSFUL:
      return {
        ...state,
        sharePrices: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_SHARE_PRICES_FAILED:
      return {
        ...state,
        sharePrices: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ get_investor_transactions_of_user ------
    case GET_INVESTOR_TRANSACTIONS_OF_USER:
      return {
        ...state,
        investorTransactionsOfUser: {
          ...state.investorTransactionsOfUser,
          loading: true,
          error: null,
        },
      };
    case GET_INVESTOR_TRANSACTIONS_OF_USER_SUCCESSFUL:
      return {
        ...state,
        investorTransactionsOfUser: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_INVESTOR_TRANSACTIONS_OF_USER_FAILED:
      return {
        ...state,
        investorTransactionsOfUser: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    // ------ update_investor_share_price ------
    case UPDATE_INVESTOR_SHARE_PRICE:
      return {
        ...state,
        updateInvestorSharePriceAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_INVESTOR_SHARE_PRICE_SUCCESSFUL:
      return {
        ...state,
        updateInvestorSharePriceAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_INVESTOR_SHARE_PRICE_FAILED:
      return {
        ...state,
        updateInvestorSharePriceAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_investor_share_price ------
    case DELETE_INVESTOR_SHARE_PRICE:
      return {
        ...state,
        deleteInvestorSharePriceAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_INVESTOR_SHARE_PRICE_SUCCESSFUL:
      return {
        ...state,
        deleteInvestorSharePriceAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_INVESTOR_SHARE_PRICE_FAILED:
      return {
        ...state,
        deleteInvestorSharePriceAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ update_investor_assign_share ------
    case UPDATE_INVESTOR_ASSIGN_SHARE:
      return {
        ...state,
        updateInvestorAssignShareAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_INVESTOR_ASSIGN_SHARE_SUCCESSFUL:
      return {
        ...state,
        updateInvestorAssignShareAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case UPDATE_INVESTOR_ASSIGN_SHARE_FAILED:
      return {
        ...state,
        updateInvestorAssignShareAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ delete_investor_assign_share ------
    case DELETE_INVESTOR_ASSIGN_SHARE:
      return {
        ...state,
        deleteInvestorAssignShareAction: {
          status: 'submitting',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_INVESTOR_ASSIGN_SHARE_SUCCESSFUL:
      return {
        ...state,
        deleteInvestorAssignShareAction: {
          status: 'submitted',
          error: null,
          data: action.payload,
        },
      };
    case DELETE_INVESTOR_ASSIGN_SHARE_FAILED:
      return {
        ...state,
        deleteInvestorAssignShareAction: {
          status: 'failed',
          error: action.payload,
          data: {},
        },
      };
    // ------ get_all_investor_users ------
    case GET_ALL_INVESTOR_USERS:
      return {
        ...state,
        allInvestorUsers: {
          ...state.allInvestorUsers,
          loading: true,
          error: null,
        },
      };
    case GET_ALL_INVESTOR_USERS_SUCCESSFUL:
      return {
        ...state,
        allInvestorUsers: {
          loading: false,
          error: null,
          ...action.payload,
        },
      };
    case GET_ALL_INVESTOR_USERS_FAILED:
      return {
        ...state,
        allInvestorUsers: {
          loading: false,
          data: [],
          ...action.payload,
        },
      };
    default:
      return {
        ...state,
      };
  }
};
