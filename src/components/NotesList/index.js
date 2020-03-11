import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Note from '../Note';
import Header from '../Header';
import './NotesList.css';
import '../Header/Header.css';
import actions from '../../actions';

class NotesList extends Component {

    static defaultProps = {
        offset: 5,
    }

    state = {
        currentPage: +localStorage.getItem('CP') || 0
    }

    componentDidMount() {
        !this.props.list.length && this.props.actions.getNotes()
            .then(() => {
                if (!this.getPages().includes(this.state.currentPage + 1)) {
                    this.setState({
                        currentPage: 0
                    });
                }
            })
    }

    getPages = () => {
        const { list, offset } = this.props;
        let result = [];

        for (let i = 0; i < Math.ceil(list.length / offset); i++) {
            result.push(i + 1);
        }

        return result;
    }

    getList = () => {
        const { list, offset } = this.props;
        const { currentPage } = this.state;
        const start = currentPage * offset;
        
        return list.slice(start, start + offset);
    }

    handleChangePage = (id) => {
        return () => this.setState({
            currentPage: id
        });
    }

    handleDelete = (id) => {
        return this.props.actions.deleteNote(id);
    }

    render () {

        const { currentPage } = this.state;
        const pages = this.getPages();
        
        return (
            <div>
                <Header/>
                <div className="notes-list">
                    <Link to = '/creation' className="button">Создать</Link>
                    <div className="notes-list__notes">
                        <ul className = "notes-list__items">
                            {this.getList().map((data) => (
                                <Note
                                    key = {data.id}
                                    data = {data}
                                    onDelete = {this.handleDelete}
                                    actions = {this.props.actions}
                                />
                            ))}
                        </ul> 
                        <div className="notes-list__pagination">
                            {currentPage > 0 && (
                                <button
                                    onClick={this.handleChangePage(0)}
                                    className="notes-list__pagination_button"
                                >{'<<'}</button>
                            )}
                            {currentPage > 0 && (
                                <button
                                    onClick={this.handleChangePage(currentPage - 1)}
                                    className="notes-list__pagination_button"
                                >{'<'}</button>
                            )}
                            {pages.map((label, id) => (
                                <button
                                    key={id}
                                    onClick={this.handleChangePage(id)}
                                    className={`notes-list__pagination_button ${id === currentPage ? 'notes-list__pagination_button--selected' : ''}`}
                                >{label}</button>
                            ))}
                            {currentPage < pages.length - 1 && (
                                <button
                                    onClick={this.handleChangePage(currentPage + 1)}
                                    className="notes-list__pagination_button"
                                >{'>'}</button>
                            )}
                            {currentPage < pages.length - 1 && (
                                <button
                                    onClick={this.handleChangePage(pages.length - 1)}
                                    className="notes-list__pagination_button"
                                >{'>>'}</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ notes }) => ({
    list: notes
});

const mapDispatchToProps = (dispatch) => ({
    actions: actions(dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NotesList)