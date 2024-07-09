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

    const getAccountData = async(accountNumber:string) =>{
        try {
            const curBlock = await providerSep.getBlockNumber();
            console.log(curBlock)
            const history: ethers.providers.TransactionResponse[] = [];
            for (let i = curBlock; i > 6275000; i--) {
                console.log(i)
                const block = await providerSep.getBlockWithTransactions(i);
                const txs = block.transactions || [];
                
                txs.map(tx => {
                    if (tx.from === accountNumber || tx.to === accountNumber) {
                        history.push(tx);
                    }
                })
            }    
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
        if (value.length <= 40 && value) {
            setData(await getBlockData(Number(value)));
            console.log(data);
        }
        else {
            setData(await getAccountData(value))
            console.log(data);
        }
        
    }

    return (
        <div className = "holder">
            <span className = "heading">Transaction Data</span>
            <div>
                <input className = "holder-input"
                type="text" value={value}
                onChange={handleValue}
                placeholder="Enter sepolia block number..."
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