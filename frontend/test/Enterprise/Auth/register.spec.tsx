import { screen, render, fireEvent, getNodeText, getByLabelText, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderHook } from '@testing-library/react-hooks';
import RegisterEnterprise from '../../../pages/Enterprise/Auth/register';
import { specificQuestions } from '../../../utils/typeOfParties';
import { EnterpriseProvider } from '../../../context/enterpriseContext';

describe('Register Enterprise Process', () => {
    jest.setTimeout(30000);
    
    it('should register enterprise 1', async () => {

        const user = userEvent.setup();

        const {container} = render(
            <EnterpriseProvider>
                <RegisterEnterprise/>
            </EnterpriseProvider>
        );

        let enterprise1 = {
            fullName: 'Gabriel Henrique',
            email: 'gabrielhprdeveloper12345@gmail.com',
            phone: '11934148305',
            whatsapp: '11934148305',
            password: '&N61al97',
            passwordConfirmation: '&N61al97',
            enterpriseName: 'Super Bolos',
            location: 'Osasco',
            address: 'Rua Victor Brecheret',
            addressNumber: '303',
            instagram: '@gabrielhpr',
            facebook: 'gabriel face',
            website: 'www.superbolos.com.br',
            partyType: 'Infantil',
            adDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a mi erat. In id erat finibus, consequat neque id, maximus massa. Fusce tincidunt non odio et tincidunt. Pellentesque facilisis tempor velit vel molestie. In feugiat luctus ipsum condimentum consectetur. Mauris non bibendum mauris justo.',
            serviceCategory: 'Prestador de serviço',
            serviceSpecificCategory: 'Bolos',
            category: 'Servico',
            q1: '35',
            q2: '3',
            q3: '10',
            q4: 'Bolos fake e decorados',
            q5: 'Sim',
            q6: '',
            q7: 'Sim',
            q8: '',
            q9: 'Outros produtos',
            q10: 'Sim',
            q11: '',
            q12: 'Sim',
            q13: '',
            q14: 'Cartão de crédito'
        }
       
        // Começa 

        // Próximo passo
        await user.click( screen.getByText('Avançar') );

        let input1 = (await screen.findByText('Nome completo')).parentElement.lastElementChild;
        await user.type(input1, enterprise1.fullName);

        let input2 = (screen.getByText('E-mail')).parentElement.lastElementChild;
        await user.type(input2, enterprise1.email);

        let input3 = (screen.getByText('Telefone/Celular')).parentElement.children[1];
        await user.type(input3, enterprise1.phone);

        let input4 = (screen.getByText('WhatsApp')).parentElement.children[1];
        await user.type(input4, enterprise1.whatsapp);

        let input5 = screen.getByRole('checkbox');//.parentElement.lastElementChild;
        await user.click(input5);

        // Próximo passo
        await user.click( screen.getByText('Avançar') );

        let input6 = (await screen.findByText('Senha')).parentElement.children[1];
        await user.type(input6, enterprise1.password);

        let input7 = (screen.getByText('Confirme a sua senha')).parentElement.children[1];
        await user.type(input7, enterprise1.passwordConfirmation);

        // Próximo passo
        await user.click( screen.getByText('Avançar') );

        let input8 = (await screen.findByText('Nome da empresa')).parentElement.children[1];
        await user.type(input8, enterprise1.enterpriseName);

        let input9 = (screen.getByText('Localização da empresa')).parentElement.children[1];
        await user.click(input9);
        let input10 = (screen.getByText(enterprise1.location, {exact: false}));
        await user.click(input10);

        let input11 = (screen.getByText('Endereço')).parentElement.children[1];
        await user.type(input11, enterprise1.address);

        let input12 = (screen.getByText('Número de endereço')).parentElement.children[1];
        await user.type(input12, enterprise1.addressNumber);

        // Próximo passo
        await user.click( screen.getByText('Avançar') );

        let input13 = (await screen.findByText('Instagram')).parentElement.children[1];
        await user.type(input13, enterprise1.instagram);

        let input14 = (screen.getByText('Facebook')).parentElement.children[1];
        await user.type(input14, enterprise1.facebook);

        let input15 = (screen.getByText('Site Próprio')).parentElement.children[1];
        await user.type(input15, enterprise1.website);

        // Próximo passo
        await user.click( screen.getByText('Avançar') );

        let input16 = (await screen.findByText(enterprise1.partyType));//.parentElement.children[1];
        await user.click(input16);

        // Próximo passo
        await user.click( screen.getByText('Avançar') );

        let input17 = (await screen.findByText('Descrição')).parentElement.children[1];
        await user.type(input17, enterprise1.adDescription);

        // Próximo passo
        await user.click( screen.getByText('Avançar') );

        let input18 = (await screen.findByText(enterprise1.serviceCategory));//.parentElement.children[1];
        await user.click(input18);

        // Próximo passo
        await user.click( screen.getByText('Avançar') );

        let input19 = (await screen.findByText(enterprise1.serviceSpecificCategory));//.parentElement.children[1];
        await user.click(input19);

        await user.click( screen.getByText('Avançar') );

        const files = [
            new File(['foto1'], '../../Images/foto1.jpg', {type: 'image/jpg'}),
            new File(['foto2'], '../../Images/foto2.jpg', {type: 'image/jpg'}),
            new File(['foto3'], '../../Images/foto3.jpg', {type: 'image/jpg'}),
            new File(['foto4'], '../../Images/foto4.jpg', {type: 'image/jpg'}),
            new File(['foto5'], '../../Images/foto5.jpg', {type: 'image/jpg'}),
        ];
        let input20 = ( (await screen.findByText('Upload de Fotos')).parentElement.parentElement.parentElement.lastElementChild as HTMLInputElement);

        await user.upload(input20, files);

        await user.click( screen.getByText('Avançar') );

        for (let index = 0; index < specificQuestions[enterprise1.category][enterprise1.serviceSpecificCategory].length; index++) {
            let el = specificQuestions[enterprise1.category][enterprise1.serviceSpecificCategory][index];
            if( el.type == 'input' ) {
                let inputGeneral = ( await screen.findByText( el.question ) ).parentElement.lastElementChild.firstElementChild.lastElementChild;
                await user.type( inputGeneral, enterprise1[el.name[0]]);
                console.log('result do inputGeneral');
                console.log( inputGeneral.nodeValue );
            }
            else if( el.type == 'textarea' ) {
                let inputGeneral = ( await screen.findByText( el.question ) ).parentElement.lastElementChild.firstElementChild.firstElementChild;
                await user.type( inputGeneral, enterprise1[ el.name[0] ]);
            }
            else if( el.type == 'radio' ) {
                let inputGeneral = ( await screen.findByText( el.question ) ).parentElement.lastElementChild.firstElementChild.firstElementChild.firstElementChild;
                await user.click( inputGeneral );
            }          
        }

        await user.click( await screen.findByText('Finalizar') );

        await waitFor(() => {
            expect( screen.getByText('Finalizar') ).toBeInTheDocument();
        });
    })
});
