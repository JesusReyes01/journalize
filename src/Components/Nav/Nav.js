import React from 'react'
import {Link} from 'react-router-dom'

function Nav() {
    return (
        <div>
            <Link to='/dashboard'>Home</Link>
            <Link to='/new'>New Entry</Link>
            <Link to='/'>Logout</Link>
        </div>
    )
}

export default Nav;