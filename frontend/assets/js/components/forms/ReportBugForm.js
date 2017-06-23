import React, {PropTypes} from 'react';
import {Modal, Button, Form, Message, Segment } from 'semantic-ui-react';
import {getDjangoCookie} from "../../resources/getDjangoCookie.js"

export default class ReportBugForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      'heard_text': ['Reporte Bug'],
      'info_text': ['Insira as informações nos campos abaixo.'],
      'message_color': true,
    }
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

  changeStates(header,info,color){
    this.setState({
        heard_text: [header],
        info_text: [info],
        message_color: color
      })
  }

  validateTitle(title){
    if(title.length > 0 && title.length < 120){
      return true
    }else{
      this.changeStates(
        ['Erro de submissão'],
        ['O título do bug não pode estar em branco e deve possuir no máximo 120 caracteres.'],
        false
      )
      return false
    }
  }

  validateDescription(description){
    if(description.length > 0 && description.length < 250){
      return true
    }else{
      this.changeStates(
        ['Erro de submissão'],
        ['A descrição do bug não pode estar em branco e deve possuir no máximo 250 caracteres.'],
        false
      )

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
      this.changeStates(
        ['Sucesso ao reportar bug'],
        ['O bug foi reportado com sucesso.'],
        true
      )
      this.submitBug(data);
    }
  }

  render() {
      return (
        <Modal trigger={this.props.button}>
            <Segment>
              <Message
                error = {!this.state.message_color}
                info = {this.state.message_color}
                header={this.state.heard_text}
                list={this.state.info_text}
              />
              <Form onSubmit={this.handleSubmit}>
                <Form.Input label="Título do Bug" name="title" type="text" placeholder='Ex: Jogo sem som'/>
                <Form.TextArea label="Descrição" name="description" type="text" placeholder='Ex: Na fase 3 o jogo não apresenta sons.'/>
                <Button size="medium" type="submit" primary>Reportar Bug</Button>
              </Form>
            </Segment>
        </Modal>
      );
  }
}

ReportBugForm.propTypes = {
  game_pk: PropTypes.number.isRequired,
  button: PropTypes.element.isRequired
}
