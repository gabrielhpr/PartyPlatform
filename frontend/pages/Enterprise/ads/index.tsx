import { Box, Flex, Icon, Link as NavLink, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiAddLine } from "react-icons/ri";
import { CardAds } from "../../../components/Enterprise/Ads/Card";
import { TopMenuEnterprise } from "../../../components/Enterprise/TopMenuEnterprise";
import { Header } from "../../../components/Header";
import api from "../../../utils/api";
import { useRouter } from 'next/router';


export default function AdsEnterprise() {
    const [ads, setAds] = useState([]);
    const routerNext = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        try {
            api.get("/enterprise/ads", {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(token)}`
                }
            })
            .then((response) => {
                setAds( response.data.ads );
                console.log( response.data.ads );
            });
        }
        catch( err ) {
            console.log( err );
        }

    }, []);


    function handleEditAd( id: number, partyType: string ) {
        console.log( id );
        routerNext.push({
            pathname: '/Enterprise/ads/edit',
            query: { 
                partyType: partyType,
            }
        });
    }

    return (
        <Box>
            <Header name="" position="relative" />
            <TopMenuEnterprise />


           
            <Box
                boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                borderRadius={8} 
                mx="24" mt="5"
                px="5" pb="5"
            >

                
                <Stack direction="row" spacing={18}>

                    <NavLink href="/ads/create">
                        <Flex 
                            boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                            borderRadius={8} 
                            bg="brand.white"                        
                            color="brand.red"
                            _hover={{bg:"gray.50"}}
                            justifyContent="center"
                            alignItems="center"
                            fontSize={40}
                            height={150}
                            width={250}

                        >
                            <Icon as={RiAddLine}/>
                        </Flex>
                    </NavLink>

                    {
                        ads.map((el, index) => {
                            return(
                                <CardAds
                                    name={el.id}
                                    location=""
                                    typeOfParty={el.partyMainFocus}
                                    classification=""
                                    price=""
                                    photo={el.photos.split(",")[0]}
                                    handleOnClick={() => handleEditAd(el.id, el.partyMainFocus)}
                                />
                            )                            
                        })
                    }

                    <NavLink href="/ads/edit">
                        edit 2
                    </NavLink>

                </Stack>
                
            </Box>
            


        </Box>
    );
}