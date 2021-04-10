import React from 'react'
import PropTypes from 'prop-types'
import Button from './button'
import {useLocation} from 'react-router-dom'


const Header = (props) => {
    const location = useLocation()
    return (
        <header className='header'>
            <h1>{props.title}</h1>
            {location.pathname === '/' && <Button className='btn' color='black' text = {props.showAdd? 'Close' : 'Add'}
            onClick={props.onShowAdd}></Button>
     } </header>
    )
}
Header.defaultProps = {
    title:"hello"
}
Header.propTypes ={
    title : PropTypes.string.isRequired
}
export default Header
