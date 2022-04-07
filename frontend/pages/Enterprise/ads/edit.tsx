import { Box, Flex, Grid, GridItem, Icon, Text } from "@chakra-ui/react";
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


export default function EditAdsEnterprise() {
    const [componentToLoad, setComponentToLoad] = useState("Detalhes do anúncio");
    const [adData, setAdData] = useState({});
    const [enterpriseData, setEnterpriseData] = useState({});
    const [hasToUpdate, setHasToUpdate] = useState(false);
    const routerNext = useRouter();
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

        try {
            api.get(`/enterprise/ads/${partyType}`, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(token)}`
                }
            })
            .then((response) => {
                setAdData( response.data.ad );                 
            });
        }
        catch( err ) {
            console.log( err );
        }

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

    }, [routerNext.query, authenticatedEnterprise]);

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

        const token = localStorage.getItem("tokenEnterprise");
        const formData = new FormData;
    
        Object.keys(adData).forEach((key:any) => {
            if(key == 'photosNew') {
                console.log('entrou no photos object key');
                for(let i = 0; i < adData[key].length; i++) {
                    formData.append('photosNew', adData[key][i]);
                }
            }
            else {
                formData.append(key, adData[key]);
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        })

        console.log('formData');
        console.log(formData);
        
        try {
            const { partyType } = routerNext.query;

            api.patch(
            `/enterprise/ads/edit/${partyType}`,
             formData, 
             {
                headers: {
                    "content-type": "multipart/form-data",
                    'Authorization': `Bearer ${JSON.parse(token)}`
                }
             });
        }
        catch(err) {
            // tratar o erro
            console.log(err);
        }
        setHasToUpdate(false);

    }, [adData, hasToUpdate]);



    async function saveDataChanged( data: {name: string, value: string|number} ) {
        console.log( data );
        setHasToUpdate(true);
        setAdData({...adData, [data.name]: data.value });
        console.log('antes do formData');
        console.log(adData);
    }

    if( authenticatedEnterprise ) {
        return (
            <Box>
                <Header name="" position="relative" />
                <TopMenuEnterprise />
    
                {
                adData?.id 
                ?
                <Flex 
                    mt="4"
                    boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                    borderRadius={8} 
                    maxWidth={1200}
                    justifyContent="space-between"
                    mx="auto" 
                    direction={{base:'column', lg:'row'}}
                    w={{base:'90%', lg:'80%'}}
                >
                    {/* Left Menu */}
                    <LeftMenuEdit 
                        propertyName={typeOfParties[adData?.partyMainFocus].textToShow}
                        srcImage={`http://localhost:5000/images/enterprise/${adData?.photos.split(",")[0]}`}
                        stateChanger={setComponentToLoad}
                        w={{base:'100%', lg:'25%'}}
                    />
    
                    {/* Forms */}
                    <Flex
                        as="form"                    
                        px="5" pb="5"
                        w={{base:'100%', lg:'75%'}}
                    >
                        
                        {
                            componentToLoad == "Detalhes do anúncio"
                            ?
                        
                            <AdDetailsEdit
                                serviceDescription={adData['serviceDescription']}
                                photos={adData['photos'].split(",")}
                                saveDataChanged={saveDataChanged}
                            />
                        
                            :
                            <h2>afsdfas</h2>
                        }
    
                    </Flex>
    
                </Flex>
                :
                <Text>Loading</Text>
                }
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