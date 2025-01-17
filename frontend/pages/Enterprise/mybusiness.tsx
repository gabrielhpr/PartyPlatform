import { Box, Flex, Grid, GridItem, Icon, Spinner, Text } from "@chakra-ui/react";
import { RiArrowRightSLine } from "react-icons/ri";
import { TopMenuEnterprise } from "../../components/Enterprise/TopMenuEnterprise";
import { Header } from "../../components/Header";
import Image from 'next/image';
import { LeftMenuEdit } from "../../components/Enterprise/Ads/Edit/LeftMenu";
import { useEffect, useState } from "react";
import { AdDetailsEdit } from "../../components/Enterprise/Ads/Edit/AdDetails";
import api from "../../utils/api";
import { useRouter } from "next/router";
import { LeftMenuMyBusiness } from "../../components/Enterprise/MyBusiness/LeftMenu";
import { BusinessInfoMyBusiness } from "../../components/Enterprise/MyBusiness/BusinessInfo";
import { Footer } from "../../components/Footer";
import { LocationInfoMyBusiness } from "../../components/Enterprise/MyBusiness/LocationInfoMyBusiness";
import { useEnterpriseAuthContext } from "../../context/enterpriseContext";
import { NotAuthorizedComponent } from "../../components/NotAuthorizedComponent";
import * as yup from 'yup';
import { enterpriseRegisterMyBusinessFormSchema, enterpriseRegisterPasswordSchema } from "../../utils/validations";
import { locationMap, typeOfParties } from "../../utils/typeOfParties";
import { Sidebar } from "../../components/Sidebar";
import { FlashMessageComponent } from "../../components/FlashMessageComponent";
import Head from 'next/head';


interface enterpriseDataInterf {
    id: number;
    // Contact Data
    fullName: string;
    email: string;
    phone: string;
    whatsapp?: string;
    // Access Data
    password: string;
    passwordConfirmation: string;
    // About the enterprise
    enterpriseName: string;
    location: string;
    country: string;
    state: string;
    city: string;
    address: string;
    addressNumber: number;
    // Enterprise Social Media
    instagram?: string;
    facebook?: string;
    website?: string;
    
    enterpriseCategory: string;
    enterpriseSpecificCategory: string;
}

const enterpriseDataNullState = {
    id: 0,
    // Contact Data
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    // Access Data
    password: '',
    passwordConfirmation: '',
    // About the enterprise
    enterpriseName: '',
    location: '',
    country: '',
    state: '',
    city: '',
    address: '',
    addressNumber: 0,

    // Enterprise Social Media
    instagram: '',
    facebook: '',
    website: '',

    enterpriseCategory: '',
    enterpriseSpecificCategory: '',
}

interface enterpriseDataFormErrorInterf {
    // Contact Data
    fullName: string;
    email: string;
    phone: string;
    whatsapp?: string;
    // Access Data
    password: string;
    passwordConfirmation: string;
    // About the enterprise
    enterpriseName: string;
    
    // Just for showing the user
    location: string;

    city: string;
    state: string;
    country: string;
    address: string;
    addressNumber: string;
    // Enterprise Social Media
    instagram?: string;
    facebook?: string;
    website?: string;
    
    partyMainFocus: string;
    serviceDescription: string;
    enterpriseCategory: string;
    enterpriseSpecificCategory: string;

    photos: any[];

    q1: string;
    q2: string;
    q3: string;
    q4: string;
    q5: string;
    q6: string;
    q7: string;
    q8: string;
    q9: string;
    q10: string;
    q11: string;
    q12: string;
    q13: string;
    q14: string;
    q15: string;
    q16: string;
    q17: string;
    q18: string;
    q19: string;
    q20: string;
    q21: string;
    q22: string;
    q23: string;
    q24: string;
    q25: string;
    q26: string;
    q27: string;
    q28: string;
    q29: string;
    q30: string;
    q31: string;
    q32: string;
    q33: string;
    q34: string;
    q35: string;
    q36: string;
    q37: string;
    q38: string;
    q39: string;
    q40: string;
    q41: string;
    q42: string;
    q43: string;
    q44: string;
    q45: string;
    q46: string;
    q47: string;
    q48: string;
    q49: string;
    q50: string;
}

const enterpriseDataFormErrorNullState = {
    // Contact Data
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    // Access Data
    password: '',
    passwordConfirmation: '',
    // About the enterprise
    enterpriseName: '',
    location: '',
    city: '',
    state: '',
    country: '',
    address: '',
    addressNumber: '',

    // Enterprise Social Media
    instagram: '',
    facebook: '',
    website: '',

    partyMainFocus: '',
    serviceDescription: '',
    enterpriseCategory: '',
    enterpriseSpecificCategory: '',

    photos: [],

    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
    q8: '',
    q9: '',
    q10: '',
    q11: '',
    q12: '',
    q13: '',
    q14: '',
    q15: '',
    q16: '',
    q17: '',
    q18: '',
    q19: '',
    q20: '',
    q21: '',
    q22: '',
    q23: '',
    q24: '',
    q25: '',
    q26: '',
    q27: '',
    q28: '',
    q29: '',
    q30: '',
    q31: '',
    q32: '',
    q33: '',
    q34: '',
    q35: '',
    q36: '',
    q37: '',
    q38: '',
    q39: '',
    q40: '',
    q41: '',
    q42: '',
    q43: '',
    q44: '',
    q45: '',
    q46: '',
    q47: '',
    q48: '',
    q49: '',
    q50: ''
}

export default function MyBusinessEnterprise() {
    const { authenticatedEnterprise } = useEnterpriseAuthContext();
    const [enterpriseData, setEnterpriseData] = useState<enterpriseDataInterf>(enterpriseDataNullState);
    const [componentToLoad, setComponentToLoad] = useState("DadosDaEmpresa");
    const [hasToUpdate, setHasToUpdate] = useState(false);    
    const [formErrors, setFormErrors] = useState<enterpriseDataFormErrorInterf>( enterpriseDataFormErrorNullState );

    // Get Enterprise Data
    useEffect(() => {
        if( !authenticatedEnterprise ) {
            return;
        }

        const token = localStorage.getItem("tokenEnterprise");

        // Get enterprise data
        api.get("/enterprise/myenterprise", {
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            setEnterpriseData( response.data.enterpriseData );
        })
        .catch( err => {
            //console.log( err );
        })
        
    }, [authenticatedEnterprise]);


    // Update Enterprise Data
    useEffect(() => {
        if( !authenticatedEnterprise ) {
            return;
        }

        if ( !hasToUpdate ) {            
            return;
        }

        const token = localStorage.getItem("tokenEnterprise");

        // const formData = new FormData;
    
        // Object.keys(enterpriseData).forEach((key:any) => {
        //     if(key == 'photosNew') {
        //         console.log('entrou no photos object key');
        //         formData.append('photo', enterpriseData[key][0]);
        //     }
        //     else {
        //         formData.append(key, enterpriseData[key]);
        //     }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        // })

        api.patch(
        '/enterprise/myenterprise/edit',
            enterpriseData, 
            {
                headers: {
                    "Authorization": `Bearer ${JSON.parse(token)}`
                }
            }
        )
        .catch( err => {
            //console.log( err );
        });
        
        setHasToUpdate(false);

    }, [enterpriseData, hasToUpdate]);

   

    async function saveDataChanged( data: Object ) {
        //console.log( data );
        //console.log('antes do formData');
        //console.log(enterpriseData);

        // VALIDATE THE DATA
        let fields = [
            'email',
            'fullName',  
            'phone', 
            'whatsapp',
            'enterpriseName',
            'instagram', 
            'facebook', 
            'website',
            'location', 
            'address', 
            'addressNumber'
        ];
        let fieldsPassword = [
            'password', 
            'passwordConfirmation'
        ];

        //Reset errors message
        fields.map((el, index) => {
            setFormErrors((formE) => ({...formE, [el]:''}));
        });
        fieldsPassword.map((el, index) => {
            setFormErrors((formE) => ({...formE, [el]:''}));
        });

        //console.log('cleaned formErrors');
        ////console.log(formErrors);

        ////console.log(enterpriseData);
        // Error messages
        await fields.map(async (el,index) => {
            await enterpriseRegisterMyBusinessFormSchema
            .validateAt( el, enterpriseData )
            .catch((err) => {
                setFormErrors((formE) => ({...formE, [el]:err.errors[0]}));
                ////console.log(err);
            });
        });
        await fieldsPassword.map(async (el,index) => {
            await enterpriseRegisterPasswordSchema
            .validateAt( el, enterpriseData )
            .catch((err) => {
                setFormErrors((formE) => ({...formE, [el]:err.errors[0]}));
                ////console.log(err);
            });
        });

        //console.log( 'formErrors' );
        //console.log( formErrors );

        // Validate
        return await enterpriseRegisterMyBusinessFormSchema
        .isValid({
            email: enterpriseData.email,
            fullName: enterpriseData.fullName,  
            phone: enterpriseData.phone, 
            whatsapp: enterpriseData.whatsapp,
            enterpriseName: enterpriseData.enterpriseName,
            instagram: enterpriseData.instagram, 
            facebook: enterpriseData.facebook, 
            website: enterpriseData.website,
            location: enterpriseData.location, 
            address: enterpriseData.address, 
            addressNumber: enterpriseData.addressNumber
        })
        .then( async (val) => {
            if( val == true ) {
                // Validou bemmmm
                //console.log('Validou bemmm - Passou pelo general');
                //console.log( enterpriseData );
                // Validate the password
                if( enterpriseData.password != '' ) {
                    //console.log('Vai validar a senha');
                    return await enterpriseRegisterPasswordSchema
                    .isValid({
                        password: enterpriseData.password,
                        passwordConfirmation: enterpriseData.passwordConfirmation
                    })
                    .then((val2) => {
                        if( val == true ) {
                            //console.log('Validou a senha com sucesso');
                            // Update the data in database
                            setHasToUpdate(true);
                            //console.log('antes do formData');
                            //console.log( enterpriseData );
                            return true;
                        }
                        else {
                            //console.log('Não validou a senha com sucesso');
                            //Update the data with previous data changed
                            // Object.keys( data ).map((key, index) => {
                            //     setEnterpriseData((prevEnterpriseData) => ({...prevEnterpriseData, [key]: prevEnterpriseDataState[key]}) );
                            // });
                            return false;
                        }
                    })
                }
                else {
                    //console.log('Não vai validar a senha');
                    setHasToUpdate(true);
                    //console.log('antes do formData');
                    ////console.log( enterpriseData );
                    return true;
                }

            }
            else {
                //console.log('Não validou - general');
                //Update the data with previous data changed
                // Object.keys( data ).map((key, index) => {
                //     setEnterpriseData((prevEnterpriseData) => ({...prevEnterpriseData, [key]: prevEnterpriseDataState[key]}) );
                // });
                return false;
            }
        });
    }

    function handleClickMenu( event: any ) {
        //console.log( event.currentTarget.value );
        setComponentToLoad( event.currentTarget.value );
    }

    if( authenticatedEnterprise ) {
        return (
            <Box>
                <Head>
                    <title>Meu Negócio</title>
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <meta name="description" content="Modifique os dados referentes ao seu negócio."/>
                    <meta property="og:title" content="Meu Negócio"/>
                    <meta property="og:description" content="Modifique os dados referentes ao seu negócio."/>
                    <meta property="og:url" content="https://www.festafy.com.br/Enterprise/mybusiness"/>
                    <meta property="og:type" content="website"/>
                </Head>
                <Header name="" position="relative" />
                <FlashMessageComponent/>
                <TopMenuEnterprise />
                <Sidebar/>
    
                {
                enterpriseData.id != 0 
                ?
                <Flex 
                    mt="5"
                    mb='14'
                    boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                    borderRadius={8} 
                    maxWidth={1200}
                    justifyContent="space-between"
                    mx="auto"
                    h='auto' 
                    w={{base:'95%', lg:'80%'}}
                    direction={{base:'column', lg:'row'}}
                >
                    {/* Left Menu 
                */}
                    <LeftMenuMyBusiness 
                        propertyName={enterpriseData.enterpriseName}
                        serviceCategory={enterpriseData.enterpriseCategory}
                        serviceSpecificCategory={enterpriseData.enterpriseSpecificCategory}
                        handleOnClick={handleClickMenu}
                        menuOptions={{
                            DadosDaEmpresa : {value: 'DadosDaEmpresa', textToShow: 'Dados da empresa'},
                            Localizacao: {value: 'Localizacao', textToShow: 'Localização'}
                        }}
                        selectedOption={componentToLoad}
                        w={{base:'100%', lg:'25%'}}
                    />
    
                    {/* Forms */}
                    <Flex
                        as="form"                    
                        px="5" pb="5"
                        w={{base:'100%', lg:'75%'}}
                    >
                        
                        {
                            componentToLoad == "DadosDaEmpresa"
                            ?
                            <BusinessInfoMyBusiness
                                email={enterpriseData.email}
                                password={enterpriseData.password}
                                passwordConfirmation={enterpriseData.passwordConfirmation}
                                fullName={enterpriseData.fullName}
                                phone={enterpriseData.phone}
                                whatsapp={enterpriseData.whatsapp}
                                enterpriseName={enterpriseData.enterpriseName}
                                enterpriseCategory={enterpriseData.enterpriseCategory}
                                enterpriseSpecificCategory={enterpriseData.enterpriseSpecificCategory}
                                instagram={enterpriseData.instagram}
                                facebook={enterpriseData.facebook}
                                website={enterpriseData.website}
                                formErrors={formErrors}
                                setData={setEnterpriseData}
                                saveDataChanged={saveDataChanged}
                            />
                            :
                            componentToLoad == "Localizacao"
                            ?
                            <LocationInfoMyBusiness
                                location={enterpriseData.location}
                                address={enterpriseData.address}
                                addressNumber={enterpriseData.addressNumber}
                                formErrors={formErrors}
                                setData={setEnterpriseData}
                                saveDataChanged={saveDataChanged}
                            />
                            :
                            <>
                            </>                                            
                        }
    
                    
                    </Flex>
    
                </Flex>
                :
                <Flex
                    h='70vh'
                    direction='column'
                    alignItems='center'
                    justifyContent='center'
                >
                    <Text
                        fontSize={24}
                        fontWeight={400}
                        mb='7'
                    >
                        Carregando
                    </Text>
                    <Spinner size='xl' />
                </Flex>
                }
    
                <Footer/>
            </Box>
        );
    }
    else {
        return (
            <Box w='100vw' h='100vh'> 
                <Head>
                    <title>Meu Negócio</title>
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <meta name="description" content="Modifique os dados referentes ao seu negócio."/>
                    <meta property="og:title" content="Meu negócio"/>
                    <meta property="og:description" content="Modifique os dados referentes ao seu negócio."/>
                    <meta property="og:url" content="https://www.festafy.com.br/Enterprise/mybusiness"/>
                    <meta property="og:type" content="website"/>
                </Head>
                <NotAuthorizedComponent link='/Enterprise/enterpriseAccess' />
            </Box>
        )
    }
}