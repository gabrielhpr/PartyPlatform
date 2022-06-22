import { Alert, AlertIcon, AlertTitle, Box, Button, Flex, Grid, GridItem, Icon, Spinner, Text } from "@chakra-ui/react";
import { RiArrowRightSLine } from "react-icons/ri";
import { TopMenuEnterprise } from "../../../components/Enterprise/TopMenuEnterprise";
import { Header } from "../../../components/Header";
import Image from 'next/image';
import { LeftMenuEdit } from "../../../components/Enterprise/Ads/Edit/LeftMenu";
import { useEffect, useState } from "react";
import { AdDetailsEdit } from "../../../components/Enterprise/Ads/Edit/AdDetails";
import api from "../../../utils/api";
import { useRouter } from "next/router";
import { typeOfParties } from "../../../utils/typeOfParties";
import { useEnterpriseAuthContext } from "../../../context/enterpriseContext";
import { NotAuthorizedComponent } from "../../../components/NotAuthorizedComponent";
import { Footer } from "../../../components/Footer";
import { enterpriseRegisterFormSchema, enterpriseRegisterQuestionsDataSchema } from '../../../utils/validations';
import * as yup from 'yup';
import { FlashMessageComponent } from "../../../components/FlashMessageComponent";
import RUG, { DragArea, DropArea, Card, List } from 'react-upload-gallery';
import { FiUpload } from "react-icons/fi";
import 'react-upload-gallery/dist/style.css' // or scss


interface adDataInterf {
    id: number;
    serviceDescription: string;
    enterpriseCategory: string;
    enterpriseSpecificCategory: string;
    partyMainFocus: string;

    photos: string[];
    photosRemoved: any[];
    photosNew: any[];
    photosNewOrder: any[];

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

const adDataNullState = {
    id: 0,
    serviceDescription: '',
    enterpriseCategory: '',
    enterpriseSpecificCategory: '',
    partyMainFocus: '',

    photos: [],
    photosRemoved: [],
    photosNew: [],
    photosNewOrder: [],

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

    photos: {
        accept: string;
        minLimit: string;
        maxLimit: string;
        size: string;
        minDim: string;
        maxDim: string;
    };

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

    photos: {
        accept: '',
        minLimit: '',
        maxLimit: '',
        size: '', 
        minDim: '',
        maxDim: '' 
    },

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

export default function EditAdsEnterprise() {
    const [componentToLoad, setComponentToLoad] = useState("Detalhes do anúncio");
    const [adData, setAdData] = useState<adDataInterf>( adDataNullState );
    const [enterpriseData, setEnterpriseData] = useState<enterpriseDataInterf>(enterpriseDataNullState);
    const [hasToUpdate, setHasToUpdate] = useState(false);
    const [formErrors, setFormErrors] = useState<enterpriseDataFormErrorInterf>( enterpriseDataFormErrorNullState );
    const routerNext = useRouter();
    const [imagesChanged, setImagesChanged] = useState(false);
    const { authenticatedEnterprise } = useEnterpriseAuthContext();

    // GetData - Ads and enterprise
    useEffect(() => {
        if( authenticatedEnterprise == false ) {
            return;
        }

        if( !routerNext.isReady ) {
            return;
        }

        const token = localStorage.getItem("tokenEnterprise");
        const { partyType } = routerNext.query;

        api.get(`/enterprise/ads/${partyType}`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            setAdData( Object.assign(adData, response.data.ad) );  
            //console.log( response.data.ad );             
        })
        .catch(err => {
            //console.log( err );
        });

    }, [routerNext.query, authenticatedEnterprise]);

    useEffect(() => {
        if( authenticatedEnterprise == false ) {
            return;
        }
        if( !routerNext.isReady ) {
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
            //console.log( response.data.enterpriseData );
            setEnterpriseData( response.data.enterpriseData );
        })
        .catch(err => {
            //console.log( err );
        });
        
    }, [routerNext.query, authenticatedEnterprise]);

    // Enterprise Category and Specific Category are
    // used for validation in schema
    useEffect(() => {
        setAdData({...adData, enterpriseCategory: enterpriseData.enterpriseCategory, enterpriseSpecificCategory: enterpriseData.enterpriseSpecificCategory });
    }, [enterpriseData, authenticatedEnterprise]);

    // Update Ad
    useEffect(() => {
        if( authenticatedEnterprise == false ) {
            return;
        }

        if( !routerNext.isReady ) {
            return;
        }

        if ( !hasToUpdate ) {            
            return;
        }

        //console.log('Chegou para atualizar o anúncios.');
        //console.log( adData );

        const token = localStorage.getItem("tokenEnterprise");
        const formData = new FormData;
    
        Object.keys(adData).forEach((key:any) => {
            if(key == 'photosNew') {
                //console.log('entrou no photos object key');
                for(let i = 0; i < adData[key].length; i++) {
                    if( adData[key][i].file != undefined ) {
                        formData.append('photosNew', adData[key][i].file);
                    } 
                }
            }
            else if(key == 'photos') {

            }
            else {
                formData.append(key, adData[key]);
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        })

        //console.log('formData');
        //console.log(formData);
        
        const { partyType } = routerNext.query;

        api.patch(
            `/enterprise/ads/edit/${partyType}`,
            formData, 
            {
                headers: {
                    "content-type": "multipart/form-data",
                    'Authorization': `Bearer ${JSON.parse(token)}`
                }
            }
        )
        .then(() => {
            // If images were changed will reload the page
            if(imagesChanged) {
                setImagesChanged(false);
                window.location.reload();
            }
        })
        .catch(err => {
            //console.log( err );
        });
        
        setHasToUpdate(false);

        // RESET ERROR MESSAGES
        let fields = [
            'q1',
            'q2',
            'q3',
            'q4',
            'q5',
            'q6',
            'q7',
            'q8',
            'q9',
            'q10',
            'q11',
            'q12',
            'q13',
            'q14',
            'q15',
            'q16',
            'q17',
            'q18',
            'q19',
            'q20',
            'q21',
            'q22',
            'q23',
            'q24',
            'q25',
            'q26',
            'q27',
            'q28',
            'q29',
            'q30',
            'q31',
            'q32',
            'q33',
            'q34',
            'q35',
            'q36',
            'q37',
            'q38',
            'q39',
            'q40',
            'q41',
            'q42',
            'q43',
            'q44'
        ];

        //Reset errors message
        setFormErrors((formE) => ({...formE, 'serviceDescription': ''}));
        fields.map((el, index) => {
            setFormErrors((formE) => ({...formE, [el]:''}));
        });

    }, [adData, hasToUpdate]);

    function getQuestionsObj( parentObj: Object ) {
        let obj = {};
        
        Object.keys( parentObj ).map((el, index) => {
            if( el[0] == 'q' ) {
                obj[el] = parentObj[el];
            }
        })
        return obj;
    }

    function saveImagesChanged() {
        //console.log( adData );
        if( adData.photosNewOrder.length < 5 ) {
            
            return false;
        }
        setHasToUpdate( true );
        setImagesChanged( true );
        return true;
    }

    async function saveDataChanged( data: Object ) {
        //console.log( adData );
        //console.log( enterpriseData.enterpriseCategory );
        //console.log( enterpriseData.enterpriseSpecificCategory );

        //console.log( adData );

        // VALIDATE THE DATA
        let fields = [
            'q1',
            'q2',
            'q3',
            'q4',
            'q5',
            'q6',
            'q7',
            'q8',
            'q9',
            'q10',
            'q11',
            'q12',
            'q13',
            'q14',
            'q15',
            'q16',
            'q17',
            'q18',
            'q19',
            'q20',
            'q21',
            'q22',
            'q23',
            'q24',
            'q25',
            'q26',
            'q27',
            'q28',
            'q29',
            'q30',
            'q31',
            'q32',
            'q33',
            'q34',
            'q35',
            'q36',
            'q37',
            'q38',
            'q39',
            'q40',
            'q41',
            'q42',
            'q43',
            'q44'
        ];

        //Reset errors message
        setFormErrors((formE) => ({...formE, 'serviceDescription': ''}));
        fields.map((el, index) => {
            setFormErrors((formE) => ({...formE, [el]:''}));
        });

        // ERROR MESSAGES

        // Service Description
        await enterpriseRegisterFormSchema
            .validateAt( 'serviceDescription', adData )
            .catch((err) => {
                setFormErrors((formE) => ({...formE, 'serviceDescription': err.errors[0]}));
            });

        // Questions
        await fields.map(async (el,index) => {
            await enterpriseRegisterQuestionsDataSchema
            .validateAt( el, adData )
            .catch((err) => {
                setFormErrors((formE) => ({...formE, [el]:err.errors[0]}));
            });
        });

        //console.log( formErrors );

        // Validate
        return await enterpriseRegisterQuestionsDataSchema
        .isValid({
            enterpriseCategory: enterpriseData.enterpriseCategory,
            enterpriseSpecificCategory: enterpriseData.enterpriseSpecificCategory,
            q1: adData.q1,
            q2: adData.q2,
            q3: adData.q3,
            q4: adData.q4,
            q5: adData.q5,
            q6: adData.q6,
            q7: adData.q7,
            q8: adData.q8,
            q9: adData.q9,
            q10: adData.q10,
            q11: adData.q11,
            q12: adData.q12,
            q13: adData.q13,
            q14: adData.q14,
            q15: adData.q15,
            q16: adData.q16,
            q17: adData.q17,
            q18: adData.q18,
            q19: adData.q19,
            q20: adData.q20,
            q21: adData.q21,
            q22: adData.q22,
            q23: adData.q23,
            q24: adData.q24,
            q25: adData.q25,
            q26: adData.q26,
            q27: adData.q27,
            q28: adData.q28,
            q29: adData.q29,
            q30: adData.q30,
            q31: adData.q31,
            q32: adData.q32,
            q33: adData.q33,
            q34: adData.q34,
            q35: adData.q35,
            q36: adData.q36,
            q37: adData.q37,
            q38: adData.q38,
            q39: adData.q39,
            q40: adData.q40,
            q41: adData.q41,
            q42: adData.q42,
            q43: adData.q43,
            q44: adData.q44
        })
        .then((val) =>{
            if( val == true ) {
                // Validou bemmmm
                //console.log('Validou bemmm');
                                

                /* ------- VALIDATE SERVICE DESCRIPTION ------ */
                let isValidField = yup.reach( enterpriseRegisterFormSchema, 'serviceDescription' )
                .isValidSync( adData['serviceDescription'] );
                //console.log(isValidField);

                if( isValidField == false ) {
                    return false;
                }                
                /* ------------------------------------------ */

                // Update the data in database
                setHasToUpdate(true);

                //console.log('antes do formData');
                //console.log(adData);
                return true;
            }
            else {
                //console.log('Não validou');
                // Update the data with previous data changed
                // Object.keys( data ).map((key, index) => {
                //     setAdData((prevAdData) => ({...prevAdData, [key]: prevAdDataState[key]}) );
                // });
                return false;
            }
        });
    }

    if( authenticatedEnterprise ) {
        if( adData.id != 0 && enterpriseData.id != 0 ) {
            return (    
                <Box>
                    <Header name="" position="relative" />
                    <FlashMessageComponent/>
                    <TopMenuEnterprise />
                    <Flex 
                        mt="5"
                        mb='14'
                        boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                        borderRadius={8} 
                        maxWidth={1200}
                        justifyContent="space-between"
                        mx="auto" 
                        direction={{base:'column', lg:'row'}}
                        w={{base:'100%', lg:'80%'}}
                    >
                        {/* Left Menu */}
                        <LeftMenuEdit 
                            propertyName={typeOfParties[adData?.partyMainFocus].textToShow}
                            srcImage={adData?.photos[0]}
                            stateChanger={setComponentToLoad}
                            w={{base:'100%', lg:'25%'}}
                        />
        
                        {/* Forms */}
                        <Flex
                            as="form"                    
                            pb="5"
                            w={{base:'100%', lg:'75%'}}
                            h='auto'
                        >
                            
                            {
                                componentToLoad == "Detalhes do anúncio"
                                ?
                                <AdDetailsEdit
                                    serviceDescription={adData['serviceDescription']}
                                    photos={adData['photos']}
                                    enterpriseCategory={enterpriseData?.enterpriseCategory}
                                    enterpriseSpecificCategory={enterpriseData?.enterpriseSpecificCategory}
                                    questions={getQuestionsObj( adData )} 
                                    formErrors={formErrors}   
                                    setFormErrors={setFormErrors}  
                                    setData={setAdData}                              
                                    saveDataChanged={saveDataChanged}
                                    saveImagesChanged={saveImagesChanged}
                                    handleComponentToLoad={setComponentToLoad}
                                />                            
                                :
                                <>
                                </>
                            }    
                        </Flex>
                    </Flex>
                    <Footer />
                </Box>
            )
        }
        else {
            return (
                <Box>
                    <Header name="" position="relative" />
                    <TopMenuEnterprise />
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
                    <Footer />
                </Box>
            )
        }
    }
    else {
        return (
            <Box w='100vw' h='100vh'> 
                <NotAuthorizedComponent link='/Enterprise/enterpriseAccess' />
            </Box>
        )
    }
}