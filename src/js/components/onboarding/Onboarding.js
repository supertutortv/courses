import React from 'react'
import TextureImg from './texture'

export default class Onboarding extends React.Component{
    constructor(props) {
		super(props)
		
		let saved = JSON.parse(localStorage.getItem('_stT-signup') || {})

        this.state = {
            active: props.plan || '',
			option: false,
			...saved
        }

        this.setActive = this.setActive.bind(this)
        this.setOption = this.setOption.bind(this)
	}
	
	componentDidMount() {
		_st.bodyClass = 'onboarding'
	}

    setActive(e) {
        e.preventDefault()
        this.setState({
            active: e.target.value,
            option: false
        })
    }

    setOption(e,op) {
        e.preventDefault()
        this.setState({
            option: op
        })
    }

    render() {
        let plans = _st.plans,
			{ಠ_ಠ,children} = this.props,
			{firstname} = this.state
			
        return (
			<main id={'__'+_st.randKey()} className="stOnboardingWindow">
				<section id="step1">
					<TextureImg/>
					<h3>Welcome{firstname ? ', '+firstname : ''}! Let's get started.</h3>
					{Object.keys(plans).map((pl) => {
						let pln = plans[pl],
							selected = this.state.active === pl ? 'selected' : ''
						return (
							<button name="item|value" className={selected} value={pln.value} onClick={this.setActive}>{pln.label}</button>
						)
					})}
				</section>
			</main>
        )
    }
}