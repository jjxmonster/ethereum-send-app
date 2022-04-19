import React, { useState } from 'react';
import type { NextPage } from 'next';

import Form from '../components/Form';
import Head from 'next/head';

export type MessageState = {
   code?: number;
   message?: string;
   stack?: string;
   error: boolean;
};

const Home: NextPage = () => {
   const [recipientAddress, setRecipientAddress] = useState<string>('');
   const [amount, setAmount] = useState<number>(0);

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
               />
            </div>
         </div>
      </>
   );
};

export default Home;
