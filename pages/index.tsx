import React from 'react';
import type { NextPage } from 'next';

import Form from '../components/Form';

const Home: NextPage = () => {
   return (
      <div className='w-screen h-screen flex items-center justify-center bg-blue-700 flex-col'>
         <div className='w-full max-w-md'>
            <Form />
         </div>
      </div>
   );
};

export default Home;
