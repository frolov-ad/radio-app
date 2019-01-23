import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import LoginModal from './LoginModal'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faDonate } from '@fortawesome/free-solid-svg-icons'

library.add(faList, faDonate)

export default class Donations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginModal: false,
      isAuth: false
    };

    this.changeLoginModal = this.changeLoginModal.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
    this.logout = this.logout.bind(this);
  }

  checkAuth() {
    if(localStorage.getItem('token')) {
      this.setState({ isAuth: true });
      this.setState({ loginModal: false });
    }
    else
      this.setState({ isAuth: false });
  }

  changeLoginModal() {
    this.setState(prevState => ({ loginModal: !prevState.loginModal }));
  }

  componentDidMount() {
    this.checkAuth();
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload()
  }

  render() {
    let loginModal;
    let loginBtn;

    if(this.state.isAuth)
      loginBtn = <button className={'login-btn'} onClick={this.logout}>Выйти</button>
    else
      loginBtn = <button className={'login-btn'} onClick={this.changeLoginModal}>Войти</button>

    if(this.state.loginModal)
      loginModal = <LoginModal checkAuth={this.checkAuth}/>

    return (
      <header>
        <NavLink activeClassName="active" to='/list'>
          <FontAwesomeIcon icon="list" className={'header-ico'}/>
          топ 100
        </NavLink>
        <NavLink activeClassName="active" to='/donation'>
          <FontAwesomeIcon icon="donate" className={'header-ico'}/>
          помощь проекту
        </NavLink>
        {loginBtn}
        {loginModal}
      </header>
    )
  }
}