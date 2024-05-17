import { useSendTransaction } from 'wagmi'

const to = '0x1fb69DdEFb7fc379CB6e35D147c81763d48253ED'

export const PayButton = () => {
    const { 
        data: hash, 
        isPending,
        sendTransaction 
      } = useSendTransaction()

    const payHandler = () => {
        sendTransaction({ to, value: '100' })
    }

    return (
        <>
            <button onClick={payHandler}>КУПИТЬ</button>
            { isPending && <p>Ожидание...</p> }
            { hash && <p>{ hash }</p> }
        </>
    )
}