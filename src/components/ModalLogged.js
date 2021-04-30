import React, { Children } from 'react';

const ModalLogged = ({ id='modalLogged', onClose= () => {}, children }) => {
    
    const handleOutsideClick = (e) => {
        if(e.target.id === id)  onClose();
    };
    
    return (
        <div id= "modalLogged" className="modalLogged" onClick={handleOutsideClick}>
            <div className="container">
                <button className="close" onClick={onClose}/>
                <div className="content">{children}</div>
            </div>
        </div>
    );
};

export default ModalLogged;