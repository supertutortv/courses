import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { DataState } from './courses/StateContext'
import Header from './Header'
import Course from './courses/Course'
import Dashboard from './Dashboard'

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data : JSON.parse(localStorage.getItem('stCourseData') || '{}'),
            loading : true
        }

        this.dataSaveLocal = this.dataSaveLocal.bind(this)
    }

    async componentDidMount() {
        _st.bodyClass = 'main'
        var obj = { loading: false }

        const dataEmpty = () => {
            for (var x in this.state.data) { return false }
            return true
        }

        if (dataEmpty()) await _st.http.get('/courses/data',(h) => obj.data = h.data)

        this.setState(obj,() => this.dataSaveLocal())
    }

    componentDidUpdate() {
        _st.loading = false
        {/* <div id="stAppVidBlock" className="z-depth-2"></div> */}
    }

    dataSaveLocal() {
        return localStorage.setItem('stCourseData',JSON.stringify(this.state.data))
    }

    render() {
        if (!this.state.data.length) return null

        return(
            <DataState.Provider value={this.state.data}>
                <div id="stAppInner">
                    <Header courseNav={true}/>
                    <main id="stAppStage" className={'row ' + this.state.loading ? 'loading' : 'active'}>
                        <Switch>
                            <Route exact path='/dashboard' component={Dashboard} />
                            <Route exact path='/:course/:section?/:third?/:fourth?/:fifth?' render={props => <Course {...props} />} />
                            <Route exact path='/' render={() => <Redirect to="/dashboard" />} />
                        </Switch>
                    </main>
                </div>
            </DataState.Provider>
        )
    }
}