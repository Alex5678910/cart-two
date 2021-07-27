import React from 'react';
import {connect} from "react-redux";
import {fetchItems, increaseCount, decreaseCount, removeCartItem, sortItem} from "../store/action/action";
import {CartItem, TypeState} from "../store/reducer/rootReducer";

declare var confirm: (question: string) => boolean

export interface PropsType {
    loadItems: () => void;
    increaseCount: (id: number) => void;
    decreaseCount: (id: number) => void;
    remove: (id: number) => void;
    state: Array<CartItem>
    sortItem: () => void;
}

class ListItem extends React.PureComponent<PropsType> {

    state = {
        flag: false,
    }

    componentDidMount(): void {
        console.log('componentDidMount ListItem')
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


    cls = 'up'

    arrowHandler = () => {
        this.setState({flag: !this.state.flag})
        this.state.flag ? this.cls = 'up' : this.cls = 'down'
        const {sortItem} = this.props;
        sortItem();
    }

    render() {

        const {state} = this.props
        return (
            <>
                <table className={'Table'}>
                    <thead className={'Thead'}>
                    <tr>
                        <th className={'Box-title'}><i className={this.cls} onClick={this.arrowHandler}/>Меню</th>
                        <th className={'Box-title'}>Количество</th>
                        <th className={'Box-title'}>Цена</th>
                    </tr>
                    </thead>
                    <tbody>
                    {state && state.length > 0 ?
                        state.map((el: { id: number, title: string, price: number, quantity: number }, index: number) => {
                            return (
                                <tr key={index}>
                                    <td className={'Title-td'}>{el.title}</td>
                                    <td><span className={'Increase'} onClick={() => this.plusHandler(el)}>
                            +</span><span>{el.quantity}</span>
                                        <span className={'Decrease'}
                                              onClick={() => this.minusHandler(el)}>
                            -</span></td>
                                    <td>{el.price}</td>
                                    <td>
                                        <button className={'Del'} onClick={() => this.removeHandler(el)}>Del</button>
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

export default connect(mapStateToProps, {
    loadItems: fetchItems,
    increaseCount,
    decreaseCount,
    remove: removeCartItem,
    sortItem
})(ListItem)

//{"title": "Пицца с тунцом","price": 12, "quantity": 1,"id": 3},
//{"title": "Пицца с сёмгой","price": 11, "quantity": 1,"id": 4},
//{"title": "Пицца с ливером","price": 13, "quantity": 1,"id": 5},
//{"title": "Пицца с карбонадом","price": 14, "quantity": 1,"id": 6},
//{"title": "Пицца с ананасом","price": 12, "quantity": 1,"id": 7},
//{"title": "Пицца с треской","price": 10, "quantity": 1,"id": 8},
//{"title": "Пицца с грибами","price": 10, "quantity": 1,"id": 9}
