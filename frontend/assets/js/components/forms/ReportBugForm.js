import React from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';
import {getDjangoCookie} from "../../resources/getDjangoCookie.js"

const formFieldsStyle = {
    "width": "870px",
    "marginLeft": "15px",
    "marginTop": "15px",
};
const titleFieldStyle = {
    "height": "45px",
};
const descriptionFieldStyle = {
    "height": "150px",
};

export default class ReportBugForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  submitBug(data){
    const game_pk = this.props.game_pk

    var data_json = JSON.stringify(data)
    var csrftoken = getDjangoCookie('csrftoken');

    fetch(`/api/games/${game_pk}/report_bug/`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: data_json
    });
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
      this.submitBug(data);
    }
  }

  render() {
      return (
        <Modal trigger={this.props.button}>
          <div style={formFieldsStyle}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input label="Título" name="title" type="text" style={titleFieldStyle} /> 
              <Form.TextArea label="Descrição" name="description" type="text" style={descriptionFieldStyle}/> 
              <Button size="medium" type="submit" primary>Reportar Bug</Button>
            </Form>
          </div>
        </Modal>
      );
  }
}
