import React from 'react';
import { Button } from "semantic-ui-react";

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
    }

    handleVote(vote, event_click){
        const id = this.props.game;

        var json_parser = JSON.stringify({
            vote:  vote,
            email_voter: 'your@mail.com',
          });
        
        var csrftoken = getCookie('csrftoken');
        
        fetch(`/api/vote/${id}/`, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
          },
          body: json_parser
        }).then((r) => {console.log(r); return r.json()})
          .then((r) => {console.log(r)})
          .catch((e) => { console.log(e)});
    }

    render(){
        return (
             <div>
                <Button
                  content='Like'
                  icon='thumbs outline up'
                  label={{ as: 'a', basic: true, content: '1,024' }}
                  labelPosition='right'
                  onClick={this.handleVote.bind(this, true)}
                />
                <Button
                  content='Dislike'
                  icon='thumbs outline down'
                  label={{ as: 'a', basic: true, pointing: 'right', content: '2,048' }}
                  labelPosition='left'
                  onClick={this.handleVote.bind(this, false)}
                />
            </div> 
        );
    }
}
