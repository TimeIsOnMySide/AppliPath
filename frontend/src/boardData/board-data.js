// this is the data for the boards so that react-beautiful-dnd can track the columns.
// Later, I can add this as a boardSchema for mongoDB so the user can also
// edit (add / delete / reorder) the boards)
//My first concern is getting drag and drop to work so im going to tackle that challenge first!

const boardData = {
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Need to Apply',
            jobCardIds: [],
        },
        'column-2': {
            id: 'column-2',
            title: 'Applied',
            jobCardIds: [],
        },
        'column-3': {
            id: 'column-3',
            title: 'Interview',
            jobCardIds: [],
        },
        'column-4': {
            id: 'column-4',
            title: 'Offer Received',
            jobCardIds: [],
        },
        'column-5': {
            id: 'column-5',
            title: 'Rejected',
            jobCardIds: [],
        },
    },
    columnOrder: ['column-1', 'column-2', 'column-3', 'column-4', 'column-5'],
};

export default boardData;
