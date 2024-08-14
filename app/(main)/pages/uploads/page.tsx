import React from 'react';
import FileListCards from "../../uikit/cards/page"

const Uploads = () => {
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Uploads</h5>
                    <p>List of all files uploaded</p>
                </div>
            </div>
            <div className="col-12">
                
                    <FileListCards />
            </div>
        </div>
    );
};

export default Uploads;
