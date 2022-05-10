import { Box, Flex, Text, Input, Link as NavLink, Button, Menu, MenuButton, MenuList, MenuOptionGroup, MenuItemOption, useBreakpointValue, FormErrorMessage, FormControl, Checkbox } from "@chakra-ui/react";
import Image from 'next/image';
import { useEffect, useState } from "react";
import PessoasFesta from '../../../assets/imgs/pessoas-festa.jpg';
import { useRouter } from "next/router";
import { Header } from "../../../components/Header";
import { useUserAuthContext } from "../../../context/userContext";
import { locationMap, locationMapUser, typeOfParties } from "../../../utils/typeOfParties";
import { Footer } from "../../../components/Footer";
import { Sidebar } from "../../../components/Sidebar";
import { FlashMessageComponent } from "../../../components/FlashMessageComponent";
import { userRegisterDataFormErrorNullState, userRegisterDataFormErrorProps, userRegisterDataNullState, userRegisterDataProps } from "../../../utils/userInterface";
import * as yup from 'yup';
import { userRegisterFormSchema, userRegisterPasswordSchema } from "../../../utils/validations";

export default function registerUser() {
    const [userRegisterData, setUserRegisterData] = useState<userRegisterDataProps>(userRegisterDataNullState);
    const [formErrorsUserRegister, setFormErrorsUserRegister] = useState<userRegisterDataFormErrorProps>(userRegisterDataFormErrorNullState);

    const { registerUser } = useUserAuthContext();
    const [menuWhere, setMenuWhere] = useState('none');
    const routerNext = useRouter();
    const isMobileVersion = useBreakpointValue({
        base: true,
        lg: false,
    });
    
    // Close dropdown menu on click outside
    useEffect(() => {
        document.addEventListener('mouseup', function (e) {
            var menu1 = document.getElementById('menuLocation');

            if (!menu1?.contains(e.currentTarget)) {
                setMenuWhere('none');
            }
        }.bind(this));
    },[]);

    function handleChange( event: any ) {
        setUserRegisterData({...userRegisterData, [event.currentTarget.name]: event.currentTarget.value });
        console.log( userRegisterData );
    }

    async function handleValidation( fields: Array<string>, schemaForm: any, setErrorFunction: any, data: any ) {
        console.log(fields);

        // Reset errors message
        fields.map((el, index) => {
            setErrorFunction((formE) => ({...formE, [el]:''}));
        })

        // Error messages
        await fields.map(async (el,index) => {
            await schemaForm
            .validateAt( el, data)
            .catch((err) => {
                setErrorFunction((formE) => ({...formE, [el]:err.errors[0]}));
                console.log(err);
            });
        });

        let validForm = true;

        // Check if can go to the next step
        fields.map( (el, index) => {
            
            let isValidField = yup.reach( schemaForm, el )
            .isValidSync( data[el] );
            console.log(isValidField);

            validForm = validForm && isValidField;                
        });

        console.log('validForm');
        console.log(validForm);
        // If there is no error its validated
        return validForm;       
    }
    
    async function handleSubmit( event: any ) {

        // VALIDATE GENERAL
        let isValidGeneral = await handleValidation(
            ['fullName', 'email', 'phone', 'whatsapp', 'location', 'accept'],
            userRegisterFormSchema,
            setFormErrorsUserRegister,
            userRegisterData
        );

        // VALIDATE PASSWORD
        let fields = ['password', 'passwordConfirmation'];

        //Reset errors message
        fields.map((el, index) => {
            setFormErrorsUserRegister((formE) => ({...formE, [el]:''}));
        })

        // Error messages
        await fields.map(async (el,index) => {
            await userRegisterPasswordSchema
            .validateAt( el, userRegisterData)
            .catch((err) => {
                setFormErrorsUserRegister((formE) => ({...formE, [el]:err.errors[0]}));
                console.log(err);
            });
        });

        // Validate
        let isValidPassword = await userRegisterPasswordSchema
        .isValid({password:userRegisterData.password, passwordConfirmation:userRegisterData.passwordConfirmation})
        .then((val) =>{
            return val;
        });

        if( isValidGeneral && isValidPassword ) {
            console.log('Entrou handleSubmitRegister');
            await registerUser( userRegisterData, true );
            console.log('Saiu handleSubmitRegister');
        }

    }

    // Used in Menu search
    function searchFunction( event: any, menuId: string ) {
        console.log( event.currentTarget.value );
        let inputValue = event.currentTarget.value.toUpperCase();
        let menu = document.getElementById( menuId );
        let itemList = menu.getElementsByTagName("button");
        
        for (let i = 0; i < itemList.length; i++) {
            if (itemList[i].innerHTML.toUpperCase().indexOf(inputValue) > -1) {
                itemList[i].style.display = "";
            } 
            else {
                itemList[i].style.display = "none";
            }
        }
    }

    return (
        <Box>
            {/* Header */}
            <Header name="" position='relative' />
            
            <FlashMessageComponent/>

            <Sidebar/>

            <Flex w='100vw' h='auto' position='relative' 
                justifyContent='center'
            >
               
                <Image src={PessoasFesta}
                    layout='fill'
                    objectFit='cover'
                    objectPosition='center'
                />
                
                {/* Shadow */}
                <Flex 
                    w='100%' 
                    h='100%'
                    justifyContent={{base:'flex-start', lg:'center'}}
                    bg={{base:'brand.white', lg:'rgba(0,0,0,0.20)'}}
                    zIndex={3}
                >

                    <Flex w={{base:'100%', lg:'75%'}}
                        h='100%' 
                        justifyContent={{base:'center', lg:'space-between'}}
                        alignItems='center'
                        my={{base:'0', lg:'10'}}
                    >
                        
                        {/* DESKTOP VERSION */}
                        <Flex direction='column' w='50%'
                            display={{base:'none', lg:'flex'}}
                        >
                            <Flex direction='column' mb='5'
                                textColor='white'
                            >
                                <Text as='h2' fontSize={30} fontWeight={600}
                                    mb='2'
                                >
                                    Cadastre-se e planeje a sua festa conosco
                                </Text>
                                <Text as='h3' fontSize={20} fontWeight={500}>
                                    Peça orçamentos pela 
                                    plataforma, avalie os prestadores de serviço, ache o melhor
                                    fornecedor para o que a sua festa precisa
                                </Text>
                            </Flex>
                        </Flex>
                        
                        {/* Form Login */}
                        <Flex 
                            direction="column"
                            width={{base:'90%', lg:'40%'}}
                            height='80%'
                            py='8'
                            px={{base:'0', lg:"10"}}
                            justifyContent='center'
                            //alignItems='center'
                            bg={{base:"brand.white", lg:'rgba(255,255,255,0.95)'}}
                            //boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                            borderRadius={8} 
                            fontSize={20}
                            //zIndex={5}
                        >
                            <Text as="h2" textAlign="center" my="1" fontSize={22} 
                                fontWeight={500}
                            >
                                INSCREVA-SE
                            </Text>


                            {/* Full name */}
                            <Flex direction="column" mt="3">
                                <Text color="brand.white_40" fontSize={19}>
                                    Nome completo
                                </Text>

                                <FormControl 
                                    isInvalid={formErrorsUserRegister.fullName != '' ? true : false}
                                >
                                    <Input 
                                        name="fullName"
                                        value={userRegisterData.fullName}
                                        onChange={(event: any) => {
                                            handleChange(event);
                                            setFormErrorsUserRegister({...formErrorsUserRegister, fullName: ''});
                                        }}
                                    />
                                    <FormErrorMessage>
                                        {formErrorsUserRegister.fullName}
                                    </FormErrorMessage> 
                                </FormControl>
                            </Flex>
                            
                            {/* E-mail */}
                            <Flex direction="column" mt="3">
                                <Text color="brand.white_40" fontSize={19}>
                                    E-mail
                                </Text>

                                <FormControl 
                                    isInvalid={formErrorsUserRegister.email != '' ? true : false}
                                >
                                    <Input placeholder="email@example.com"
                                        name="email"
                                        value={userRegisterData.email}
                                        onChange={(event: any) => {
                                            handleChange(event);
                                            setFormErrorsUserRegister({...formErrorsUserRegister, email: ''});
                                        }}
                                    />
                                    <FormErrorMessage>
                                        {formErrorsUserRegister.email}
                                    </FormErrorMessage> 
                                </FormControl>
                            </Flex>

                            {/* Password */}
                            <Flex direction="row" mt='3'
                                alignItems='flex-end'
                            >
                                <Flex direction="column"
                                >
                                    <Text color="brand.white_40" fontSize={19}>
                                        Senha
                                    </Text>

                                    <FormControl 
                                        isInvalid={formErrorsUserRegister.password != '' ? true : false}
                                    >
                                        <Input placeholder="********"
                                            name="password"
                                            type="password"
                                            value={userRegisterData.password}
                                            onChange={(event: any) => {
                                                handleChange(event);
                                                setFormErrorsUserRegister({...formErrorsUserRegister, password: ''});
                                            }}
                                        />
                                        <FormErrorMessage>
                                            {formErrorsUserRegister.password}
                                        </FormErrorMessage> 
                                    </FormControl>                                        
                                </Flex>

                                <Flex direction="column" ml='2'
                                >
                                    <Text color="brand.white_40" fontSize={19}>
                                        Confirmação da Senha
                                    </Text>

                                    <FormControl 
                                        isInvalid={formErrorsUserRegister.passwordConfirmation != '' ? true : false}
                                    >
                                        <Input placeholder="********"
                                            name="passwordConfirmation"
                                            type="password"
                                            value={userRegisterData.passwordConfirmation}
                                            onChange={(event: any) => {
                                                handleChange(event);
                                                setFormErrorsUserRegister({...formErrorsUserRegister, passwordConfirmation: ''});
                                            }}
                                        />
                                        <FormErrorMessage>
                                            {formErrorsUserRegister.passwordConfirmation}
                                        </FormErrorMessage> 
                                    </FormControl>                                         
                                </Flex>
                            </Flex>

                            {/* Phone */}
                            <Flex direction="column"
                                mt="3"
                            >
                                <Text color="brand.white_40" fontSize={19}>
                                    Telefone
                                </Text>

                                <FormControl 
                                    isInvalid={formErrorsUserRegister.phone != '' ? true : false}
                                >
                                    <Input 
                                        name="phone"
                                        type="text"
                                        value={userRegisterData.phone}
                                        onChange={(event: any) => {
                                            handleChange(event);
                                            setFormErrorsUserRegister({...formErrorsUserRegister, phone: ''});
                                        }}
                                        
                                    />
                                    <FormErrorMessage>
                                        {formErrorsUserRegister.phone}
                                    </FormErrorMessage> 
                                </FormControl>  
                            </Flex>

                            {/* Whatsapp */}
                            <Flex direction="column"
                                mt="3"
                            >
                                <Text color="brand.white_40" fontSize={19}>
                                    Whatsapp
                                </Text>

                                <FormControl 
                                    isInvalid={formErrorsUserRegister.whatsapp != '' ? true : false}
                                >
                                    <Input 
                                        name="whatsapp"
                                        type="text"
                                        value={userRegisterData.whatsapp}
                                        onChange={(event: any) => {
                                            handleChange(event);
                                            setFormErrorsUserRegister({...formErrorsUserRegister, whatsapp: ''});
                                        }}
                                    />
                                    <FormErrorMessage>
                                        {formErrorsUserRegister.whatsapp}
                                    </FormErrorMessage> 
                                </FormControl> 
                            </Flex>

                            {/* Location */}
                            <Flex direction="column"
                                mt="3"
                            >
                                <Text color="brand.white_40" fontSize={19}>
                                    Onde reside
                                </Text>

                                <FormControl 
                                    isInvalid={formErrorsUserRegister.location != '' ? true : false}
                                >
                                    <Flex direction='column'
                                        position='relative'
                                    >
                                        {/* Onde - Localização */}
                                        <Input 
                                            _focus={{outline:'none'}}
                                            value={userRegisterData.location}
                                            onChange={(event: any) => {
                                                setUserRegisterData({...userRegisterData, location: event.currentTarget.value});
                                                searchFunction(event, "menuWhere");
                                            }}
                                            onClick={() => {
                                                setMenuWhere('onclick')
                                            }}
                                        />
                                        <Box 
                                            id='menuLocation'
                                            height={230} 
                                            width={{base:'85vw', lg:350}}
                                            display={menuWhere}
                                            position='absolute'
                                            overflowY="scroll"
                                            bg='brand.white'
                                            top={10}
                                            //mt={{base:4, lg: 6}}
                                            borderRadius={10}
                                            zIndex={3}
                                        >
                                            <Flex direction="column" id="menuWhere"
                                                h='100%'
                                            >
                                                {
                                                Object.values(locationMapUser).map((el, i) => {
                                                    return(
                                                        <Button
                                                            bg='white'
                                                            h='25%'
                                                            py='4'
                                                            px='5'
                                                            borderRadius={0}
                                                            _focus={{outline:'none'}}
                                                            _hover={{bg:'rgba(0,0,0,0.1)'}}
                                                            //name='partyType'
                                                            //value={el.value}
                                                            onClick={(event) => {
                                                                setUserRegisterData({...userRegisterData, location: el.textToShow, city: el.city, state: el.state, country: el.country})
                                                                setFormErrorsUserRegister({...formErrorsUserRegister, location: ''});
                                                                setMenuWhere('none');
                                                            }}
                                                        >
                                                            <Text
                                                                width='100%'
                                                                textAlign='left'
                                                                fontWeight={400}
                                                                fontSize={18}
                                                            >
                                                                {el.textToShow}
                                                            </Text>
                                                        </Button>
                                                    );
                                                })
                                                }
                                            </Flex>
                                        </Box>
                                    </Flex>      
                                    
                                    <FormErrorMessage>
                                        {formErrorsUserRegister.location}
                                    </FormErrorMessage> 
                                </FormControl> 
                            </Flex>

                            {/* ACEITE */}
                            <Flex direction='column' mt='3'>
                                <FormControl isInvalid={formErrorsUserRegister.accept != '' ? true : false}>                                
                                    <Checkbox
                                        name='accept'
                                        onChange={(event: any) => {
                                            setUserRegisterData({...userRegisterData, [event.currentTarget.name]: String(event.currentTarget.checked)});
                                            setFormErrorsUserRegister({...formErrorsUserRegister, [event.currentTarget.name]: ''});
                                        }}
                                        isChecked={userRegisterData.accept == 'true' ? true : false}
                                    >
                                        Aceito os <NavLink href='https://www.google.com.br' color='brand.blue' fontWeight={500} isExternal>Termos de uso</NavLink> e de <NavLink href='https://www.google.com.br' color='brand.blue' fontWeight={500} isExternal>privacidade</NavLink>.
                                    </Checkbox>
                                    
                                    <FormErrorMessage>
                                        {formErrorsUserRegister.accept}
                                    </FormErrorMessage>
                                </FormControl>
                            </Flex>     

                            <Button 
                                mt="8"
                                bg="brand.red"
                                color="brand.white"
                                fontSize={18}
                                py="6"
                                onClick={handleSubmit}
                            >
                                Cadastrar
                            </Button>
                            
                        </Flex>
                    
                    </Flex>

                </Flex>

            </Flex>

            <Footer/>
        </Box>
    );
}