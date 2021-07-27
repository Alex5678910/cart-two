import {
    IncreaseCount,
    DecreaseCount,
    RemoveCartItem,
    AddCartItem,
    SortItem,
    HandelClickPagination
} from "../action/action";

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
}

export type CartItems = Array<CartItem>


// const logs = (state: CartItems = [], id: number) => {
//     let j
//     for (let i: CartItem of state) {
//         j = state[i]
//     }
// }

export default function func(state: CartItems = [], action: SetCartItems | IncreaseCount | DecreaseCount | RemoveCartItem | AddCartItem | SortItem | HandelClickPagination): CartItems {
    switch (action.type) {
        case 'FETCH_MENU_SUCCESS':
            return action.payload;
        case "PLUS_ITEM":
            return state.map(item => item.id === action.payload ? {...item, quantity: item.quantity + 1} : item)
        case "MINUS_ITEM":
            return state.map(item => item.id === action.payload ? {...item, quantity: item.quantity - 1} : item)
        case 'REMOVE_CART_ITEM':
            return state.filter(({id}) => id !== action.payload)
        case 'ADD_CART_ITEM':
            return [...state, action.payload]
        case 'SORT_ITEM':
            return [...state.reverse()]
        case 'PUG_ITEM':
            // return [state[action.payload * action.payload - action.payload + 1], state[action.payload * action.payload], state[action.payload * action.payload + 1]]
            // return logs(state, action.payload)
            return [state[action.payload -1 ]]
        default:
            return state;
    }
}
