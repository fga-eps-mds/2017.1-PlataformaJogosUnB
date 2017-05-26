import React from 'react';

export default class Game extends React.Component{
  constructor(props){
    super(props);
    this.state = { game: {}};
  }

  loadGameFromServer(){
    console.log(this.props);
    const id = this.props.match.params.id;
    console.log(id)
        fetch("/api/detail/"+id+"/",
              {
                headers: new Headers({ "Content-Type": "application/json", "Accept": "application/json"}),
                method: "GET",
            })
        .then((response) => {
             return response.json();
            })
        .then(((game) => {
            this.setState({ game: game });
        }).bind(this))
        .catch((error) => {
            console.error(error);
        });
  }

  componentDidMount() {
        this.loadGameFromServer();
    }

  render(){
    return (
      <div>
        <h1>{this.state.game.name} - v{this.state.game.version}</h1>
      </div>
    );
  }
}
