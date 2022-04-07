import { Box, Flex, Grid, GridItem, Icon, Text } from "@chakra-ui/react";
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

export default function MyBusinessEnterprise() {
    const { authenticatedEnterprise } = useEnterpriseAuthContext();
    const [enterpriseData, setEnterpriseData] = useState<enterpriseDataInterf>(enterpriseDataNullState);
    const [componentToLoad, setComponentToLoad] = useState("DadosDaEmpresa");
    const [hasToUpdate, setHasToUpdate] = useState(false);    

    // Get Enterprise Data
    useEffect(() => {
        if( !authenticatedEnterprise ) {
            return;
        }

        const token = localStorage.getItem("token");

        // Get enterprise data
        try {
            api.get("/enterprise/myenterprise", {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(token)}`
                }
            })
            .then((response) => {
                setEnterpriseData( response.data.enterpriseData );
            });
        }
        catch( err ) {
            console.log( err );
        }
    }, [authenticatedEnterprise]);


    // Update Enterprise Data
    useEffect(() => {
        if( !authenticatedEnterprise ) {
            return;
        }

        if ( !hasToUpdate ) {            
            return;
        }

        const token = localStorage.getItem("token");

        const formData = new FormData;
    
        Object.keys(enterpriseData).forEach((key:any) => {
            if(key == 'photosNew') {
                console.log('entrou no photos object key');
                formData.append('photo', enterpriseData[key][0]);
            }
            else {
                formData.append(key, enterpriseData[key]);
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        })

        try {
            api.patch(
            '/enterprise/myenterprise/edit',
             formData, 
             {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": `Bearer ${JSON.parse(token)}`
                }
             });
        }
        catch(err) {
            // tratar o erro
            console.log(err);
        }
        setHasToUpdate(false);

    }, [enterpriseData, hasToUpdate]);


    async function saveDataChanged( data: {name: string, value: string|number} ) {
        console.log( data );
        setHasToUpdate(true);
        setEnterpriseData({...enterpriseData, [data.name]: data.value });
        console.log('antes do formData');
        console.log(enterpriseData);
    }

    function handleClickMenu( event: any ) {
        console.log( event.currentTarget.value );
        setComponentToLoad( event.currentTarget.value );
    }

    if( authenticatedEnterprise ) {
        return (
            <Box>
                <Header name="" position="relative" />
                <TopMenuEnterprise />
    
                {
                enterpriseData.id != 0 
                ?
                <Flex 
                    mt="4"
                    boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                    borderRadius={8} 
                    maxWidth={1200}
                    justifyContent="space-between"
                    mx="auto"
                    h='auto' 
                    w={{base:'95%', lg:'80%'}}
                    mb='20'
                    direction={{base:'column', lg:'row'}}
                >
                    {/* Left Menu 
                */}
                    <LeftMenuMyBusiness 
                        propertyName={enterpriseData.enterpriseName}
                        //srcImage={`http://localhost:5000/images/enterprise/${adData?.photos.split(",")[0]}`}
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
                                fullName={enterpriseData.fullName}
                                phone={enterpriseData.phone}
                                whatsapp={enterpriseData.whatsapp}
                                enterpriseName={enterpriseData.enterpriseName}
                                enterpriseCategory={enterpriseData.enterpriseCategory}
                                enterpriseSpecificCategory={enterpriseData.enterpriseSpecificCategory}
                                instagram={enterpriseData.instagram}
                                facebook={enterpriseData.facebook}
                                website={enterpriseData.website}
                                saveDataChanged={saveDataChanged}
                            />
                            :
                            componentToLoad == "Localizacao"
                            ?
                            <LocationInfoMyBusiness
                                country={enterpriseData.country}
                                state={enterpriseData.state}
                                city={enterpriseData.city}
                                address={enterpriseData.address}
                                addressNumber={enterpriseData.addressNumber}
                                saveDataChanged={saveDataChanged}
                            />
                            :
                            <>
                            </>                                            
                        }
    
                    
                    </Flex>
    
                </Flex>
                :
                <Text>Loading</Text>
                }
    
                <Footer/>
            </Box>
        );
    }
    else {
        return (
            <Box w='100vw' h='100vh'> 
                <NotAuthorizedComponent link='/Enterprise/enterpriseAccess' />
            </Box>
        )
    }
}