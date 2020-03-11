import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from '../Header';
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';
import './NoteCreatePage.css';
import '../Note/Note.css';
import actions from '../../actions';

class NoteCreatePage extends Component {

    state = {
        title: '',
        text: '',
    }

    handleChange = ({ currentTarget }) => {
        this.setState({ [currentTarget.name]: currentTarget.value })
    }

    handleSubmit(event) {
        let title, text;
        event.preventDefault();
        return (
            title = this.state.title,
            text = this.state.text
        )
    }
    
    handleSubmit = this.handleSubmit.bind(this);

    handleAdd = () => {
        this.props.actions.addNote({
            title: this.state.title,
            text: this.state.text,
            id: Math.random(),
        }).then(() => {
            this.setState({
                title: '',
                text: '',
            });
        })
    }

    render() {

        return (
            <div className="notes-page">
                <Header/>
                    <Link to='/' className="button">Назад</Link>
                <form className="note-page__form" onSubmit={this.handleSubmit}>
                    <input
                        type="text" 
                        name="title" 
                        className="note__title note__title_input" 
                        placeholder="Введите заголовок"
                        autoComplete="off" 
                        value = {this.state.title} 
                        onChange = {this.handleChange} />
                    <textarea 
                        name="text" 
                        className="note__text note__text_input" 
                        rows="5" placeholder="Введите текст новой заметки" 
                        value = {this.state.text} 
                        onChange = {this.handleChange}>
                    </textarea>
                    <Link to='/' className="button" onClick={this.handleAdd}>Сохранить</Link>
                </form>
            </div>
        )

    }
}

const mapStateToProps = ({ notes }, { match }) => ({
    data: notes.find(({id}) => id === +match.params.id),
})

const mapDispatchToProps = (dispatch) => ({
    actions: actions(dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(NoteCreatePage));