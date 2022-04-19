import { render, screen, fireEvent } from './text-utils';
import '@testing-library/jest-dom';

import Form from '../components/Form';

describe('Form render', () => {
   beforeEach(() => {
      render(
         <Form
            amount={0}
            recipientAddress=''
            setRecipientAddress={() => {}}
            setAmount={() => {}}
         />
      );
   });

   it('should be render', () => {
      expect(screen.getByTestId('input-address')).toBeInTheDocument();
      expect(screen.getByTestId('input-amount')).toBeInTheDocument();
      expect(screen.getByTestId('button-send')).toBeInTheDocument();
   });
   it('should render error paragraph when user click send button with invalid data', () => {
      fireEvent(
         screen.getByTestId('button-send'),
         new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
         })
      );
      expect(screen.getByTestId('error-message-paragraph')).toBeInTheDocument();
   });
});

describe('messages appear after validation', () => {
   it('should show address error message when user click send button with invalid address', () => {
      render(
         <Form
            amount={5}
            recipientAddress='invalid address'
            setRecipientAddress={() => {}}
            setAmount={() => {}}
         />
      );

      fireEvent(
         screen.getByTestId('button-send'),
         new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
         })
      );

      expect(screen.getByTestId('error-message-paragraph')).toHaveTextContent(
         'Something is wrong with recipient address'
      );
   });

   it('should show amount error message when user click send button with invalid amount', () => {
      render(
         <Form
            amount={0}
            recipientAddress=''
            setRecipientAddress={() => {}}
            setAmount={() => {}}
         />
      );

      fireEvent(
         screen.getByTestId('button-send'),
         new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
         })
      );

      expect(screen.getByTestId('error-message-paragraph')).toHaveTextContent(
         'Amount have to be greater than zero'
      );
   });
});
