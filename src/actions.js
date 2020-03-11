export default (dispatch) => ({

    getNotes() {
        return fetch('/notes.json').then((response) => {
            return response.json().then((data) => {
                dispatch({
                    type: 'GET',
                    data
                });
            })
        });
    },

    addNote(data) {
        return new Promise((resolve) => {
            dispatch({
                type: 'ADD',
                data,
            });
            resolve();
        })
    },

    editNote(data) {
        return new Promise((resolve) => {
            dispatch({
                type: 'EDIT',
                data,
            });
            resolve();
        })
    },

    deleteNote(id) {
        return new Promise((resolve) => {
            dispatch({
                type: 'DELETE',
                data: id,
            });
            resolve();
        })
    }
})