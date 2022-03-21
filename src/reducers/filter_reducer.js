import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    const priceArray = action.payload.map((p) => p.price);
    const maxPrice = Math.max(...priceArray);
    return {
      ...state,
      all_products: [...action.payload],
      filters: { ...state.filters, price: maxPrice, max_price: maxPrice },
      filtered_products: [...action.payload],
    };
  }
  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }
  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload,
    };
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];
    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) =>
        a.name.localeCompare(b.name, 'en')
      );
    }
    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name, 'en');
      });
    }
    return {
      ...state,
      filtered_products: tempProducts,
    };
  }
  if (action.type === UPDATE_FILTERS) {
    const { value, name } = action.payload;
    return {
      ...state,
      filters: { ...state.filters, [name]: value },
    };
  }
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const { text, company, category, price, max_price, color, shipping } =
      state.filters;
    let tempProducts = [...all_products];
    text &&
      (tempProducts = tempProducts.filter((product) =>
        product.name.toLowerCase().startsWith(text)
      ));
    company !== 'all' &&
      (tempProducts = tempProducts.filter(
        (product) => product.company === company
      ));
    category !== 'all' &&
      (tempProducts = tempProducts.filter(
        (product) => product.category === category
      ));
    color !== 'all' &&
      (tempProducts = tempProducts.filter((product) =>
        product.colors.find((c) => c === color)
      ));
    price < max_price &&
      (tempProducts = tempProducts.filter((product) => product.price <= price));
    shipping &&
      (tempProducts = tempProducts.filter((product) => product.shipping));

    return { ...state, filtered_products: tempProducts };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        price: state.filters.max_price,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        min_price: 0,
        shipping: false,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
