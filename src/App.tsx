/// <reference types="react-scripts" />

import React, {useState} from 'react';
import './App.scss';
import Steps from "./Steps";
import classNames from 'classnames';
import BG from "./images/bg-sidebar-desktop.svg"

type CounterProps = {
    currentStep: number,
}

function Counter(props: CounterProps) {
    const counterContent = [
        {id: 1, title: "Your Info"},
        {id: 2, title: "Select Plan"},
        {id: 3, title: "Add-ons"},
        {id: 4, title: "Summary"},
    ]

    return <div className="counter">
        <img src={BG} alt=""/>
        <div className="lines">
            {
                counterContent.map(it => <div key={it.id} className="line">
                    <strong className={classNames("number", it.id === props.currentStep && "current")}>
                        {it.id}</strong>
                    <div className="texts">
                        <p>{"STEP " + it.id}</p>
                        <h3>{it.title}</h3>
                    </div>
                </div>)
            }
        </div>
    </div>
}

const stepsInfo = [
    {
        id: 1,
        title: "Personal Info",
        description: "Please provide your name, email address, and phone number."
    },
    {
        id: 2,
        title: "Select you plan",
        description: "You have the option of monthly or yearly billing."
    },
    {
        id: 3,
        title: "Pick add-ons",
        description: "Add-ons help enhance your gaming experience."
    },
    {
        id: 4,
        title: "Finishing up",
        description: "Double-check everything looks OK before confirming."
    },
    {
        id: 5,
        title: "Thank you!",
        description: "Thanks for confirming your subscription! " +
            "We hope you have fun using our platform. If you ever need support, " +
            "please feel free to email us at support@loremgaiming.com."
    },
]

function App() {

    const [currentStep, setCurrentStep] = useState(1)

    return (
        <div className="app">
            <div className="card">
                <Counter currentStep={currentStep}/>
                <Steps id={currentStep}
                       title={stepsInfo[currentStep - 1].title}
                       description={stepsInfo[currentStep - 1].description}
                       onNext={() => setCurrentStep(stepsInfo[currentStep].id)}
                       onPrevious={() => setCurrentStep(stepsInfo[currentStep].id - 2)}
                />
            </div>
        </div>
    );
}

export default App;
