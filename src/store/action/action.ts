import { Dispatch } from 'redux';
import {CartItem, SetCartItems} from "../reducer/rootReducer";

export const setCartItems = (items: Array<CartItem>): SetCartItems => ({
    type: 'FETCH_MENU_SUCCESS',
    payload: items
})

export const fetchItems = () => async (dispatch: Dispatch) => {
    const items = await fetch('api/db.json', {
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());

    dispatch(setCartItems(items));
}

export interface IncreaseCount {
    type: 'PLUS_ITEM';
    payload: number;
}

export const increaseCount = (id: number): IncreaseCount => ({
    type: 'PLUS_ITEM',
    payload: id
});

export interface DecreaseCount {
    type: 'MINUS_ITEM';
    payload: number;
}

export const decreaseCount = (id: number): DecreaseCount => ({
    type: 'MINUS_ITEM',
    payload: id
});

export interface RemoveCartItem {
    type: 'REMOVE_CART_ITEM';
    payload: number;
}

export const removeCartItem = (id: number): RemoveCartItem => ({
    type: 'REMOVE_CART_ITEM',
    payload: id
})

export interface AddCartItem {
    type: 'ADD_CART_ITEM';
    payload: CartItem;
}

export const addCartItem = (title: string, price: number, quantity: number, id: number): AddCartItem => ({
    type: 'ADD_CART_ITEM',
    payload: {title, price, quantity, id}
})