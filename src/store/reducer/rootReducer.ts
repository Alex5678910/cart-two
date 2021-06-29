import {IncreaseCount, DecreaseCount, RemoveCartItem, AddCartItem} from "../action/action";


export interface SetCartItems {
    type: 'FETCH_MENU_SUCCESS';
    payload: Array<CartItem>;
}

export interface CartItem {
    id: number;
    title: string;
    quantity: number;
    price: number;
}

export interface TypeState {
    reducer: CartItems,
    _persist: {}
}

export type CartItems = Array<CartItem>;

export default function func(state: CartItems = [], action: SetCartItems | IncreaseCount | DecreaseCount | RemoveCartItem | AddCartItem): CartItems {
    switch (action.type) {
        case 'FETCH_MENU_SUCCESS':
            return action.payload;
        case "PLUS_ITEM":
            return  state.map(item => item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item)
        case "MINUS_ITEM":
            return  state.map(item => item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item)
        case 'REMOVE_CART_ITEM':
            return state.filter(({ id }) => id !== action.payload);
        case 'ADD_CART_ITEM':
            return [...state, action.payload];
        default:
            return state;
    }
}