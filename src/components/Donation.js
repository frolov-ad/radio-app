import React, { Component } from 'react'
import axios from "axios";

export default class Donations extends Component {
  constructor() {
    super()

    this.range = this.range.bind(this)
    this.setDonate = this.setDonate.bind(this)
  }

  componentDidMount() {
    axios.get(`http://radio-app-api/getDonationSum`)
      .then(res => {
        this.setState({maxSum: 1000 - res.data});
      })

    if(localStorage.getItem('donationSum'))
      this.setState({donationSum: localStorage.getItem('donationSum')});
  }

  state = {
    donationSum: 1,
    currentSum: 0,
    maxSum: 0
  }

  range(event) {
    let sum = 0
    event.target.value > this.state.maxSum ? sum = this.state.maxSum - this.state.currentSum : sum = event.target.value

    this.setState({donationSum: sum});
    localStorage.setItem('donationSum', sum)
  }

  setDonate() {
    axios.post(`http://radio-app-api/setDonationSum`, this.state.donationSum)
      .then(res => {

        this.setState({maxSum: this.state.maxSum - this.state.donationSum});
      })
  }

  render() {
    let rangeStyle = {background: '-webkit-linear-gradient(left ,#4DA0E1 0%,#4DA0E1 '+(this.state.donationSum/this.state.maxSum)*100+'%,#fff '+(this.state.donationSum/this.state.maxSum)*100+'%, #fff 100%)'};

    return (
      <div className='container'>
        <div className={'donation-block'}>
          <div className={'donation-header'}>
            {this.state.maxSum - this.state.donationSum}$ still needed for this project
          </div>
          <div className={'donation-body'}>
            <input type="range"
                   style={rangeStyle}
                   className={'donation-range-input'}
                   value={this.state.donationSum}
                   onChange={this.range}
                   min={this.state.currentSum}
                   max={this.state.maxSum}
            />
            <p>
              join the <b>42</b> other donors who have already supported this project. Every dollars helps.
            </p>
            <div className={'flex-row'}>
              <input type={'number'}
                     className={'donation-number-input'}
                     value={this.state.donationSum}
                     onChange={this.range}
                     min={this.state.currentSum}
                     max={this.state.maxSum - this.state.donationSum}/>
              <button type={'button'} onClick={this.setDonate}>Give Now</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}