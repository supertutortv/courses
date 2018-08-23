import React, {Component} from 'react'
import {Route} from 'react-router-dom'

const STRoute = ({component, ...props}) => {
    const STComp = component
    return (
        <Route {...props} render={rtProps => {
            <STComp {...rtProps} {...props}/>
        }} />
    )
}

export default STRoute