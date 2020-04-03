import React from 'react';
import style from './Loading.module.css';

class Loading extends React.Component {
    render () {
        return (
            <div className={style.loadingdiv}>
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