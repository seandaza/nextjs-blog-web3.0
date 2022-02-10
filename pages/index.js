import Head from 'next/head'
import Image from 'next/image'
import { useCallback, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { useWeb3React } from '@web3-react/core'
import { connector } from '../config/web3'


export default function Home() {
  const { activate, active, deactivate, account, error, chainId } = useWeb3React()

  const connect = useCallback(() => {
    activate(connector)
    localStorage.setItem('previouslyConnected', true)
  }, [activate])

  useEffect(() => {
    if (localStorage.getItem('previouslyConnected')==='true')
      connect()
  }, [connect])



  const disconnect = () => {
    deactivate()
    localStorage.removeItem('previouslyConnected')
  }

  if (error) {
    return <p>se ha roto algo!</p>
  }
  return (
    <div className={styles.container}>
      <h1>web3 demo app</h1>
    {
      active 
      ? <> 
            <button onClick={disconnect}>
            Disconnect Wallet
            </button>
            <p>
              You are connected to the network with ID {chainId}<br/>
              Your account is: {account}
            </p>
        </>
      : <button onClick={connect}>Connect Wallet</button>
    }

 
    </div>
  )
}
