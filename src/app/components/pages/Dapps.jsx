/* eslint-disable import/no-import-module-exports */
import React from 'react';
import DappsList from '../cards/DappsList';

class Dapps extends React.Component {
    render() {
        return (
            <div className="text-center">
                <h2>dApps and Tools on Blurt Ecosystem</h2>
                <hr />
                <div className="row">
                    <div className="column">
                        <DappsList />
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = {
    path: 'dapps',
    component: Dapps
};
