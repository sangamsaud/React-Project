import React from 'react'
import { Component } from 'react';
import { Menuitems } from './Menuitems';
import './Navbar.css';
import About from '../../Pages/About';
class Navbar extends Component{
  state = {clicked:false};
  handelClick = ()=>{
    this.setState({clicked:!this.state.clicked})
  }
  render(){
    return(
      <nav className='Navbar'>
        <h1 className='navbar-logo'>Gantibya</h1>
        <div className='menu-icon'onClick={this.handelClick}>
          <i className={this.state.clicked ? "fas fa-times":"fas fa-bars"}></i>
       
        </div>
        <ul className={this.state.clicked ? "navbar-menu active":"navbar-menu"}>
      {Menuitems.map ((item,index) => {
        return(
          <li key={index}>
          <a className ={item.cName} href='/' > <i className={item.icon}></i>{item.title} </a>
          </li>
       
          )
      } )}
     
        </ul>

      </nav>
    )
  }
}
export default Navbar;