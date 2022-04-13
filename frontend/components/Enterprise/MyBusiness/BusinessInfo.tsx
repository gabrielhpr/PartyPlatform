import { Box, Divider, Flex, Grid, GridItem, Icon, Stack, Text } from "@chakra-ui/react";
import { RiArrowRightSLine } from "react-icons/ri";
import Image from 'next/image';
import { TitleEdit } from "../Ads/Edit/Title";
import { ItemEdit } from "../Ads/Edit/Item";
import { EditDivider } from "../Ads/Edit/Divider";

interface BusinessInfoMyBusinessProps {
    email: string;
    password: string;
    passwordConfirmation: string;
    fullName: string;
    phone: string;
    whatsapp?: string;
    enterpriseName: string;
    enterpriseCategory: string;
    enterpriseSpecificCategory: string;    
    instagram?: string;
    facebook?: string;
    website?: string;
    formErrors: Object;
    setData: Function;
    saveDataChanged: Function;
}

export function BusinessInfoMyBusiness({ email, password, passwordConfirmation, fullName, phone,
     whatsapp, enterpriseName, enterpriseCategory, enterpriseSpecificCategory,
     instagram, facebook, website, formErrors, setData, saveDataChanged }: BusinessInfoMyBusinessProps) 
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
                    name={['email']}
                    inputType="input"
                    inputTypeSpecific="email"
                    itemValue={[email]}
                    formErrors={formErrors}
                    setData={setData}
                    saveDataChanged={saveDataChanged}
                />
                <EditDivider/>
                <ItemEdit 
                    title="Senha"
                    name={['password', 'passwordConfirmation']}
                    inputType="password"
                    itemValue={[password, passwordConfirmation]}
                    formErrors={formErrors}
                    setData={setData}
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
                    name={['fullName']}
                    inputType="input"
                    inputTypeSpecific="text"
                    itemValue={[fullName]}
                    formErrors={formErrors}
                    setData={setData}
                    saveDataChanged={saveDataChanged}
                />
                <EditDivider/>
                <ItemEdit 
                    title="Telefone"
                    name={['phone']}
                    inputType="input"
                    inputTypeSpecific="phone"
                    itemValue={[phone]}
                    formErrors={formErrors}
                    setData={setData}
                    saveDataChanged={saveDataChanged}
                />
                <EditDivider/>
                <ItemEdit 
                    title="Whatsapp"
                    name={['whatsapp']}
                    inputType="input"
                    inputTypeSpecific="phone"
                    itemValue={[whatsapp]}
                    formErrors={formErrors}
                    setData={setData}
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
                    name={['enterpriseName']}
                    itemValue={[enterpriseName]}
                    inputType="input"
                    inputTypeSpecific="text"
                    formErrors={formErrors}
                    setData={setData}
                    saveDataChanged={saveDataChanged}

                />
                <EditDivider/>
                
                <ItemEdit 
                    title="Instagram da empresa"
                    name={['instagram']}
                    itemValue={[instagram]}
                    inputType="input"
                    inputTypeSpecific="text"
                    formErrors={formErrors}
                    setData={setData}
                    saveDataChanged={saveDataChanged}
                />
                <EditDivider/>
                <ItemEdit 
                    title="Facebook da empresa"
                    name={['facebook']}
                    itemValue={[facebook]}
                    inputType="input"
                    inputTypeSpecific="text"
                    formErrors={formErrors}
                    setData={setData}
                    saveDataChanged={saveDataChanged}
                />
                <EditDivider/>
                <ItemEdit 
                    title="Website da empresa"
                    name={['website']}
                    itemValue={[website]}
                    inputType="input"
                    inputTypeSpecific="text"
                    formErrors={formErrors}
                    setData={setData}
                    saveDataChanged={saveDataChanged}
                />

            </Box>
        </Stack>

    );
}