// ConfirmDeletePopup.js
import React from 'react';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ConfirmDeletePopup = ({ open, handleConfirmDelete }) => {
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
            {(close) => (
                <div className="confirm-delete-popup">
                    <p className="confirm-delete-text">
                        Are you sure you want to delete this job?
                    </p>
                    <span>
                        <button
                            onClick={handleConfirmDelete}
                            className="btn btn-primary"
                        >
                            Yes, Delete
                        </button>
                        <button
                            onClick={() => {
                                close();
                            }}
                            className="btn btn-danger btn-cancel-delete"
                        >
                            Cancel
                        </button>
                    </span>
                </div>
            )}
        </Popup>
    );
};

export default ConfirmDeletePopup;
