import React from 'react';
import style from './Loading.module.css';

class Loading extends React.Component {

    _prevent = (e) => {
        e.stopPropagation();
    };

    render () {
        return (
            <div className={style.loadingdiv} onClick={(e) => this._prevent(e)}
                 onDoubleClick={(e) => this._prevent(e)}>
                <p>Loading data...</p>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        );
    }
}

export default Loading