import { screen, render, fireEvent, getNodeText, getByLabelText, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderHook } from '@testing-library/react-hooks';
import EnterpriseAccess from '../../pages/Enterprise/enterpriseAccess';
//import { specificQuestions } from '../../../utils/typeOfParties';
import { EnterpriseProvider } from '../../context/enterpriseContext';
//import puppeteer from 'puppeteer';

describe('Login Enterprise Process', () => {
    jest.setTimeout(30000);
    
    it('should login enterprise 1', async () => {

        // const browser = await puppeteer.launch({
        //     headless: false,
        //     slowMo: 80,
        //     args: ['--window-size=1920,1080']
        // });

        // const page = await browser.newPage();

        // await page.goto(
        //     'http://localhost:3000/Enterprise/enterpriseAccess'
        // );

        // await page.click('input[name="email"]');
        // await page.type('input[name="email"]', 'gabrielhprdeveloper@gmail.com');
        // await page.click('input[name="password"]');
        // await page.type('input[name="password"]', '&N61al97');
        

        // const user = userEvent.setup();

        // const {container} = render(
        //     <EnterpriseProvider>
        //         <EnterpriseAccess/>
        //     </EnterpriseProvider>
        // );

        // let enterprise1 = {
        //     email: 'gabrielhprdeveloper12345@gmail.com',
        //     password: '&N61al97',
        // }
       
        // // Começa 
        // let input1 = (await screen.findByText('E-mail')).parentElement.lastElementChild;
        // await user.type(input1, enterprise1.email);

        // let input2 = (screen.getByText('Senha')).parentElement.lastElementChild;
        // await user.type(input2, enterprise1.password);

        // await user.click( await screen.findByText('LOGIN') );

        // await waitFor(() => {
        //     expect( screen.getByText('LOGIN') ).toBeInTheDocument();
        // });
    })
});
