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




export default function EditAdsEnterprise() {
    const [componentToLoad, setComponentToLoad] = useState("Detalhes do anúncio");
    const [adData, setAdData] = useState({});
    const routerNext = useRouter();
    const { partyType } = routerNext.query;
    
    useEffect(() => {
       
        
        const token = localStorage.getItem("token");

        try {
            api.get("/enterprise/ads/ad", {
                params: {
                    partyType: partyType
                },
                headers: {
                    'Authorization': `Bearer ${JSON.parse(token)}`
                }
            })
            .then((response) => {
                setAdData( response.data.ad[0] ); 
            });
        }
        catch( err ) {
            console.log( err );
        }

    }, []);

    function saveDataChanged( data: {name: string, value: string|number} ) {
        console.log( event );
        setAdData({...adData, [data.name]: data.value });
        
        //setAdData({...adData, [event.currentTarget.name]: event.currentTarget.value});
        //console.log( event.currentTarget.value );
    }

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
                w='80%'
            >
                {/* Left Menu 
            */}
                <LeftMenuEdit 
                    propertyName={adData.partyMainFocus}
                    srcImage={`http://localhost:5000/images/enterprise/${adData?.photos.split(",")[0]}`}
                    stateChanger={setComponentToLoad}
                    w='25%'
                />

                {/* Forms */}
                <Flex
                    as="form"                    
                    px="5" pb="5"
                    w='75%'
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