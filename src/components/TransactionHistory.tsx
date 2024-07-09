import { useState } from "react"
import React from 'react'
import "./TransactionHistory.css"


const TransactionHistory = () => {

    const [value,setValue] = useState<string>("")

    function handleValue(event: { target: { value: React.SetStateAction<string> } }){
        setValue(event.target.value)
    }
    

    function handleSubmit(){
        console.log("Submitting wallet address", value)
    }

    return (
        <div className = "holder">
            <span className = "heading">Transactvvvvssdfn</span>
            <div>
                <input className = "holder-input"
                type="text" value={value}
                onChange={handleValue}
                placeholder="Enter wallet address..."
                ></input>
                <button className="holder-button"
                onClick={handleSubmit}
                >GO</button>
            </div>
        </div>
    )
}

export default TransactionHistory