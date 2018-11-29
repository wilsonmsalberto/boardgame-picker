import React, { Component } from 'react';

export default class List extends Component {
    render() {
        const { items } = this.props;

        if (!items || items.length === 0) {
            return (<div>No games yet</div>);
        }

        return (
            <ul>
                {
                    items.map((item, idx) => {
                        return <li key={ idx }>{ item.names.primary }</li>
                    })
                }
            </ul>
        )
    }
}
