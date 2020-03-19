import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import {createStore} from 'redux';
import './styles.css';
import {timerReducer, changeSeconds, restart} from './timerReducer.js';
import RoundButton, {RESTART_SIGN} from './components/RoundButton';
import Timer from './components/Timer';
import Sandglass from './components/Sandglass';

const appStore = createStore(timerReducer);

class App extends React.Component {
    state = this.props.store.getState();

    handleDecrease = () => {
        this.props.store.dispatch({type: 'CHANGE_SECONDS', seconds: -1});
    };

    handleIncrease = () => {
        this.props.store.dispatch({type: 'CHANGE_SECONDS', seconds: +1});
    };

    componentDidMount() {
        this.unsubscribe = this.props.store.subscribe(() => {
            // задается новое состояние компонента и происходит перерисовка
            this.setState(this.props.store.getState());
        });
    }

    componentWillUnmount() {
        this.unsubscribe && this.unsubscribe();
    }

    render() {

        return (
            <div className="app">
                <Timer
                    seconds={this.state.seconds}
                    onDecrease={this.handleDecrease}
                    onIncrease={this.handleIncrease}
                />
            </div>
        );
    }
}

App.propTypes = {
    store: PropTypes.object.isRequired,
};

ReactDom.render(<App store={appStore}/>, document.getElementById('app'));
