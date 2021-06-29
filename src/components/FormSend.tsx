import React from 'react';
import {connect} from "react-redux";
import {addCartItem} from "../store/action/action";

interface PropsType {
    addToCart: (title: string, price: number, quantity: number, id: number) => void;
}

class FormSend extends React.PureComponent<PropsType> {
    state = {
        title: '',
        price: 1,
        quantity: 1,
        id: new Date()
    }

    inputRef = React.createRef<HTMLInputElement>()

    handleInput1 = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ title: event.target.value })
    }
    handleInput2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({quantity: event.target.value})
    }
    handleInput3 = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({price: event.target.value})
    }

    addProduct = (event: React.SyntheticEvent) => {
        const { title, price, quantity, id } = this.state;
        event.preventDefault();

        if (title && price) {
            this.props.addToCart(title, +price, +quantity,  +id);
        }
        if(title === ''){
            this.inputRef.current?.focus()
            this.setState({quantity: this.state.quantity, price: this.state.price})
        }
        if(title !== ''){
            this.setState({title: '', quantity: 1 , price: 1})
        }
    };

    render() {
        const { title, price, quantity } = this.state;
        return (
            <form onSubmit={this.addProduct}>
                <button type="submit">Send to cart</button>
                <label>
                    <input
                        ref={this.inputRef}
                        placeholder={'Name of product'}
                        type="text"
                        value={title}
                        onChange={this.handleInput1}
                    />
                    Name product
                </label>
                <label>
                    <input
                        placeholder={'Quantity of product'}
                        type="number"
                        value={quantity}
                        onChange={this.handleInput2}
                    />
                    Quantity
                </label>
                <label>
                    <input
                        placeholder={'Price of product'}
                        type="number"
                        value={price}
                        onChange={this.handleInput3}
                    />
                    Price
                </label>
            </form>
        )
    }
}
export default connect(
    null,
    { addToCart: addCartItem }
)(FormSend)