import React, {useState} from "react"
import {Button, Switch, TextField} from "@mui/joy";
import "./Steps.scss";
import {PricingItem, pricingItemsDetails} from "./PricingItem";
import thanks from "./images/icon-thank-you.svg";
import classNames from "classnames";


export type StepProps = {
    id: number,
    title: string,
    description: string,
    onNext(): void,
    onPrevious(): void
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

    return <div className={classNames("content", props.id >= 5 && "last")}>
        <div className={classNames("heading", props.id >= 5 && "last")}>
            {props.id >= 5 && <img src={thanks} aria-hidden="true" alt=""/>}
            <h1>{props.title}</h1>
            <p>{props.description}</p>
        </div>
        {props.id === 1 && textFields}
        {props.id === 2 && pricingItems}
        {props.id < 5 && <div className="actions">
                {props.id !== 1 ? <Button variant="plain" onClick={() => props.onPrevious()}>Back</Button>
                    : <div aria-hidden="true"></div>}
                <Button onClick={() => handleNext()}>Next Step</Button>
            </div>
        }
    </div>

}