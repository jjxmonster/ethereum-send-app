import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Web3 from 'web3';
import type { NextPage } from 'next';

import Form from '../components/Form';

export type MessageState = {
   code?: number;
   message?: string;
   stack?: string;
   error: boolean;
};

const Home: NextPage = () => {
   const [recipientAddress, setRecipientAddress] = useState<string>('');
   const [amount, setAmount] = useState<number>(0);
   const [provider, setProvider] = useState<Web3>();

   useEffect(() => {
      if (window !== undefined) {
         setProvider(new Web3(window.ethereum));
      }
   }, []);

   return (
      <>
         <Head>
            <title>Ethereum payment</title>
         </Head>
         <div className='w-screen h-screen flex items-center justify-center bg-blue-700 flex-col'>
            <div className='w-full max-w-md'>
               <Form
                  amount={amount}
                  recipientAddress={recipientAddress}
                  setRecipientAddress={setRecipientAddress}
                  setAmount={setAmount}
                  provider={provider}
               />
            </div>
         </div>
      </>
   );
};

export default Home;
