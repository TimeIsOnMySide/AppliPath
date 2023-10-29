// ConfirmDeletePopup.js
import React from 'react';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ConfirmDeletePopup = ({
    open,
    handleConfirmDelete,
    handleCancelDelete,
}) => {
    return (
        <Popup
            open={open}
            modal
            trigger={
                <button className="btn btn-danger btn-delete">
                    <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: '#ffffff' }}
                    />
                </button>
            }
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
