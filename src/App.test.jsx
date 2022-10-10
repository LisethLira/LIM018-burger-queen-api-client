/**
 * @jest-environment jsdom
*/
import React from 'react';
import { render, screen } from '@testing-library/react';
// import { useNavigate } from 'react-router-dom';
import fetch from 'node-fetch';
import App from './App';
import { requestUsers } from './PageView/Login';

// const fetch = require('node-fetch');
// jest.mock('node-fetch');

// describe('Componente Login', () => {
//   render(<App />);
//   it('Debería existir el botón con className "Button-login"', () => {
//     expect(screen.getByRole('button', { className: 'Button-login' })).toBeInTheDocument();
//   });

//   it('Debería de ejecutar el evento onclick', () => {
//     render(<App />);
//     screen.debug();
//     // const btnLogin = app.queryByText('Iniciar Sesión');
//     // fireEvent.click(screen.queryByTestId('btnLogin'));
//     // expect(requestUsers).toHaveBeenCalled();
//   });
// });

// eslint-disable-next-line max-len
// const secret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwibmFtZSI6IkdhYnkiLCJyb2xlIjoibWVzZXJvIiwiYWRtaW4iOmZhbHNlfQ.2UVK4iuzQ3MoazqBj27vpf_0uqG1pBXrZH0UAWGA8T0';

// const jsonMock = { token: secret };
// const users = {
//   email: 'mesero1@gmail.com',
//   password: '123456',
// };

// test de la función requestUsers
describe('requestUsers', () => {
  // it('debería de ser una función', () => {
  //   expect(typeof requestUsers).toBe('function');
  // });
  it('debería autenticar al usuario y dar una ruta', () => {
    const secret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwibmFtZSI6IkdhYnkiLCJyb2xlIjoibWVzZXJvIiwiYWRtaW4iOmZhbHNlfQ.2UVK4iuzQ3MoazqBj27vpf_0uqG1pBXrZH0UAWGA8T0';
    // const tok = { token: secret };
    // const res = { data: tok };

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({ token: secret }),
    }));

    const email = 'mesero1@gmail.com';
    const password = '123456';

    // fetch.mockResolvedValue({ status: 200, data: tok });
    // fetch.mockResolvedValue(res);
    requestUsers(email, password)
      .then((data) => {
        console.log(data);
        // expect(data).toEqual(tok);
      })
      .catch();
    // console.log(requestUsers(email, password));
  });
});
