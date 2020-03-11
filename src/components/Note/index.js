import React, {Component} from 'react';
import './Note.css';
import '../NotesList/NotesList.css';

export default class Note extends Component {
    
    state = {
        isOpen: false,
        isEdit: false,
        title: '',
        text: '',
    }

    render() {
        const {data, onDelete, actions} = this.props;
        const {isOpen, isEdit, title, text} = this.state;
        const noteText = this.state.isOpen && <section className="note__text">{data.text}</section>;
        return (
            <li className="notes-list__items_item">
                <div className = "note__title_buttons">
                    <button className="button" onClick = {this.handleOpen}>
                        {!this.state.isOpen ? 'Читать' : 'Закрыть'}
                    </button>
                    <button className="button" onClick={this.handleToggleEdit}>{isEdit ? 'Отменить' : 'Изменить'}</button>
                    {isEdit ? (<button className="button" onClick={this.handleEdit}>Сохранить</button>) : null}
                    <button className="button" onClick={() => onDelete(data.id)}>Удалить</button>
                </div>
            {isEdit ? (
                <form className="note__form-edit">
                    <input
                        type="text" 
                        name="title" 
                        className="note__title note__title_input" 
                        autoComplete="off" 
                        value = {title} 
                        onChange = {this.handleChange}>
                    </input>
                    <textarea 
                        name="text" 
                        className="note__text note__text_input" 
                        rows="5"
                        value = {text} 
                        onChange = {this.handleChange}>
                    </textarea>
                </form>
            ) : (
                <div>
                    <h2 className="note__title">
                        {data.title}
                    </h2>
                    {noteText}
                </div>
            )}
            </li>
        )
    }

    handleOpen = () => {
        this.setState(({ isOpen }) => ({
            isOpen: !isOpen
        }))
    };

    handleToggleEdit = () => {
        this.setState(({ isEdit }) => ({
            isEdit: !isEdit,
            title: this.props.data.title,
            text: this.props.data.text
        }))
    };

    handleChange = ({ currentTarget }) => {
        this.setState({ [currentTarget.name]: currentTarget.value })
    }

    handleEdit = () => {
        this.props.actions.editNote({
            ...this.props.data,
            text: this.state.text,
            title: this.state.title,
        }).then(() => {
            this.handleToggleEdit();
        })
    }
}