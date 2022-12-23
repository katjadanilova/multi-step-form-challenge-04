import classNames from "classnames";
import arcade from "./images/icon-arcade.svg";
import advanced from "./images/icon-advanced.svg";
import pro from "./images/icon-pro.svg";
import React from "react";

type Pricing = {
    icon: string,
    title: string,
    monthlyPrice: string,
    yearlyPrice: string,
    tagLine: string,
    active: boolean,
    monthly: boolean,
    onChange(): void
}

export function PricingItem(props: Pricing) {
    return <div onClick={() => props.onChange()}
                className={classNames("pricing-item", props.active && "active")}>
        <img src={props.icon} alt={props.title + " icon"}/>
        <div className="texts">
            <h4>{props.title}</h4>
            {props.monthly ? <p>{props.monthlyPrice}</p> : <p>{props.yearlyPrice}</p>}
            {!props.monthly && <p className="tagline">{props.tagLine}</p>}
        </div>
    </div>
}

export const pricingItemsDetails = [
    {
        icon: arcade,
        title: "Arcade",
        monthlyPrice: "$9/mo",
        yearlyPrice: "$90/yr",
        tagLine: "2 months free",
        active: true,
    },
    {
        icon: advanced,
        title: "Advanced",
        monthlyPrice: "$12/mo",
        yearlyPrice: "$120/yr",
        tagLine: "2 months free",
        active: false,
    },
    {
        icon: pro,
        title: "Pro",
        monthlyPrice: "$15/mo",
        yearlyPrice: "$150/yr",
        tagLine: "2 months free",
        active: false,
    },

]