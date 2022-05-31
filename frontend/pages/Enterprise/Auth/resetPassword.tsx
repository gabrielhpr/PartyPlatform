import { Box, Button, Flex, FormControl, FormErrorMessage, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TextSpanInput } from "../../../components/Enterprise/TextSpanInput";
import { FlashMessageComponent } from "../../../components/FlashMessageComponent";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import useFlashMessage from "../../../hooks/useFlashMessage";
import api from "../../../utils/api";
import { enterpriseRegisterPasswordSchema } from "../../../utils/validations";

export default function ResetPasswordEnterprise() {
    const [enterprisePassword, setEnterprisePassword] = useState({password: '', passwordConfirmation: ''});
    const [formErrorsEnterprisePassword, setFormErrorsEnterprisePassword] = useState({password: '', passwordConfirmation: ''});
    const routerNext = useRouter();
    const [validToken, setValidToken] = useState(false);
    const { setFlashMessage } = useFlashMessage();


    function handleChange( event: any ) {
        setEnterprisePassword({...enterprisePassword, [event.currentTarget.name]: event.currentTarget.value});
        setFormErrorsEnterprisePassword({...formErrorsEnterprisePassword, [event.currentTarget.name]: ''});
    }

    async function handleSubmitNewPassword() {
        let { token } = routerNext.query;
        if( token == undefined ) {
            return;
        }

        //*--------------- VALIDATION ----------------*// 
        let fields = ['password', 'passwordConfirmation'];

        //Reset errors message
        fields.map((el, index) => {
            setFormErrorsEnterprisePassword((formE) => ({...formE, [el]:''}));
        })

        // Error messages
        await fields.map(async (el,index) => {
            await enterpriseRegisterPasswordSchema
            .validateAt( el, enterprisePassword)
            .catch((err) => {
                setFormErrorsEnterprisePassword((formE) => ({...formE, [el]:err.errors[0]}));
                //console.log(err);
            });
        });

        // Validate
        let passwordIsValid = await enterpriseRegisterPasswordSchema
        .isValid( enterprisePassword )
        .then((val) =>{
            if( val ) {
                return true;
            }
        })
        .catch((err) => {
            return false;
        });
        //*--------------------------------------------*// 

        if( passwordIsValid ) {
            let msgText = 'Senha alterada com sucesso!';
            let msgType = 'success';

            try {
                await api.patch(
                '/resetPasswordEnterprise',
                {
                    password: enterprisePassword.password,
                    passwordConfirmation: enterprisePassword.passwordConfirmation,
                    token: token
                }
                )
                .then((res) => {
                    setTimeout(() => {
                        routerNext.push('/Enterprise/enterpriseAccess');                
                    }, 2000);
                });
            }
            catch(err) {
                // tratar o erro
                msgText = err.response.data.message;
                msgType = "error";
                //console.log(err);
            }
            setFlashMessage( msgText, msgType );
        }

        
    }

    useEffect(() => {
        if( !routerNext.isReady ) {
            return;
        }

        let { token } = routerNext.query;
        //console.log( token );

        if( token == undefined ) {
            return;
        }

        api.get('/checkResetPasswordValidityEnterprise', {
            params: {
                token: token
            }
        })
        .then((response) => {
            //console.log('response from server');
            //console.log( response.status );
            setValidToken( true );
        })
        .catch((err) => {
            //console.log('deu ruim');
            //console.log( err );
        }); 
        
    }, [routerNext.query]);

   
    return (
        <Box
        >
            <Header name='' position="relative" />
            <Sidebar/>

            <Flex 
                w='100vw'
                h='90vh'
                justifyContent='center'
                alignItems='center'
                bg='brand.yellow'
                
            >
                {
                validToken
                ?
                <Flex
                    w={{base:'95%', lg:'30%'}}
                    direction='column'
                    boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                    borderRadius={8} 
                    py='4'
                    px='4'
                    bg='brand.white'
                >
                    <Flex direction='column'
                    >
                        <FormControl isInvalid={formErrorsEnterprisePassword.password != '' ? true : false}>
                            <TextSpanInput
                                textToShow="Nova Senha"
                            />
                            <Input type='password' name='password' 
                                value={enterprisePassword.password} 
                                onChange={handleChange} 
                            />
                            <FormErrorMessage>
                                {formErrorsEnterprisePassword.password}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>

                    <Flex direction='column'
                        mt='2'
                    >
                        <FormControl isInvalid={formErrorsEnterprisePassword.passwordConfirmation != '' ? true : false}>
                            <TextSpanInput
                                textToShow="Confirme a sua nova senha"
                            />
                            <Input type='password' name='passwordConfirmation' 
                                value={enterprisePassword.passwordConfirmation}    
                                onChange={handleChange} 
                            />
                            <FormErrorMessage>
                                {formErrorsEnterprisePassword.passwordConfirmation}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex> 

                    <Button
                        mt='5'
                        bg='brand.red'
                        color='brand.white'
                        fontWeight={500}
                        fontSize={18}
                        onClick={handleSubmitNewPassword}
                    >
                        SALVAR
                    </Button>       
                </Flex>
                :
                <Flex
                    bg='brand.white'
                    h='15vh'
                    w={{base:'80%', lg:'40%'}}
                    borderRadius={8}
                    justifyContent='center'
                    alignItems='center'
                    px='4'
                    fontSize={{base:20, lg: 22}}
                    textAlign='center'
                >
                    <Text>
                        O token é inválido ou foi expirado!
                    </Text>
                </Flex>
                }
            </Flex>

            <Footer/> 
        </Box>
    )

    
}
