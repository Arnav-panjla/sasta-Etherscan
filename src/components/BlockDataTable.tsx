import React from 'react'
import "./BlockDataTable.css"
import { ethers } from 'ethers'

interface Props {
    data : ethers.providers.TransactionResponse[],
}

const BlockDataTable = ({data}:Props) => {
  return (
    <>
        <div className="table-container">
            <table>
            <thead>
                <tr>
                <th>Hash</th>
                <th>From</th>
                <th>To</th>
                <th>Value - sepEth</th>
                </tr>
            </thead>
            <tbody>
                {data.map(tx => (
                <tr key={tx.hash}>
                    <td>{tx.hash}</td>
                    <td>{tx.from}</td>
                    <td>{tx.to}</td>
                    <td>{ethers.utils.formatEther(tx.value)}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </>
  )
}

export default BlockDataTable