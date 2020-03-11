import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import NotesList from './NotesList';
import './NotesList/NotesList.css';
import NoteCreatePage from './NoteCreatePage';
import store from '../store';

export default class App extends Component {
    render() {
        return (
            <div className="notes-page">
                <Provider store={store}>
                    <BrowserRouter>
                        <Switch>
                            <Route path="/" exact component={NotesList}/>
                            <Route path="/creation" component={NoteCreatePage}/>
                        </Switch>
                    </BrowserRouter>
                </Provider>
            </div>
        );
    }
}