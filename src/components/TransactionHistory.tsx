import { useState } from "react"
import React from 'react'
import "./TransactionHistory.css"
import { ethers } from 'ethers';
import BlockDataTable from "./BlockDataTable";

interface Props {
    providerSep: ethers.providers.JsonRpcProvider;
}

const TransactionHistory = ({providerSep}:Props) => {

    const [value,setValue] = useState<string>("")
    const [data,setData] = useState<ethers.providers.TransactionResponse[]>([])

    const getBlockData = async(blockNumber:number) =>{
        try {

            const history: ethers.providers.TransactionResponse[] = [];
            const block = await providerSep.getBlockWithTransactions(blockNumber);
            const txs = block.transactions || [];
            history.push(...txs);
    
            console.log('Transaction history:', history);
            return history; 
    
        } catch (error) {
            console.error('Error fetching transactions:', error);
            return []; 
        }
    }
    

    function handleValue(event: { target: { value: React.SetStateAction<string> } }){
        setValue(event.target.value)
    }
    
    async function handleSubmit() {
        setData(await getBlockData(Number(value)));
        console.log(data);
    }

    return (
        <div className = "holder">
            <span className = "heading">Transaction Data</span>
            <div>
                <input className = "holder-input"
                type="text" value={value}
                onChange={handleValue}
                placeholder="Enter block number..."
                ></input>
                <button className="holder-button"
                onClick={handleSubmit}
                >GO</button>
                <BlockDataTable data={data} />
            </div>

        </div>
    )
}

export default TransactionHistory