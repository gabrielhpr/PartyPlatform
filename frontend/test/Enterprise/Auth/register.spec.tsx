import { screen, render, fireEvent, getNodeText, getByLabelText, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterEnterprise from '../../../pages/Enterprise/Auth/register';

describe('Register Enterprise Process', () => {
    jest.setTimeout(30000);
    
    it('should register enterprise 1', async () => {

        const user = userEvent.setup();

        const {container} = render(<RegisterEnterprise/>);
        //const beginRegister = screen.queryByText('Começar cadastro!');

        //querySelector('button');

        // Começa 

        // Próximo passo
        await user.click( screen.getByText('Avançar') );

        let input1 = (await screen.findByText('Nome completo')).parentElement.lastElementChild;
        await user.type(input1, 'Gabriel Henrique');

        let input2 = (screen.getByText('E-mail')).parentElement.lastElementChild;
        await user.type(input2, 'gabriel@gmail.com');

        let input3 = (screen.getByText('Telefone/Celular')).parentElement.children[1];
        await user.type(input3, '11934148305');

        let input4 = (screen.getByText('WhatsApp')).parentElement.children[1];
        await user.type(input4, '11983053414');

        let input5 = screen.getByRole('checkbox');//.parentElement.lastElementChild;
        await user.click(input5);

        // Próximo passo
        await user.click( screen.getByText('Avançar') );

        let input6 = (await screen.findByText('Senha')).parentElement.children[1];
        await user.type(input6, '&N61al97');

        let input7 = (screen.getByText('Confirme a sua senha')).parentElement.children[1];
        await user.type(input7, '&N61al97');

        // Próximo passo
        await user.click( screen.getByText('Avançar') );

        let input8 = (await screen.findByText('Nome da empresa')).parentElement.children[1];
        await user.type(input8, 'Super Fotografias');

        let input9 = (screen.getByText('Localização da empresa')).parentElement.children[1];
        await user.click(input9);
        let input10 = (screen.getByText('Osasco', {exact: false}));
        await user.click(input10);

        let input11 = (screen.getByText('Endereço')).parentElement.children[1];
        await user.type(input11, 'Rua Victor Brecheret');

        let input12 = (screen.getByText('Número de endereço')).parentElement.children[1];
        await user.type(input12, '303');

        // Próximo passo
        await user.click( screen.getByText('Avançar') );

        let input13 = (await screen.findByText('Instagram')).parentElement.children[1];
        await user.type(input13, '@super_fotografias');

        let input14 = (screen.getByText('Facebook')).parentElement.children[1];
        await user.type(input14, 'super-fotografias');

        let input15 = (screen.getByText('Site Próprio')).parentElement.children[1];
        await user.type(input15, 'www.superfotografias.com.br');

        // Próximo passo
        await user.click( screen.getByText('Avançar') );

        let input16 = (await screen.findByText('Infantil'));//.parentElement.children[1];
        await user.click(input16);

        // Próximo passo
        await user.click( screen.getByText('Avançar') );

        let input17 = (await screen.findByText('Descrição')).parentElement.children[1];
        await user.type(input17, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a mi erat. In id erat finibus, consequat neque id, maximus massa. Fusce tincidunt non odio et tincidunt. Pellentesque facilisis tempor velit vel molestie. In feugiat luctus ipsum condimentum consectetur. Mauris non bibendum mauris justo.');

        // Próximo passo
        await user.click( screen.getByText('Avançar') );

        await waitFor(() => {
            expect( screen.getByText('Prestador de serviço') ).toBeInTheDocument();
        })
    })
})