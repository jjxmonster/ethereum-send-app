import React, { FunctionComponent, useState } from 'react';
import Web3 from 'web3';

import { MessageState } from '../../pages';
import { sendEthereum } from '../../assets/payment';

interface FormProps {
   amount: number;
   recipientAddress: string;

   setRecipientAddress: (e: string) => void;
   setAmount: React.Dispatch<React.SetStateAction<number>>;

   handleSendEthereum?: () => void;
}

const Form: FunctionComponent<FormProps> = ({
   amount,
   recipientAddress,

   setRecipientAddress,
   setAmount,
}) => {
   const [message, setMessage] = useState<MessageState | null>(null);

   const handleSendEthereum = (): void => {
      if (amount > 0) {
         if (Web3.utils.isAddress(recipientAddress)) {
            setMessage({ message: '', error: false });
            sendEthereum(setMessage, recipientAddress, amount);
         } else {
            setMessage({
               message: 'Something is wrong with recipient address',
               error: true,
            });
         }
      } else {
         setMessage({
            message: 'Amount have to be greater than zero',
            error: true,
         });
      }
   };

   return (
      <form className='bg-white shadow-md rounded px-5 pt-8 pb-10 mb-4'>
         <div className='mb-4'>
            <label
               htmlFor='address'
               className='block text-gray-700 text-sm font-bold mb-2'
            >
               Recipient Address
            </label>
            <input
               data-testid='input-address'
               onChange={e => setRecipientAddress(e.target.value)}
               className='shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
               id='address'
               type='text'
               placeholder='Address'
            />
         </div>
         <div className='mb-6'>
            <label
               htmlFor='amount'
               className='block text-gray-700 text-sm font-bold mb-2'
            >
               Ethereum Amount
            </label>
            <input
               data-testid='input-amount'
               onChange={e => setAmount(Number(e.target.value))}
               className='shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
               id='amount'
               type='number'
               placeholder='Amount'
            />
            {message?.message && (
               <p
                  data-testid='error-message-paragraph'
                  className={`text-xs italic ${
                     message.error ? 'text-red-500' : 'text-green-500'
                  }`}
               >
                  {message.message}
               </p>
            )}
         </div>
         <div className='flex items-center justify-between'>
            <button
               data-testid='button-send'
               onClick={handleSendEthereum}
               className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
               type='button'
            >
               Send
            </button>
         </div>
      </form>
   );
};

export default Form;
