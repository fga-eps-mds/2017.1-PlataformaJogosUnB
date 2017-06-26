import React from 'react';
import { Button,Label } from "semantic-ui-react";

/** Django method to get csrf token */
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export default class Rating extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            "likes": 0,
            "dislikes": 0
        }
        this.getVoteCount = this.getVoteCount.bind(this);
    }

    componentWillReceiveProps() {
        this.getVoteCount();
    }

    getVoteCount() {
        const game_id = this.props.pk;

        fetch(`/api/vote/${game_id}/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then((response) => {
            return response.json();
        })
        .then(((vote) => {
            this.setState(vote);
        }).bind(this))
        .catch((error) => {
            console.error(error);
        });
    }


    handleVote(vote, event_click){
        const game_id = this.props.pk;

        var json_parser = JSON.stringify({
            vote:  vote,
        });

        var csrftoken = getCookie('csrftoken');

        fetch(`/api/vote/${game_id}/`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: json_parser,
            redirect: 'follow'
        }).then((r) => {console.log(r); return r.json()})
          .then(this.getVoteCount)
          .catch((e) => { console.log(e)});

    }

    mountLikeButton(color, value, thumbs, labelPosition, likeState){
        return (<Button
                    color={color}
                    icon={thumbs}
                    label={<Label style={{ backgroundColor: "#22242b"}}><font color="white">{likeState}</font></Label>}
                    labelPosition={labelPosition}
                    onClick={this.handleVote.bind(this, value)}
                />)
    }
    render(){
        return (
            <div>
                <Button.Group size='tiny' floated='right'>
                    {this.mountLikeButton("green", true, "thumbs up", "right", this.state.likes)}
                    {this.mountLikeButton("red", false, "thumbs down", "left", this.state.dislikes)}
                </Button.Group>
            </div> 
        );
    }
}
