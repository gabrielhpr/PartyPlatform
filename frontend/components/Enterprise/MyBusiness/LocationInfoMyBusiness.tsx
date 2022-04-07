import { Box, Divider, Flex, Grid, GridItem, Icon, Stack, Text } from "@chakra-ui/react";
import { RiArrowRightSLine } from "react-icons/ri";
import Image from 'next/image';
import { TitleEdit } from "../Ads/Edit/Title";
import { ItemEdit } from "../Ads/Edit/Item";
import { EditDivider } from "../Ads/Edit/Divider";

interface LocationInfoMyBusinessProps {
    country: string;
    state: string;
    city: string;
    address: string;
    addressNumber: number;
    saveDataChanged: Function;
}

export function LocationInfoMyBusiness({ country, state, city, 
    address, addressNumber, saveDataChanged }: LocationInfoMyBusinessProps) 
    {
    return (
        <Stack w={{base:'100%', lg:'50vw'}}>

            <Box>
                
                {/* DADOS DE ACESSO */}
                <TitleEdit 
                    title="Dados de Localização" 
                    mb="5"
                    mt="10"
                    id="Dados de Localização"
                    //handleData={handleData}
                />
                <ItemEdit 
                    title="País"
                    name='country'
                    itemValue={country}
                    saveDataChanged={saveDataChanged}
                />
                <EditDivider/>
                <ItemEdit 
                    title="Estado"
                    name='state'
                    itemValue={state}
                    saveDataChanged={saveDataChanged}
                />
                <EditDivider/>
                <ItemEdit 
                    title="Cidade"
                    name='city'
                    itemValue={city}
                    saveDataChanged={saveDataChanged}
                />
                <EditDivider/>
                <ItemEdit 
                    title="Endereço"
                    name='address'
                    itemValue={address}
                    saveDataChanged={saveDataChanged}
                />
                <EditDivider/>
                <ItemEdit 
                    title="Número de endereço"
                    name='addressNumber'
                    itemValue={addressNumber}
                    saveDataChanged={saveDataChanged}
                />               
            </Box>
        </Stack>

    );
}