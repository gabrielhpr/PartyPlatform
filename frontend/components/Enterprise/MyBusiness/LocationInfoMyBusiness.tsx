import { Box, Divider, Flex, Grid, GridItem, Icon, Stack, Text } from "@chakra-ui/react";
import { RiArrowRightSLine } from "react-icons/ri";
import Image from 'next/image';
import { TitleEdit } from "../Ads/Edit/Title";
import { ItemEdit } from "../Ads/Edit/Item";
import { EditDivider } from "../Ads/Edit/Divider";

interface LocationInfoMyBusinessProps {
    location: string;
    address: string;
    addressNumber: number;
    formErrors: Object;
    setData: Function;
    saveDataChanged: Function;
}

export function LocationInfoMyBusiness({ location, 
    address, addressNumber, formErrors, setData, saveDataChanged }: LocationInfoMyBusinessProps) 
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
                />
                <ItemEdit 
                    title="Localização"
                    name={['location']}
                    itemValue={[location]}
                    inputType="location"
                    formErrors={formErrors}
                    setData={setData}
                    saveDataChanged={saveDataChanged}
                />
                <EditDivider/>
                <ItemEdit 
                    title="Endereço"
                    name={['address']}
                    itemValue={[address]}
                    inputType="input"
                    inputTypeSpecific="text"
                    formErrors={formErrors}
                    setData={setData}
                    saveDataChanged={saveDataChanged}
                />
                <EditDivider/>
                <ItemEdit 
                    title="Número de endereço"
                    name={['addressNumber']}
                    itemValue={[addressNumber]}
                    inputType="input"
                    inputTypeSpecific="number"
                    formErrors={formErrors}
                    setData={setData}
                    saveDataChanged={saveDataChanged}
                />               
            </Box>
        </Stack>
    );
}