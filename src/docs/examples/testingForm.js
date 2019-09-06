import React from 'react';
import NewForm from '../../lib/testForm';
import { WafoFormInput } from '../../../lib';

const initialValues = {
  eluno: 'A ver pues',
  elanidado: 'Y el anidado',
};

const TestForm = () => {
  const [show, setShow] = React.useState(true);

  return (
    <div>
      <NewForm initialValues={initialValues}>
        {show &&
          <WafoFormInput
            name="eluno"
            placeholder="Uno"
          />
        }
        <input type="text" name="eldos" placeholder="Dos" ignoreinput="true" />
        <div>
          <WafoFormInput
            name="elanidado"
            placeholder="Anidado"
          />
        </div>
        <div>
          <div>
            <div>
              <WafoFormInput
                name="maximoanidado"
                placeholder="Anidado"
              />
            </div>
          </div>
        </div>
      </NewForm>

      <button type="button" onClick={() => setShow(prevState => !prevState)}>
        Toggle input
      </button>
    </div>
  );
};

export default TestForm;