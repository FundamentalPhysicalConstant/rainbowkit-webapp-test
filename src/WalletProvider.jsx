import '@rainbow-me/rainbowkit/styles.css';
import PropTypes from 'prop-types';
import { createClient } from 'viem'
import { WagmiProvider } from 'wagmi';
import { createConfig, http } from 'wagmi'
import { bsc, bscTestnet } from 'wagmi/chains';
import { RainbowKitProvider, connectorsForWallets, darkTheme } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, trustWallet, coinbaseWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function initWallet(wallet, link) {
  return ({ projectId, walletConnectParameters}) => {
    const inited = wallet({
      projectId,
      walletConnectParameters
    })

    inited.mobile.getUri = (uri) => {
      console.log(uri)
      return `${link}${encodeURIComponent(uri)}`
    }

    return inited
  }
}

const metaMaskWalletInstance = initWallet(metaMaskWallet, 'https://metamask.app.link/wc?uri=')
const trustWalletInstance = initWallet(trustWallet, 'https://link.trustwallet.com/wc?uri=')

const queryClient = new QueryClient()

const connectors = connectorsForWallets(
  [
    {
        groupName: 'Recommended',
        wallets: [metaMaskWalletInstance, trustWalletInstance],
    },
    // {
    //     groupName: 'Others',
    //     wallets: [coinbaseWallet, walletConnectWallet],
    // }
  ],
  {
    appName: 'My test app',
    appUrl: 'https://credible-bluejay-summary.ngrok-free.app/',
    projectId: '5178c1d3f5bd37e2e41e937c17480e26',
  }
);

const config = createConfig({
  connectors,
  chains: [bsc, bscTestnet],
  client({ chain }) {
      return createClient({ chain, transport: http })
  },
  ssr: false
})

export const WalletProvider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          appInfo={{
              appName: 'Sqrow Web App',
              learnMoreUrl: 'https://learnaboutsqrow.example',
          }}
          theme={darkTheme({
              accentColor: 'linear-gradient(to right, #123456, #000000, #654321)',
              accentColorForeground: '#D9D9D9',
              borderRadius: 'small',
              fontStack: 'system',
              overlayBlur: 'small',
          })}
        >
          { children }
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

WalletProvider.propTypes = {
  children: PropTypes.node.isRequired
}