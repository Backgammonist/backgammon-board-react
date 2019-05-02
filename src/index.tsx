import * as React from 'react';

export interface BoardProps { compiler: string; framework: string; }

export default class Board extends React.Component<BoardProps, {}> {
    render() {
        return <h1>Boarder</h1>;
    }
}