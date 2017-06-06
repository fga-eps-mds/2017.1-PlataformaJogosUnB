import React from 'react';

export default class Rating extends React.Component {

    constructor(props){
        super(props);
    }

    handleVote(event_click, vote){
        console.log(event_click);
        console.log(vote);
        //fetch("/api/information/votes", {});
    }

    render(){
        return (
            <div>
                <label onClick={this.handleVote.bind(this, true)}><h1>play</h1></label>
                <label onClick={this.handleVote.bind(this, false)}><h1>unplay</h1></label>
            </div> 
        );
    }
}
