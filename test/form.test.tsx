import { render } from './text-utils';

import Form from '../components/Form';

describe('Form', () => {
   it('should be render', () => {
      if (typeof window !== 'undefined') {
         render(<Form />);
      }
   });
});
