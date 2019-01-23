import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from '../components/Header'
import TopMusic from '../components/TopMusic'
import Donations from '../components/Donation'
import '../style/base.scss'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path='/list' component={TopMusic}/>
          <Route path='/donation' component={Donations}/>
          <Route path='/' component={TopMusic}/>
        </Switch>
      </div>
    )
  }
}
