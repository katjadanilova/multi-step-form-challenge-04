import React, {useState} from "react"
import {Button, TextField} from "@mui/joy";

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
    billing: "Arcade" | "Advanced" | "Pro",
    addOns: string[],
}

export default function Steps(props: StepProps) {
    const [data, setData] = useState<StepsData>({
        name: "",
        email: "",
        phone: "",
        monthly: true,
        billing: "Arcade",
        addOns: ["Online service", "Larger storage"]
    })

    const [requiredMissing, setRequiredMissing] = useState(false)

    function updateData(partial: Partial<StepsData>) {
        setData(u => ({...u, ...partial}))
    }

    function handleNext() {
        if(!data.phone){
            setRequiredMissing(true)
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

    return <div className="content">
        <div className="heading">
            <h1>{props.title}</h1>
            <p>{props.description}</p>
        </div>
        {props.id === 1 && textFields}
        {props.id === 2 && <div>Something else</div>}

        <div className="actions">
            {props.id !== 1 ? <Button variant="plain" onClick={() => props.onPrevious()}>Back</Button>
                    : <div aria-hidden="true"></div>}
            <Button onClick={() => handleNext()}>Next Step</Button>
        </div>
    </div>

}