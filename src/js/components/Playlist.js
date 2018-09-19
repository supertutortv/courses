import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Switch, Route, Redirect, Link } from 'react-router-dom'

const PlSidebar = ({collection}) => {
    let len = Object.keys(collection).length
    if ('tips' in collection) console.log(collection.tips)
    
    return (
        <div>{JSON.stringify(collection)}</div>
    )
}

export default class Playlist extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            activeVid: ''
        }
    }

    componentDidMount() {}

    render() {
        const { loc, hist, match, obj } = this.props

        const sbStyle = {
            backgroundColor: obj.color
        }
        
        return (
            <section className="stPlaylistRoot">
                <div className="stPlaylistInner">
                    <div className="stPlaylistColA">
                        <figure className="stVideoStage">
                            <header className="stVideoHeader"></header>
                            <div className="stVideoContainer">
                                <div className="stVideoPlayer"></div>
                            </div>
                            <figcaption className="stVideoCaption">
                                <div className="stVideoTitle">
                                    <h1>{obj.name}</h1>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                    <div className="stPlaylistColB">
                        <section className="stPlaylistSidebar" style={sbStyle}>
                            <div className="stPlaylistSidebarInner">
                                <PlSidebar collection={this.props.obj.collection} />
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        )
    }
}