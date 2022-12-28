import React, {useState} from "react"
import {Button, Switch, TextField} from "@mui/joy";
import "./Steps.scss";
import {AddOn, addOnsDetails, PricingItem, pricingItemsDetails, Summary} from "./StepsComponents";
import thanks from "./images/icon-thank-you.svg";
import classNames from "classnames";

export type StepProps = {
    id: number,
    title: string,
    description: string,
    onNext(): void,
    onPrevious(): void,
    changeBillingType(): void,
}

export type StepsData = {
    name: string,
    email: string,
    phone: string,
    monthly: boolean,
    billing: string,
    addOns: string[],
}


export default function Steps(props: StepProps) {
    const [data, setData] = useState<StepsData>({
        name: "",
        email: "",
        phone: "",
        monthly: false,
        billing: "Arcade",
        addOns: ["Online service", "Larger storage"]
    })
    const [requiredMissing, setRequiredMissing] = useState(false)

    function updateData(partial: Partial<StepsData>) {
        setData(u => ({...u, ...partial}))
    }

    function updateAddOns(name: string) {
        let newArray = data.addOns
        if (newArray.includes(name)) {
            setData(prevState => ({...prevState, addOns: newArray.filter(str => str !== name)}))
        } else {
            newArray.push(name)
            setData(prevState => ({...prevState, addOns: newArray}))
        }
    }

    function handleNext() {
        if (!data.phone) {
            setRequiredMissing(true)
            return
        }
        if (props.id > 5) {
            return
        }
        props.onNext()
        setRequiredMissing(false)
    }

    const heading = <div className={classNames("heading", props.id >= 5 && "last")}>
        {props.id >= 5 && <img src={thanks} aria-hidden="true" alt=""/>}
        <h1>{props.title}</h1>
        <p>{props.description}</p>
    </div>

    const textFields = <div className="fields">
        <TextField value={data.name}
                   onChange={(ev) => updateData({name: ev.target.value})}
                   label="Name"
                   placeholder="e.g. Stephen King"/>
        <TextField value={data.email}
                   onChange={(ev) => updateData({email: ev.target.value})}
                   type="email"
                   label="Email Address"
                   placeholder="e.g. stephen.king@example.com"/>
        <TextField value={data.phone}
                   onChange={(ev) => updateData({phone: ev.target.value})}
                   required
                   error={requiredMissing}
                   helperText={requiredMissing && "This field is required"}
                   label="Phone Number"
                   placeholder="e.g. +1 555 567 890"/>
    </div>

    const pricingItems = <div className="pricing-items">
        <div className="prices">
            {pricingItemsDetails.map(it => <PricingItem key={it.title}
                                                        monthly={data.monthly}
                                                        icon={it.icon}
                                                        title={it.title}
                                                        monthlyPrice={it.monthlyPrice}
                                                        yearlyPrice={it.yearlyPrice}
                                                        active={it.title === data.billing}
                                                        tagLine={it.tagLine}
                                                        onChange={() => updateData({billing: it.title})}
            />)}
        </div>
        <div className="toggle">
            <Switch checked={!data.monthly}
                    onChange={(ev) => updateData({monthly: !ev.target.checked})}
                    startDecorator="Monthly"
                    endDecorator="Yearly"/>
        </div>
    </div>

    const addOns = <div className="add-ons">
        {addOnsDetails.map(it => <AddOn key={it.title}
                                        monthly={data.monthly}
                                        description={it.description}
                                        title={it.title}
                                        monthlyPrice={it.monthlyPrice}
                                        yearlyPrice={it.yearlyPrice}
                                        active={data.addOns.includes(it.title)}
                                        onChange={() => updateAddOns(it.title)}
        />)}
    </div>

    const summary = <Summary monthly={data.monthly} type={data.billing} onChange={() => props.changeBillingType()}
                             addOns={data.addOns}/>

    return <div className={classNames("steps", props.id >= 5 && "last")}>
        <div className="steps-card">
            {heading}
            {props.id === 1 && textFields}
            {props.id === 2 && pricingItems}
            {props.id === 3 && addOns}
            {props.id === 4 && summary}
        </div>
        {props.id < 5 && <div className="actions">
            {props.id !== 1 ? <Button variant="plain" onClick={() => props.onPrevious()}>Go Back</Button>
                : <div aria-hidden="true"></div>}
            <Button onClick={() => handleNext()}>{props.id === 4 ? "Confirm" : "Next Step"}</Button>
        </div>
        }
    </div>

}