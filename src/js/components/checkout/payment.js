import React from 'react'
import {injectStripe, CardElement} from 'react-stripe-elements'
import CountryDD from './pieces/CountryDD'
import PricingTable from './pieces/PricingTable'

const _Payment = ({updateInp, updatePrice, submitPayment, state, toPrice, error, stripe, setChecker, setShipping, calculatePricing, setOutcome}) => {
    var trialDate = new Date()
    trialDate.setDate(trialDate.getDate() + 5)
    if (state.plan === null) state.plan = state.item.plans[0]
    calculatePricing()
    return (
        <div className="stSignupStep stSignupPayment">
            {/* <CardElement onChange={(e)=>console.log(e, auth.plan)} /> */}
            <div className="stSignupPaymentBottom">
                <h1>Set up your payment.</h1>
            </div>
            <div className="stSignupInner">
                <div className="stInfoWrap">
                    <form className="stFormWrapper stSignupBlock" onSubmit={(e) => submitPayment(e,stripe)}>
                        <div className="stSignupPaymentForm">
                            <div className="stSignupFormOptions">
                                <legend>Options</legend>
                                <div className="input-field">
                                    <div class="dddesc">Choose your plan (dropdown menu):</div>
                                    <select className="browser-default " name="subPlan" onChange={updatePrice}>
                                        <option value disabled selected>Choose Your Plan...</option>
                                        {state.item.plans.map((p,i) => {
                                            let selected = i === 0 ? {selected: true} : {}
                                            return (
                                                <option value={i} {...selected}>{p.product+'/'+p.nickname+' - $'+(p.amount/100).toString()}</option>
                                            )
                                        })}
                                    </select>
                                    {/* <fieldset id="subPlan">
                                        {state.item.plans.map((p,i) => {
                                            let checked = i === 0 ? {checked: true} : {}
                                            return (
                                                <label>
                                                    <input type="radio" value={i} name="subPlan" onChange={updatePrice} {...checked} />
                                                    {p.product+'/'+p.nickname+' - $'+(p.amount/100).toString()}
                                                </label>
                                            )
                                        })}
                                    </fieldset> */}
                                    {/* <select defaultValue="" className="browser-default " name="subPlan" onChange={updatePrice}>
                                        <option value="" disabled>Choose Your Plan...</option>
                                        
                                    </select> */}
                                </div>
                                <div className="input-field">
                                    <input name="customer|options|priorityShip" className="filled-in" type="checkbox" onChange={setShipping}/>
                                    <label for="customer|options|priorityShip"><span>I want Priority Shipping (+${(state.item.metadata.priship/100).toFixed(2)}, U.S. only)</span></label>
                                </div>
                                <div className="input-field">
                                    <input name="customer|options|doTrial" className="filled-in" type="checkbox" onChange={updateInp} />
                                    <label for="customer|options|doTrial"><span>Check this box for a 5 day limited access free trial <span>(expires <strong>{trialDate.toLocaleDateString()})</strong></span></span></label>
                                </div>
                            </div>
                            <div className="stSignupFormShipping">
                                <legend>Shipping</legend>
                                <div className="formBuffer">
                                    <div className="input-field required">
                                        <input className="browser-default validate shipping address_line1" type="text" name="customer|shipping|address|line1" placeholder="Address 1" onBlur={updateInp} required/>
                                    </div>
                                    <div className="input-field">
                                        <input className="browser-default validate shipping address_line2" type="text" name="customer|shipping|address|line2" placeholder="Address 2" onBlur={updateInp} />
                                    </div>
                                    <div className="input-field required">
                                        <input className="browser-default validate shipping address_city" type="text" name="customer|shipping|address|city" placeholder="City" onBlur={updateInp} required/>
                                    </div>
                                    <div className="input-field required">
                                        <input className="browser-default validate shipping address_state" type="text" name="customer|shipping|address|state" placeholder="State" onBlur={updateInp} required/>
                                    </div>
                                    <div className="input-field required">
                                        <input className="browser-default validate shipping address_zip tax" type="text" name="customer|shipping|address|postal_code" placeholder="Postal Code" onBlur={updateInp} required/>
                                    </div>
                                    <div className="input-field required">
                                        <CountryDD className="browser-default validate shipping address_country" name="customer|shipping|address|country" onBlur={updateInp} required/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="stSignupPricing">
                            <legend>Payment</legend>
                            <div className="formBuffer">
                                <div className="input-field required">
                                    <input className="browser-default validate" type="text" name="customer|nameOnCard" placeholder="Name on card" onBlur={updateInp} required/>
                                </div>
                                <div className="input-field required">
                                    <input className="browser-default validate required" type="tel" name="customer|shipping|phone" placeholder="Phone #" onBlur={updateInp} required />
                                </div>
                                <div id="stPricingCardElement" className="row"><CardElement onChange={setOutcome} /></div>
                                <div className="stTermsRow">
                                    <input id="stTermsBox" name="customer|options|terms" className="filled-in" value="1" type="checkbox" onChange={setChecker} required/>
                                    <label><span>I have read SupertutorTV's <a href="https://supertutortv.com/terms-and-conditions" target="_blank">Terms & Conditions</a></span></label>
                                </div>
                                <div className="stMailList">
                                    <input name="customer|options|mailingList" className="filled-in" value="1" type="checkbox" onChange={setChecker} />
                                    <label><span>Add me to your mailing list for future discounts and offers</span></label>
                                </div>
                                <div className="stFormButtons">
                                    <button id="stBtn_payment" type="submit" className="stFormButton btn waves-effect waves-light" disabled={!state.valid} >Pay ${toPrice(state.pricing.total)}</button>
                                </div>
                                <div className="stFormErrors"><strong>{error.message}</strong></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const Payment = injectStripe(_Payment)

export default Payment