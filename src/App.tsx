import React, { FC, ReactNode, useCallback, useMemo } from 'react';
import { styled, ThemeProvider } from '@mui/material/styles';
import { HashRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GovernanceView } from "./Governance/Governance";
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';

import {
  Box,
  Grid,
  Paper,
  Container,
  Typography,
  AppBar,
} from '@mui/material';

import Header from './Header/Header';
import { SnackbarProvider } from 'notistack';
import { useConnection, ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork, WalletError, WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { Connection, Keypair, SystemProgram, Transaction, clusterApiUrl } from '@solana/web3.js';

import { useSnackbar } from 'notistack';

import ConfirmDialog from './components/ConfirmDialog/ConfirmDialog';

//import { WalletDialogProvider, WalletDisconnectButton, WalletMultiButton } from '../WalletAdapterMui';

import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
  CloverWalletAdapter,
  MathWalletAdapter,
  Coin98WalletAdapter,
  SolongWalletAdapter,
} from '@solana/wallet-adapter-wallets';


//import { mainListItems, secondaryListItems } from './components/SidebarList/SidebarList';
import grapeTheme from  './utils/config/theme'
import "./App.less";
import { GRAPE_RPC_ENDPOINT } from './utils/grapeTools/constants';

function Copyright(props: any) {
  return (
    <Typography sx={{background:'transparent'}} variant="body2" color="text.secondary" align="center" {...props}>
      Grape Network
    </Typography>
  );
}

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // You can also provide a custom RPC endpoint
  const network = WalletAdapterNetwork.Mainnet; //.Devnet; //.Mainnet;
  // You can also provide a custom RPC endpoint
  const endpoint = GRAPE_RPC_ENDPOINT; //useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [
    
    new PhantomWalletAdapter(),
    new SlopeWalletAdapter(),
    new SolflareWalletAdapter(),
    new TorusWalletAdapter(),
    new LedgerWalletAdapter(),
    new SolletWalletAdapter({ network }),
    new SolletExtensionWalletAdapter({ network }),
    
    new CloverWalletAdapter(),
    new MathWalletAdapter(),
    new Coin98WalletAdapter(),
    new SolongWalletAdapter(),
  ], [network]);
  
  /*
  const { enqueueSnackbar } = useSnackbar();
  const onError = useCallback(
      (error) => {
          enqueueSnackbar(error.message ? `${error.name}: ${error.message}` : error.name, { variant: 'error' });
          console.error(error);
      },
      [enqueueSnackbar]
  );
  */

  return (
    <>
    <ThemeProvider theme={grapeTheme}>
      <SnackbarProvider>
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
              
              <Box 
                //color={grapeTheme.palette.primary.light}
                sx={{ 
                  flex: 1
                }}>
                <CssBaseline />
                <Router>
                  <AppBar position="fixed" color="primary" style={{ background: 'rgba(0,0,0,0.5)' }}>
                      <Header
                          open={open} 
                          toggleDrawer={toggleDrawer}
                      />
                    </AppBar>
                    
                    <Box
                      component="main"
                      sx={{
                        mt: 6,
                        display: 'flex',
                        flexGrow: 1
                      }}
                    >
                      <Container maxWidth="lg" sx={{ mt: 4, mb: 4}}>
                        <ConfirmDialog />
                        <Routes>
                          <Route path="/" element={<GovernanceView/>} />
                          <Route path="*" element={<NotFound/>} />
                        </Routes>
                        
                        <Copyright sx={{ mt: 4 }} />
                      </Container>
                    </Box>
                </Router>
              </Box>
              
            </WalletProvider>
          </ConnectionProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export const NotFound = () => {
  return (
    <div style={{ height: "100%", overflow: "auto" }}>
      <Paper className="grape-paper-background">
        <Grid 
          className="grape-paper" 
          container
          alignContent="center"
          justifyContent="center"
          direction="column">
          <Grid item>
            <Typography 
              align="center"
              variant="h3">
              {'No Grapes Here...'}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
  </div>
  )
}

//export const Dashboard: FC<{ children: ReactNode }> = ({ children }) => {
export default function Dashboard() {
  return <DashboardContent />;
}