import React, {Component} from 'react';
import ListItem from "./components/ListItem";
import FormSend from "./components/FormSend";

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>Заходи в нашу пиццерию</h1>
                <FormSend/>
                <ListItem/>
            </div>
        )
    }
}

export default App;
