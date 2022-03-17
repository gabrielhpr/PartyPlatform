import { Box, Divider, Flex, Grid, GridItem, Icon, Stack, Text } from "@chakra-ui/react";
import { RiArrowRightSLine } from "react-icons/ri";
import Image from 'next/image';
import { TitleEdit } from "./Title";
import { ItemEdit } from "./Item";
import { EditDivider } from "./Divider";

interface AdDetailsEditProps {
    serviceDescription: string;
    photos: string[];
    handleData: () => {};
}

export function AdDetailsEdit({ serviceDescription, photos, saveDataChanged}) {
    return (
        <Stack w='50vw'>

            {/* Fotos */}
            <Box mb="3" id="Fotos">
                {/* Cabeçalho */}
                <Flex 
                    justifyContent="space-between" my="2"
                >
                    <Text as="h2"
                        fontWeight="500"
                        fontSize={22}
                    >
                        Fotos
                    </Text>
                
                    <Flex alignItems="center">
                        <Text as="p">Editar</Text>
                        <Icon as={RiArrowRightSLine}
                            fontSize={25}
                        />
                    </Flex>
                    
                </Flex>

                {/* Carroussel de fotos */}
                <Flex>
                    {
                        [0,1,2].map((el, index) => {
                            return (
                                <Flex
                                    boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                                    borderRadius={8} 
                                    height={150}
                                    width='25%'
                                    position='relative'
                                    justifyContent="flex-end"
                                    alignItems="center"
                                    overflow='hidden'

                                >
                                    <Image 
                                        src={`http://localhost:5000/images/enterprise/${photos[index]}`}
                                        objectFit="cover"
                                        layout="fill"
                                    />
                                </Flex>
                            )
                        })
                    }                    
                    <Flex
                        boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                        borderRadius={8} 
                        height={150}
                        width='25%'
                        position='relative'
                        justifyContent="flex-end"
                        alignItems="center"
                        overflow='hidden'
                    >
                        <Image 
                            src={`http://localhost:5000/images/enterprise/${photos[3]}`}
                            objectFit="cover"
                            layout='fill'
                        />

                        <Flex position="absolute"
                            color="black"
                            textAlign="center"
                            bg="rgba(255,255,255,0.7)"
                            height={150}
                            alignItems="center"
                        >
                            <Text>
                                Editar fotos
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>


            <Divider my="6" borderColor="gray.400" />

            <Box>
                <TitleEdit 
                    title="Informações básicas do anúncio" 
                    mb="5"
                    id="Informações básicas do anúncio"
                    //handleData={handleData}
                />

               
                <ItemEdit 
                    title="Descrição do serviço"
                    name='serviceDescription'
                    itemValue={`${serviceDescription}`}
                    about="Todos os detalhes acerca do seu espaço"
                    saveDataChanged={saveDataChanged}

                />
                <EditDivider/>

                <TitleEdit 
                    title="Perguntas frequentes" 
                    mb="5"
                    id="Perguntas Frequentes"
                    //handleData={handleData}
                />

               
                <ItemEdit 
                    title="Descrição do serviço"
                    name='serviceDescription'
                    itemValue={`${serviceDescription}`}
                    about="Todos os detalhes acerca do seu espaço"
                    saveDataChanged={saveDataChanged}

                />
                <EditDivider/>

               
                

               


            </Box>
        </Stack>

    );
}