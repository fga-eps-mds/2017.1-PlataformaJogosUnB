import React, { Component} from 'react';
import { Button, Form } from 'semantic-ui-react';

//TODO generalize below method to be imported and used here and on Rating
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


export default class ReportBugForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  submitBug(data, form){
    const game_pk = this.props.game_pk

    var data_json = JSON.stringify(data)
    var csrftoken = getCookie('csrftoken');

    fetch(`/api/reportbug/${game_pk}/`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: data_json
    });

    console.log("PASSOUUU ATEH O FINALL")
  }


  validateTitle(title){
    if(title.length > 0 && title.length < 120){
      return true
    }else{
      alert('O título do bug não pode estar em branco e deve possuir no máximo 120 caracteres.')
      return false
    }
  }

  validateDescription(description){
    if(description.length > 0 && description.length < 250){
      return true
    }else{
      alert('A descrição do bug não pode estar em branco e deve possuir no máximo 250 caracteres.')
      return false
    }
  }

  validate(data){
    return this.validateTitle(data.title) && this.validateDescription(data.description)
  }

  handleSubmit(submitEvent){
    submitEvent.preventDefault();
    const form = submitEvent.target;
    const data = {
      title: form[0].value,
      description: form[1].value
    };

    if(this.validate(data)){
      alert('O bug foi reportado com sucesso');
      this.submitBug(data, form);
    }
  }

  render() {
      return (
          <Form onSubmit={this.handleSubmit}>
            <Form.Input label="Title" name="title" type="text"/> 
            <Form.TextArea label="Description" name="description" type="text"/> 
            <Button size="medium" type="submit" primary>Reportar Bug</Button>
          </Form>
      );
  }
}
