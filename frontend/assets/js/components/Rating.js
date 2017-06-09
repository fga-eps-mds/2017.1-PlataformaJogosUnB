import React from 'react';

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

    constructor(props){
        super(props);
    }

    handleVote(vote, event_click){
        var json_parser = JSON.stringify({
            vote:  vote,
            email_voter: 'your@mail.com',
          });
        var csrftoken = getCookie('csrftoken');
        fetch('/api/vote/1/', {
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
                <label onClick={this.handleVote.bind(this, true)}><h1>play</h1></label>
                <label onClick={this.handleVote.bind(this, false)}><h1>unplay</h1></label>
            </div> 
        );
    }
}
