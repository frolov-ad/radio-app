import React, { Component } from 'react'
import axios from "axios";

export default class LoginModal extends Component {
  constructor() {
    super()

    this.state = {
      name: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  login() {
    if(this.state.name === '' || this.state.password === '')
      return false;
    axios.post(`http://radio-app-api/login`,{name: this.state.name, password: this.state.password})
      .then(res => {
        localStorage.setItem('token', res.data);
        window.location.reload()
      })
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({[name]: event.target.value})
  }

render() {
    return (
      <div className={'login-modal'}>
        <div>
          <label>Имя:</label>
          <input name="name" type={'text'} value={this.state.name} onChange={this.handleChange} maxLength={'20'}/>
        </div>
        <div>
          <label>Пароль:</label>
          <input name="password" type={'password'} value={this.state.password} onChange={this.handleChange} maxLength={'20'}/>
        </div>
        <div>
          <button onClick={this.login}>Войти</button>
        </div>
      </div>
    )
  }
}