import { Box, Divider, Flex, Grid, GridItem, Icon, Stack, Text } from "@chakra-ui/react";
import { RiArrowRightSLine } from "react-icons/ri";
import Image from 'next/image';
import { TitleEdit } from "../Ads/Edit/Title";
import { ItemEdit } from "../Ads/Edit/Item";
import { EditDivider } from "../Ads/Edit/Divider";

interface BusinessInfoMyBusinessProps {
    email: string;
    password: string;
    fullName: string;
    phone: string;
    whatsapp?: string;
    enterpriseName: string;
    enterpriseCategory: string;
    enterpriseSpecificCategory: string;    
    instagram?: string;
    facebook?: string;
    website?: string;
    saveDataChanged: Function;
}

export function BusinessInfoMyBusiness({ email, password, fullName, phone,
     whatsapp, enterpriseName, enterpriseCategory, enterpriseSpecificCategory,
     instagram, facebook, website, saveDataChanged }: BusinessInfoMyBusinessProps) 
    {
    return (
        <Stack w={{base:'100%', lg:'50vw'}}>
            <Box>
                {/* DADOS DE ACESSO */}
                <TitleEdit 
                    title="Dados de acesso" 
                    mb="5"
                    mt="10"
                    id="Dados de acesso"
                    //handleData={handleData}
                />
                <ItemEdit 
                    title="E-mail"
                    name='email'
                    itemValue={email}
                    saveDataChanged={saveDataChanged}
                />
                <EditDivider/>
                <ItemEdit 
                    title="Senha"
                    name='password'
                    itemValue={password}
                    saveDataChanged={saveDataChanged}
                />


                {/* DADOS DE CONTATO */}
                <TitleEdit 
                    title="Dados de contato" 
                    mb="5"
                    mt='10'
                    id="Dados de contato"
                    //handleData={handleData}
                />
                <ItemEdit 
                    title="Nome completo"
                    name='fullName'
                    itemValue={fullName}
                    saveDataChanged={saveDataChanged}
                />
                <EditDivider/>
                <ItemEdit 
                    title="Telefone"
                    name='phone'
                    itemValue={phone}
                    saveDataChanged={saveDataChanged}
                />
                <EditDivider/>
                <ItemEdit 
                    title="Whatsapp"
                    name='whatsapp'
                    itemValue={whatsapp}
                    saveDataChanged={saveDataChanged}
                />

                {/* SOBRE A EMPRESA */}
                <TitleEdit 
                    title="Sobre a empresa" 
                    mb="5"
                    mt='10'
                    id="Sobre a empresa"
                    //handleData={handleData}
                />
                <ItemEdit 
                    title="Nome da empresa"
                    name='enterpriseName'
                    itemValue={enterpriseName}
                    saveDataChanged={saveDataChanged}

                />
                <EditDivider/>
                <ItemEdit 
                    title="Categoria da empresa"
                    name='enterpriseCategory'
                    itemValue={enterpriseCategory}
                    saveDataChanged={saveDataChanged}
                />
                <EditDivider/>
                <ItemEdit 
                    title="Categoria específica da empresa"
                    name='enterpriseSpecificCategory'
                    itemValue={enterpriseSpecificCategory}
                    saveDataChanged={saveDataChanged}
                />
                <EditDivider/>
                <ItemEdit 
                    title="Instagram da empresa"
                    name='instagram'
                    itemValue={instagram}
                    saveDataChanged={saveDataChanged}
                />
                <EditDivider/>
                <ItemEdit 
                    title="Facebook da empresa"
                    name='facebook'
                    itemValue={facebook}
                    saveDataChanged={saveDataChanged}
                />
                <EditDivider/>
                <ItemEdit 
                    title="Website da empresa"
                    name='website'
                    itemValue={website}
                    saveDataChanged={saveDataChanged}
                />

            </Box>
        </Stack>

    );
}