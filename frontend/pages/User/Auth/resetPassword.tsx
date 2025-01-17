import { Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, Input, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TextSpanInput } from "../../../components/Enterprise/TextSpanInput";
import { FlashMessageComponent } from "../../../components/FlashMessageComponent";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { Sidebar } from "../../../components/Sidebar";
import useFlashMessage from "../../../hooks/useFlashMessage";
import api from "../../../utils/api";
import { userRegisterPasswordSchema } from "../../../utils/validations";
import Head from 'next/head';

export default function ResetPasswordUser() {
    const [userPassword, setUserPassword] = useState({password: '', passwordConfirmation: ''});
    const [formErrorsUserPassword, setFormErrorsUserPassword] = useState({password: '', passwordConfirmation: ''});
    const routerNext = useRouter();
    const [validToken, setValidToken] = useState(false);
    const { setFlashMessage } = useFlashMessage();

    function handleChange( event: any ) {
        setUserPassword({...userPassword, [event.currentTarget.name]: event.currentTarget.value});
        setFormErrorsUserPassword({...formErrorsUserPassword, [event.currentTarget.name]: ''});
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
            setFormErrorsUserPassword((formE) => ({...formE, [el]:''}));
        })

        // Error messages
        await fields.map(async (el,index) => {
            await userRegisterPasswordSchema
            .validateAt( el, userPassword)
            .catch((err) => {
                setFormErrorsUserPassword((formE) => ({...formE, [el]:err.errors[0]}));
                //console.log(err);
            });
        });

        // Validate
        let passwordIsValid = await userRegisterPasswordSchema
        .isValid( userPassword )
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
                '/resetPasswordUser',
                {
                    password: userPassword.password,
                    passwordConfirmation: userPassword.passwordConfirmation,
                    token: token
                }
                )
                .then((res) => {
                    //console.log('then do reset password user');
                    //console.log( res );
                    setTimeout(() => {
                        routerNext.push('/User/userAccess');                
                    }, 2000);
                });
            }
            catch(err) {
                // tratar o erro
                msgText = err.response.data.message;
                msgType = "error";
                ////console.log(err);
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

        api.get('/checkResetPasswordValidityUser', {
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
            <Head>
                <title>Alteração da Senha</title>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <meta name="description" content="Alteração da senha do usuário."/>
                <meta property="og:title" content="Alteração da Senha"/>
                <meta property="og:description" content="Alteração da Senha do Usuário na plataforma Festafy."/>
                <meta property="og:url" content="https://www.festafy.com.br/User/Auth/resetPassword"/>
                <meta property="og:type" content="website"/>
            </Head>
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
                    <FlashMessageComponent/>

                    <Flex direction='column'
                    >
                        <FormControl isInvalid={formErrorsUserPassword.password != '' ? true : false}>
                            <TextSpanInput
                                textToShow="Nova Senha"
                            />
                            <Input type='password' name='password' 
                                value={userPassword.password} 
                                onChange={handleChange} 
                            />
                            <FormHelperText>
                                A senha deve ter no mínimo 8 caracteres. Sendo pelo menos 1 letra maiúscula, 
                                1 minúscula, 1 número e 1 caractere especial.
                            </FormHelperText>
                            <FormErrorMessage>
                                {formErrorsUserPassword.password}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>

                    <Flex direction='column'
                        mt='2'
                    >
                        <FormControl isInvalid={formErrorsUserPassword.passwordConfirmation != '' ? true : false}>
                            <TextSpanInput
                                textToShow="Confirme a sua nova senha"
                            />
                            <Input type='password' name='passwordConfirmation' 
                                value={userPassword.passwordConfirmation}    
                                onChange={handleChange} 
                            />
                            <FormErrorMessage>
                                {formErrorsUserPassword.passwordConfirmation}
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
