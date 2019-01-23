import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import App from './containers/App'

import TopMusic from './components/TopMusic'
import Donation from './components/Donation'

render(
  <BrowserRouter>
    <App>
      <Route path="List" component={TopMusic}/>
      <Route path="Donation" component={Donation}/>
    </App>
  </BrowserRouter>,
  document.getElementById('root')
)