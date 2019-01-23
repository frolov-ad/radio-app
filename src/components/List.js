import React, { Component } from 'react'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

library.add(faHeart)

export default class List extends Component {

  render() {
    let className = 'like-btn';
    if (this.props.list['track_like']) {
      className += ' active';
    }

    return (
      <tr>
        <td>
          <img src={this.props.list['img']} alt={'img'} />
        </td>
        <td className={'track-name'}>
          {this.props.list['name']}
        </td>
        <td>
          {this.props.list['artist']}
        </td>
        <td className={'album-name'}>
          {this.props.list['album']}
        </td>
        <td>
          {this.props.list['category_name']}
        </td>
        <td>
          <FontAwesomeIcon icon="heart" className={className} onClick={this.props.changeLike.bind(this, this.props.list)}/>
        </td>
      </tr>
    )
  }
}