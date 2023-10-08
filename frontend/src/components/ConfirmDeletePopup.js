// ConfirmDeletePopup.js
import React from 'react';
import Popup from 'reactjs-popup';

const ConfirmDeletePopup = ({
    open,
    handleConfirmDelete,
    handleCancelDelete,
}) => {
    return (
        <Popup
            open={open}
            modal
            trigger={<button className="btn btn-primary">Delete</button>}
            closeOnDocumentClick={false}
        >
            <div>
                <p>Are you sure you want to delete this job?</p>
                <button onClick={handleConfirmDelete}>Yes, Delete</button>
                <button onClick={handleCancelDelete}>Cancel</button>
            </div>
        </Popup>
    );
};

export default ConfirmDeletePopup;
