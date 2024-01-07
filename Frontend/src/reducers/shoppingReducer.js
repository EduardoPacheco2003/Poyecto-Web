import { TYPES } from "../actions/shoppingAction";

export const shoppingInitialState = {
  services: [],
  cart: [],
  totalCost: 0,
};

export const shoppingReducer = (state, action) => {
  switch (action.type) {
    case TYPES.ADD_TO_CART: {
      //Vemos si el producto ya esta en el carrito y aumentamos el costo total
      const inCart = state.cart.find((item) => item.id === action.payload.id);
      let totalCost = state.totalCost + parseFloat(action.payload.Costo);
      totalCost = parseFloat(totalCost.toFixed(2));
      //Si esta en el carrito, aumentamos la cantidad
      //Si no esta, lo agregamos al carrito
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
            )
          : [...state.cart, { ...action.payload, cantidad: 1 }],
        totalCost: totalCost,
      };
    }
    case TYPES.REMOVE_ONE_FROM_CART: {
      //Buscamos el producto en el carrito y disminuimos el costo total
      let itemToRemove = state.cart.find((item) => item.id === action.payload);
      let totalCost = state.totalCost - parseFloat(itemToRemove.Costo);
      totalCost = parseFloat(totalCost.toFixed(2));

      return itemToRemove.cantidad > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload
                ? { ...item, cantidad: item.cantidad - 1 }
                : item
            ),
            totalCost: totalCost,
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload),
            totalCost: totalCost,
          };
    }

    case TYPES.REMOVE_ALL_FROM_CART: {
      //Disminuimos el costo total
      let itemToRemove = state.cart.find((item) => item.id === action.payload);
      let totalCost =
        state.totalCost -
        parseFloat(itemToRemove.Costo * itemToRemove.cantidad);
      totalCost = parseFloat(totalCost.toFixed(2));
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
        totalCost: totalCost,
      };
    }

    case TYPES.CLEAR_CART:
      return shoppingInitialState;
    case TYPES.LOAD_SERVICES: {
      const avalibleServices = action.payload.filter(
        (service) => service.Disponible === true
      );
      return {
        ...state,
        services: [...avalibleServices],
      };
    }

    default:
      return state;
  }
};
