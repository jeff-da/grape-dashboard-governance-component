import { getRealms, getVoteRecordsByVoter, getTokenOwnerRecordForRealm, getTokenOwnerRecordsByOwner, getGovernanceAccounts, pubkeyFilter, TokenOwnerRecord } from '@solana/spl-governance';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { MoneyStreaming } from '@mean-dao/money-streaming';
import { MoneyStreamsPage } from "../components/MoneyStreamsPage/MoneyStreamsPage"


import {
  Typography,
  Button,
  Grid,
  Box,
  Paper,
  Avatar,
  Skeleton,
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableBody,
  TableRow
} from '@mui/material/';

import HowToVoteIcon from '@mui/icons-material/HowToVote';
import { WalletIcon } from '@solana/wallet-adapter-react-ui';

const StyledTable = styled(Table)(({ theme }) => ({
    '& .MuiTableCell-root': {
        borderBottom: '1px solid rgba(255,255,255,0.05)'
    },
}));

export function GovernanceView(props: any) {
    const [loading, setLoading] = React.useState(false);
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [realms, setRealms] = React.useState(null);
    const [realmsArray, setRealmsArray] = React.useState(new Array);
    const [voteRecords, setVoteRecords] = React.useState(null);
    const [tokenOwnerRecords, setOwnerRecords] = React.useState(null);
    const [resume, setResume] = React.useState(null)

    const getGovernance = async () => {
        if (!loading){
            setLoading(true);
            
            // FUTURE UPDATE: 
            // - ADD ALL POSITIONS A WALLET HAS
            // - ADD ABILITY TO SHOW OPEN VOTES WITHIN A REALM
            // - ADD ABILITY TO VOTE
            // - ADD ABILITY TO WITHDRAW FROM REALMS
            
            const programId = new PublicKey('GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw');
            const realmId = new PublicKey('By2sVGZXwfQq6rAiAM3rNPJ9iQfb5e2QhnF4YjJ4Bip'); // Grape RealmId
            const governingTokenMint = new PublicKey('8upjSpvjcdpuzhfR1zriwg5NXkwDruejqNE9WNbPRtyA'); // Grape Mint
            const governingTokenOwner = publicKey;

            const mspAccount = new PublicKey("H6wJxgkcc93yeUFnsZHgor3Q3pSWgGpEysfqKrwLtMko");
            const moneyStreaming = new MoneyStreaming("https://api.mainnet-beta.solana.com", mspAccount);
            const wallet = publicKey // new PublicKey("BNLV8QKPH8MK7rsn2nj317wL3WZ9HP5RoqXLSLC81mwv");

            console.log(moneyStreaming)

            const listStreamsObject = {
                // treasurer: wallet,
                beneficiary: wallet
            }

            let treasurerStreams = await moneyStreaming.listStreams(listStreamsObject);
            
            console.log('sd')
            console.log(treasurerStreams)
            let getStreamTest = await moneyStreaming.getStream(wallet)
            console.log(getStreamTest)

            let cachedStreams = await moneyStreaming.refreshStreams(treasurerStreams, undefined, undefined, undefined, undefined, true);

            let resume: any = {
                totalNet: 0,
                incomingAmount: 0,
                outgoingAmount: 0,
                totalAmount: 0
            };
            
            for (let stream of cachedStreams) {
            
                const streamIsOutgoing = 
                    stream.treasurerAddress &&
                    typeof stream.treasurerAddress !== 'string'
                        ? stream.treasurerAddress.equals(wallet)
                        : stream.treasurerAddress === wallet.toBase58();
            
                let streamBalance = 0;
                console.log('addy')
                console.log(stream.treasurerAddress)
            
                if (streamIsOutgoing) {
                    streamBalance = stream.escrowUnvestedAmount;
                    resume['outgoingAmount'] = resume['outgoingAmount'] + 1;  
                } else {
                    streamBalance = stream.escrowVestedAmount;
                    resume['incomingAmount'] = resume['incomingAmount'] + 1;  
                }
            
                resume['totalNet'] = resume['totalNet'] + streamBalance;
            }
            
            resume['totalAmount'] = cachedStreams.length;
            console.log('My money streams resume', resume);

            /*
            const ownerRecords = await getTokenOwnerRecordForRealm(
                connection, 
                programId,
                realmId,
                governingTokenMint,
                governingTokenOwner
            );
            setOwnerRecords(ownerRecords);

            const ownerRecordsAll = await getGovernanceAccounts(
                connection, 
                programId, 
                TokenOwnerRecord, [
                    pubkeyFilter(1 + 32 + 32, governingTokenOwner)!,
            ]);
            */
            

            //console.log("Realms: "+JSON.stringify(ownerRecordsAll));
            setResume(resume)
            setLoading(false);
        } else{

        }
    }
    
    React.useEffect(() => { 
        if (publicKey && !loading)
            getGovernance();
    }, [publicKey]);
    
    if(loading){
        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <Paper className="grape-paper-background">
                        <Paper
                        className="grape-paper"
                        sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                        >
                            <Box sx={{ p:1, width: "100%" }}>
                                <Skeleton />
                            </Box>
                        </Paper>
                    </Paper>
                </Grid>
            </React.Fragment>
        )
    } else{
        if (resume){
            // return (
            //     <React.Fragment>
            //         <Grid item xs={12} md={12} lg={12}>
            //             <Paper className="grape-paper-background">
            //                 <Box className="grape-paper">
            //                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
            //                         <Box className="grape-dashboard-component-header" sx={{ m: 0, position: 'relative' }}>
            //                             <Typography gutterBottom variant="h6" component="div" sx={{ m: 0, position: 'relative'}}>
            //                             MeanFi
            //                             </Typography>
            //                         </Box>
            //                     </Box>
                                
            //                     <div style={{width:'auto', overflowX: 'scroll'}}>
            //                         <TableContainer>
            //                             <StyledTable sx={{ minWidth: 500 }} size="small" aria-label="Portfolio Table">
            //                                 <TableHead>
            //                                     <TableRow>
            //                                         <TableCell><Typography variant="caption">Stream</Typography></TableCell>
            //                                         <TableCell align="right"><Typography variant="caption">Amount</Typography></TableCell>
            //                                         <TableCell></TableCell>
            //                                     </TableRow>
            //                                 </TableHead>
            //                                 <TableBody>
            //                                     <TableRow>
            //                                         <TableCell style={{ verticalAlign: 'middle' }}>
            //                                             <Grid container direction="row" alignItems="center" sx={{ }}>
            //                                                 <Grid item>
            //                                                     <Avatar 
            //                                                         component={Paper} 
            //                                                         elevation={4}
            //                                                         alt="Token" 
            //                                                         src={'https://lh3.googleusercontent.com/y7Wsemw9UVBc9dtjtRfVilnS1cgpDt356PPAjne5NvMXIwWz9_x7WKMPH99teyv8vXDmpZinsJdgiFQ16_OAda1dNcsUxlpw9DyMkUk=s0'}
            //                                                         sx={{ width: 28, height: 28, bgcolor: "#222" }}
            //                                                     />
            //                                                 </Grid>
            //                                                 <Grid item sx={{ ml: 1 }}>
            //                                                         {'Total'}
            //                                                 </Grid>
            //                                             </Grid>
            //                                         </TableCell>
            //                                         <TableCell align="right">{(parseInt(resume['totalNet']))}</TableCell>
            //                                     </TableRow> 
            //                                 </TableBody>
            //                             </StyledTable>
            //                         </TableContainer>
            //                     </div>
            //                 </Box>
            //             </Paper>
            //         </Grid>
            //     </React.Fragment>
            // );

            return (
              <MoneyStreamsPage/>  
            );




        }else{
            return (
                // <React.Fragment>
                //     <Paper className="grape-paper-background">
                //         <Grid 
                //             className="grape-paper" 
                //             container
                //             spacing={1}>
                //             <Grid item>
                //                 <Typography 
                //                     align="center"
                //                     variant="h5">
                //                     {'Nothing loaded...'}
                //                 </Typography>
                //             </Grid>
                //         </Grid>
                //     </Paper>
                // </React.Fragment>
               
               
               <MoneyStreamsPage/>
            );
        }
        
    }
}
