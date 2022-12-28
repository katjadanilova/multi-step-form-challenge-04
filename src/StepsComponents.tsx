import classNames from "classnames";
import arcade from "./images/icon-arcade.svg";
import advanced from "./images/icon-advanced.svg";
import pro from "./images/icon-pro.svg";
import React from "react";
import {Button, Checkbox} from "@mui/joy";

type Pricing = {
    icon: string,
    title: string,
    monthlyPrice: number,
    yearlyPrice: number,
    tagLine: string,
    active: boolean,
    monthly: boolean,
    onChange(): void
}

export const pricingItemsDetails = [
    {
        icon: arcade,
        title: "Arcade",
        monthlyPrice: 9,
        yearlyPrice: 90,
        tagLine: "2 months free",
        active: true,
    },
    {
        icon: advanced,
        title: "Advanced",
        monthlyPrice: 12,
        yearlyPrice: 120,
        tagLine: "2 months free",
        active: false,
    },
    {
        icon: pro,
        title: "Pro",
        monthlyPrice: 15,
        yearlyPrice: 150,
        tagLine: "2 months free",
        active: false,
    },

]

export function PricingItem(props: Pricing) {
    return <div onClick={() => props.onChange()}
                className={classNames("pricing-item", props.active && "active")}>
        <img src={props.icon} alt={props.title + " icon"}/>
        <div className="texts">
            <h4>{props.title}</h4>
            {props.monthly ? <p>{`$${props.monthlyPrice}/mo`}</p> : <p>{`$${props.yearlyPrice}/yr`}</p>}
            {!props.monthly && <p className="tagline">{props.tagLine}</p>}
        </div>
    </div>
}

type AddOnProps = {
    title: string,
    description: string,
    monthlyPrice: number,
    yearlyPrice: number,
    active: boolean,
    monthly: boolean,
    onChange(): void
}

type AddOn = {
    title: string,
    description: string,
    monthlyPrice: number,
    yearlyPrice: number

}

export const addOnsDetails: AddOn[] = [
    {
        title: "Online service",
        description: "Access to multiplayer games",
        monthlyPrice: 1,
        yearlyPrice: 10
    },
    {
        title: "Larger storage",
        description: "Extra 1TB of cloud save",
        monthlyPrice: 2,
        yearlyPrice: 20
    },
    {
        title: "Customizable profile",
        description: "Custom theme on your profile",
        monthlyPrice: 2,
        yearlyPrice: 20
    }

]

export function AddOn(props: AddOnProps) {

    return <div onClick={() => props.onChange()}
                className={classNames("add-on", props.active && "active")}>
        <div className="left-side">
            <Checkbox checked={props.active} onChange={() => props.onChange()}/>
            <div className="texts">
                <h4>{props.title}</h4>
                <p>{props.description}</p>
            </div>
        </div>
        {props.monthly ? <p>{`+$${props.monthlyPrice}/mo`}</p> : <p>{`+$${props.yearlyPrice}/yr`}</p>}
    </div>
}

type SummaryProps = {
    monthly: boolean,
    type: string,
    onChange(): void,
    addOns: string[],
}

export function Summary(props: SummaryProps) {

    const title = <h4>{`${props.type}${props.monthly ? " (Monthly)" : " (Yearly)"}`}</h4>

    function findPricingItemByTitle(title: string) {
        return pricingItemsDetails.find((item) => item.title === title);
    }

    function getPricingItem() {
        const item = findPricingItemByTitle(props.type);
        return item || pricingItemsDetails[0];
    }

    const item = getPricingItem()

    function findAddOnByTitle(title: string) {
        return addOnsDetails.find((item) => item.title === title) || addOnsDetails[0];
    }

    function calculateTotal() {
        let price = 0
        if (props.monthly) {
            price = item.monthlyPrice
            for (const addOn of props.addOns) {
                price += findAddOnByTitle(addOn).monthlyPrice
            }
            return price
        }

        price = item.yearlyPrice
        for (const addOn of props.addOns) {
            price += findAddOnByTitle(addOn).yearlyPrice
        }
        return price
    }

    return <div className="summary">
        <div className="summary-card">
            <div className="title">
                <div className="action">
                    {title}
                    <Button variant="plain" onClick={() => props.onChange()}>Change</Button>
                </div>
                {props.monthly ? <p>{`$${item.monthlyPrice}/mo`}</p> : <p>{`$${item.yearlyPrice}/yr`}</p>}
            </div>
            {props.addOns.map(it => <div key={it} className="line">
                <p className="add-on-name">{it}</p>
                <div className="add-on-price">
                    {props.monthly ? <p>{`+$${findAddOnByTitle(it).monthlyPrice}/mo`}</p> :
                        <p>{`+$${findAddOnByTitle(it).yearlyPrice}/yr`}</p>}
                </div>
            </div>)}
        </div>
        <div className="total">
            <p>{`Total${props.monthly ? " (per month)" : " (per year)"}`}</p>
            <p className="total-price">{`$${calculateTotal()}${props.monthly ? "/mo" : "/yr"}`}</p>

        </div>
    </div>

}