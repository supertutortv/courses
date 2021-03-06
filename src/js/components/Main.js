import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { DataState } from './courses/StateContext'
import Course from './courses/Course'
import Dashboard from './courses/Dashboard'
import STModal from './modal/STModal'

export default class Main extends React.Component {
    constructor(props) {
        super(props)

        let sCD = localStorage.getItem('stCourseData') || false

        this.state = {
            data: !sCD || JSON.parse(sCD),
            loading: true,
            modal: {
                open: false,
                action: 'downloads',
                orientation: 'centered',
                color: false,
                dismissable: false,
                mData: null,
                refr: null,
                test: '',
                xtraClass: ''
            }
        }

        this.dataSaveLocal = this.dataSaveLocal.bind(this)
        this.modalActive = this.modalActive.bind(this)
        this.setPlaylist = this.setPlaylist.bind(this)
        this.splicePlaylist = this.splicePlaylist.bind(this)
        this.addDl = this.addDl.bind(this)
        this.addHistory = this.addHistory.bind(this)
        this.updateSettings = this.updateSettings.bind(this)
        this.getData = this.getData.bind(this)

        //document.addEventListener( "contextmenu", (e) => e.preventDefault())
    }

    async componentDidMount() {
        
        let obj = { loading: false },
            upd = (this.state.data === true),
            time = Math.floor(Date.now() / 1000)

        if (upd) obj.data = await this.getData()

        if (this.state.data.refresh < time) return this.props.refresh(true)

        this.setState(obj,() => this.dataSaveLocal())
        _st.loading = false
    }

    componentDidUpdate() {
        _st.loading = false
    }

    async getData() {
        return await _st.http.get('/courses/data',(h) => (h.code === 'dataInvalid') ? setTimeout(this.getData(),h.retry) : h.data)
    }

    dataSaveLocal() {
        localStorage.setItem('stCourseData',JSON.stringify(this.state.data))
        return this
    }

    modalActive(modal = {}) {
        this.setState((state) => (Object.assign(state.modal,modal)))
        return this
    }

    setPlaylist(course,data) {
        this.setState((state) => {
            state.data.courses[course].playlist.push(data)
        }, () => this.dataSaveLocal())
    }

    splicePlaylist(course,dt,ind) {
        _st.http.del('/courses/data',dt,(d) => {
            if (d.code === 'resourceDeleteFail') return console.log(d)
        })
        this.setState(
            state => Object.assign(this.state.data.courses[course],{playlist: state.data.courses[course].playlist.filter((val,i) => i !== ind)}
        ), () => this.dataSaveLocal())
    }

    addDl(course,data) {
        this.setState((state) => {
            state.data.courses[course].downloads.push(data)
        }, () => this.dataSaveLocal())
    }

    addHistory(course,obj) {
        this.setState((state) => {
            state.data.courses[course].history.push(obj.vidid)
        }, () => this.dataSaveLocal())
    }

    updateSettings(setting,val) {
        let obj = {[setting]:val}
        _st.http.put('/courses/data/settings',obj,(d) => {
            this.setState((state) => {
                return Object.assign(state.data.user.settings,obj)
            }, () => this.dataSaveLocal())
        })
    }

    render() {
        if (this.state.data === true) return null
        return(
            <DataState.Provider value={this.state.data}>
                <Switch>
                    <Redirect exact from='/dashboard' to='/' />
                    <Route exact path='/' render={
                        props => <Dashboard {...props} {...this.props.location.state} modalActive={this.modalActive} refreshData={this.props.refresh}/>
                    } />
                    <Route exact path='/:courses/:collections?/:collection?/:tests?' render={props => <Course 
                        refreshData={this.props.refresh} 
                        addHistory={this.addHistory} 
                        setPlaylist={this.setPlaylist} 
                        splicePlaylist={this.splicePlaylist} 
                        modalActive={this.modalActive} 
                        updateSettings={this.updateSettings} 
                        {...props} 
                    />} />
                    <Route exact path='/playlists/:playlist?' render={props => <Course modalActive={this.modalActive} {...props} />} />
                    <Route path="*" component={null} />
                </Switch>
                <STModal {...this.state.modal} addDl={this.addDl} modalActive={this.modalActive} >
                    {this.state.modal.mData}
                </STModal>
            </DataState.Provider>
        )
    }
}