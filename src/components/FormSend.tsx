import React from 'react';
import {connect} from "react-redux";
import {addCartItem, handelClickPagination} from "../store/action/action";
import {CartItem, TypeState} from "../store/reducer/rootReducer";

interface PropsType {
    addToCart: (title: string, price: number, quantity: number) => void;
    state: Array<CartItem>
    handelClickPagination: (id: number) => void
}

export interface StateType {
    page: Array<number>,
    count: number,
    title: string,
    price: number,
    quantity: number
}

class FormSend extends React.PureComponent<PropsType> {

    state: StateType = {
        title: '',
        price: 1,
        quantity: 1,
        page: [],
        count: 1
    }

    inputRef = React.createRef<HTMLInputElement>()

    handleInput = ({currentTarget}: React.SyntheticEvent<HTMLInputElement>) => {
        const {name, value} = currentTarget;
        this.setState({[name]: value});
    }
    handelClick = (elem: number) => {
        const {handelClickPagination} = this.props;
        handelClickPagination(elem);
    }

    pagination = () => {
        if (this.state.title.length) {
            if ((this.props.state.length + 1) % 3 === 0) {
                this.setState({
                    count: Math.trunc((this.props.state.length) / 3) + 2
                })
                this.setState({
                    page: this.state.page.concat(this.state.count)
                })
            }
        }
    }


    addProduct = (event: React.SyntheticEvent) => {
        const {title, price, quantity} = this.state;
        event.preventDefault();

        if (title && price) {
            this.props.addToCart(title, +price, +quantity);
        }
        if (title === '') {
            this.inputRef.current?.focus()
            this.setState({quantity: this.state.quantity, price: this.state.price})
        }
        if (title !== '') {
            this.setState({title: '', quantity: 1, price: 1})
        }
        this.pagination()
    }

    render() {
        const {title, price, quantity, page} = this.state;
        return (
            <form onSubmit={this.addProduct}>
                <button type="submit">Send to cart</button>
                <label>
                    <input
                        ref={this.inputRef}
                        placeholder={'Name of product'}
                        type="text"
                        value={title}
                        name="title"
                        onChange={this.handleInput}
                        autoComplete="off"
                    />
                    Name product
                </label>
                <label>
                    <input
                        placeholder={'Quantity of product'}
                        type="number"
                        value={quantity}
                        name="quantity"
                        onChange={this.handleInput}
                    />
                    Quantity
                </label>
                <label>
                    <input
                        placeholder={'Price of product'}
                        type="number"
                        value={price}
                        name="price"
                        onChange={this.handleInput}
                    />
                    Price
                </label>
                <div className={'Page'}>
                    {page.map((el: number) => {
                        return <div key={el} className={'Pagination'}
                                    onClick={() => this.handelClick(el)}>{el}</div>
                    })}
                </div>
            </form>
        )
    }
}

const
    mapStateToProps = (state: TypeState) => {
        return {
            state: state.reducer
        }
    }

export default connect(
    mapStateToProps,
    {addToCart: addCartItem, handelClickPagination}
)(FormSend)

// handleInput1 = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({ title: event.target.value })
// }
// handleInput2 = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({quantity: event.target.value})
// }
// handleInput3 = (event: React.ChangeEvent<HTMLInputElement>) => {
//     this.setState({price: event.target.value})
// }

// componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, id: number) {
//     if (this.props.state === prevProps.state) {
//         console.log('componentDidUpdate FormSend')
//         this.pagination()
//     }
// }
//
// componentDidMount(): void {
//     console.log('componentDidMount FormSend')
//     this.pagination()
// }
