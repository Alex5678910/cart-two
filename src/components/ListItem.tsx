import React from 'react';
import {connect} from "react-redux";
import {fetchItems, increaseCount, decreaseCount, removeCartItem} from "../store/action/action";
import {CartItem, TypeState} from "../store/reducer/rootReducer";

declare var confirm: (question: string) => boolean

export interface PropsType {
    loadItems: () => void;
    increaseCount: (id: number) => void;
    decreaseCount: (id: number) => void;
    remove: (id: number) => void;
    state: Array<CartItem>
}

class ListItem extends React.PureComponent<PropsType> {
    componentDidMount(): void {
        this.props.loadItems()
    }
    plusHandler = (elem: { id: number }) => {
        const {increaseCount} = this.props;
        increaseCount(elem.id);
    }

    minusHandler = (elem: { id: number, quantity: number }) => {
        const {decreaseCount} = this.props;
        if (elem.quantity > 1) {
            decreaseCount(elem.id);
        }
    }

    removeHandler = (elem: { id: number, title: string, price: number }) => {
        const {remove} = this.props;
        const shouldRemove = confirm(`Вы хотите удалить "${elem.title}"?, по цене - ${elem.price}$`)
        if (shouldRemove) {
            remove(elem.id);
        }
    };

    render() {
        const {state} = this.props
        console.log(state)
        return (
            <>
                <table className={'Table'}>
                    <thead className={'Thead'}>
                    <tr>
                        <th className={'Box-title'}>Меню</th>
                        <th className={'Box-title'}>Количество</th>
                        <th className={'Box-title'}>Цена</th>
                    </tr>
                    </thead>
                    <tbody>
                    {state.length > 0 ?
                        state.map((e: CartItem, index: number) => {
                            return (
                                <tr key={index}>
                                    <td className={'Title-td'}>{e.title}</td>
                                    <td><span className={'Increase'} onClick={() => this.plusHandler(e)}>
                            +</span><span>{e.quantity}</span>
                                        <span className={'Decrease'}
                                              onClick={() => this.minusHandler(e)}>
                            -</span></td>
                                    <td>{e.price}</td>
                                    <td>
                                        <button className={'Del'} onClick={() => this.removeHandler(e)}>Del</button>
                                    </td>
                                </tr>
                            )
                        }) : <tr className={'Quantity'}>
                            <td>Нет заказа</td>
                        </tr>
                    }
                    </tbody>
                </table>
            </>
        )
    }
}

const mapStateToProps = (state: TypeState) => {
    return {
        state: state.reducer
    }
}

export default connect(mapStateToProps, {loadItems: fetchItems, increaseCount, decreaseCount, remove: removeCartItem})(ListItem)
