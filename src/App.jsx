import { WalletProvider } from './WalletProvider'
import { ConnectButton } from './ConnectButton'
import './App.css'
import { PayButton } from './PayButton'

function App() {
  return (
    <WalletProvider>
      <ConnectButton />
      <div style={{marginTop: 20}}>
        <PayButton />
      </div>
    </WalletProvider>
  )
}

export default App
