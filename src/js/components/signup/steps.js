import React from 'react'
import {Link,Route,Switch,Redirect} from 'react-router-dom'
import Payment from './payment'

const Account = ({ createAccount, updateInp, error, state }) => {
    var msg = (error.message.match(/already in use/)) ? <strong>{error.message}<Link to='/login'>{'Sign in'}</Link></strong> : <strong>{error.message}</strong>
    let { item } = state
    return (
        <main className="stSignupAccount">
            <div className="stSignupInner">
                <form role="form" className="stAccountForm" onSubmit={createAccount}>
                    <header className="heading">
                        <h1>SupertutorTV</h1>
                    </header>
                    <section className="stC2A">
                        <h2>Sign up for free right now to get started on your test prep journey!</h2>
                    </section>
                    <fieldset className="stAccountBody">
                        <div className="stIfR99">
                            <input autocomplete="off" aria-label="Student First Name" type="text" name="customer|account|firstname" onBlur={updateInp} required />
                            <label aria-hidden="true" for="customer|account|firstname">Student First Name</label>
                        </div>
                        <div className="stIfR99">
                            <input autocomplete="off" aria-label="Student Last Name" className="browser-default validate" type="text" name="customer|account|lastname" onBlur={updateInp} required/>
                            <label aria-hidden="true" for="customer|account|lastname">Student Last Name</label>
                        </div>
                        <div className="stIfR99">
                            <input autocomplete="off" aria-label="Student Email" className="browser-default validate email" type="email" name="customer|account|email" onBlur={updateInp} required validation="email"/>
                            <label aria-hidden="true" for="customer|account|email">Student Email</label>
                        </div>
                        <div className="stIfR99">
                            <input autocomplete="off" aria-label="Password" className="browser-default validate" type="password" name="customer|account|password" onBlur={updateInp} required/>
                            <label aria-hidden="true" for="customer|account|password">Password</label>
                        </div>
                    </fieldset>
                    <div className="stAccountButtons">
                        <button type="submit" className="stAccountButton btn" ><span>Create Your Account</span></button>
                    </div>
                    <div className="stAccountErrors">{msg}</div>
                </form>
                <code className="insteadLogin">Already have an account? <Link to='/login'>{'Log In'}</Link></code>
            </div>
        </main>
    )
}

const ThankYou = ({state,hist}) => {
    return (
        <div className="stSignupThankYou stSignupStep">
            <h1>Thank you!</h1>
            <div class="stSignupInner stFormWrapper">
                <div className="row">Your order code is <strong>{state.thankYou.id}</strong>. Keep this for your records.</div>
                <div className="row">
                    <div className="stuff">
                        <span>You will receive a payment receipt when your card is charged, either after your trial expires or very soon if you skipped the trial. You will also receive a welcome email with instructions for using the course. Or if you'd like to get started right now, just click the button below.</span>
                    </div>
                </div>
                <div className="stFormButtons">
                    <button id="stBtn_thankyou" className="stFormButton btn waves-effect waves-light" onClick={() => hist.replace('/dashboard')}>Go to dashboard</button>
                </div>
            </div>
        </div>
    )
}

export { Account, Payment, ThankYou }