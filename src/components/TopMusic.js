import React, { Component } from 'react'
import List from './List'
import axios from "axios"

export default class TopMusic extends Component {
  constructor() {
    super();

    this.state = {
      list: []
    };

    this.changeLike = this.changeLike.bind(this)
  }

  componentDidMount() {
    let token = localStorage.getItem('token');

    axios.post(`http://radio-app-api/getList`, {token: token})
      .then(res => {
        const list = res.data
        this.setState({ list })
      })
  }

  /* Todo обработка ошибок */
  changeLike(oldProps) {
    let newProps = this.state.list.find(x => x.id === oldProps.id);
    newProps['track_like'] = !!!newProps['track_like']
    this.setState({ newProps })
    let trackId = newProps['id']
    let type = newProps['track_like']
    let token = localStorage.getItem('token')

    axios.post(`http://radio-app-api/setTrackLike`, {token: token, type: type, trackId: trackId})
  }

  render() {
    const  listElem = this.state.list.map( list => {
      return <List list={list} key={list.id} changeLike={this.changeLike}/>
    })

    return (
      <table className={'top-table'}>
        <thead>
          <tr>
            <th></th>
            <th>Название</th>
            <th>Исполнитель</th>
            <th>Альбом</th>
            <th>Категория</th>
          </tr>
        </thead>
        <tbody>
          { listElem }
        </tbody>
      </table>
    )
  }
}