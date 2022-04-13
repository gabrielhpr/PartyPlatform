import { Box, Divider, Flex, FormControl, FormErrorMessage, Grid, GridItem, Icon, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import { RiArrowRightSLine } from "react-icons/ri";
import Image from 'next/image';
import { TitleEdit } from "./Title";
import { ItemEdit } from "./Item";
import { EditDivider } from "./Divider";
import { specificQuestions } from "../../../../utils/typeOfParties";
import { ItemList } from "../../ItemList";
import { useState } from "react";

interface AdDetailsEditProps {
    serviceDescription: string;
    photos: string[];
    enterpriseCategory: string;
    enterpriseSpecificCategory: string;
    questions: Object;
    formErrors: Object;
    setData: Function;
    saveDataChanged: Function;
}

export function AdDetailsEdit({ serviceDescription, photos, enterpriseCategory, enterpriseSpecificCategory, questions, formErrors, setData, saveDataChanged}: AdDetailsEditProps) {
    //console.log( questions );
   
    return (
        <Stack w={{base:'100%', lg:'50vw'}}
            mt={{base:'8', lg:'0'}}
            px='5'
        >

            {/* Fotos */}
            <Box mb="3" id="Fotos" w='100%'>
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

            <Box w='100%'>
                <TitleEdit 
                    title="Informações básicas do anúncio" 
                    mb="5"
                    id="Informações básicas do anúncio"
                    //handleData={handleData}
                />

                {/* Descrição do serviço */}
                <Box w={{base:'100%',lg:'70%'}}>
                    <ItemEdit 
                        title="Descrição do serviço"
                        name={['serviceDescription']}
                        itemValue={[`${serviceDescription}`]}
                        inputType='textarea'
                        placeholder='placeholder'
                        about="Todos os detalhes acerca do seu espaço"
                        formErrors={formErrors}
                        setData={setData}
                        saveDataChanged={saveDataChanged}
                    />
                </Box>


                <EditDivider/>

                <TitleEdit 
                    title="Perguntas frequentes" 
                    mb="5"
                    id="Perguntas Frequentes"
                    //handleData={handleData}
                />

                {/* Perguntas Frequentes */}
                <Stack direction='column' 
                    justifyContent='flex-start'
                    spacing={5}
                    alignItems='flex-start'
                    //overflowY='scroll'
                    w={{base:'100%', lg:'100%'}}
                    //h={{base:'55vh', lg:'75vh'}}
                    py='5'
                >
                    {
                        enterpriseCategory == 'Espaco'
                        ?
                        specificQuestions['Espaco']
                        .map((el, index) => {
                            // POSSUI BUFFET JUNTO COM O ESPAÇO
                            if( questions[2] == 'Sim' && 
                                (
                                ['q21','q22','q23'].includes(el?.name[0])
                                ||
                                ['q21','q22','q23'].includes(el?.name[1])
                                ) ) 
                            {
                                return (
                                    <>
                                    </>
                                );
                            }
                            // SEM BUFFET JUNTO COM O ESPAÇO
                            else if( questions[2] == 'Não' && 
                                (
                                ['q5','q6','q7','q8','q9','q10','q11','q12','q13','q14',
                                'q15','q16','q17','q18','q19','q20'].includes(el?.name[0]) 
                                ||
                                ['q5','q6','q7','q8','q9','q10','q11','q12','q13','q14',
                                'q15','q16','q17','q18','q19','q20'].includes(el?.name[1]) 
                                )
                                ) 
                            {
                                return (
                                    <>
                                    </>
                                );
                            }
                            // NÃO SABE SE TEM OU NÃO BUFFET
                            else {
                                return (
                                    <Flex direction='column' bg='white'
                                        w={{base:'100%', lg:'70%'}}  p='5'
                                        justifyContent='center'
                                        boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                                        borderRadius={8} 
                                    >
                                        
    
                                        {/* RADIO */}
                                        {
                                            el.type == 'radio'
                                            &&
                                            <ItemEdit 
                                                title={el.question}
                                                name={[el.name[0], el.name[1]]}
                                                itemValue={[ questions[el.name[0]], questions[el.name[1]] ]}
                                                inputType='radio'
                                                options={el.options}
                                                placeholder={el.placeholder}
                                                about=""
                                                formErrors={formErrors}
                                                setData={setData}
                                                saveDataChanged={saveDataChanged}
                                            />
                                        }

                                        {/* TEXTAREA */}
                                        {
                                            el.type == 'textarea'
                                            &&
                                            <ItemEdit 
                                                title={el.question}
                                                name={[el.name[0]]}
                                                itemValue={[ questions[el.name[0]] ]}
                                                inputType='textarea'
                                                placeholder={el.placeholder}
                                                about=""
                                                formErrors={formErrors}
                                                setData={setData}
                                                saveDataChanged={saveDataChanged}
                                            />
                                        }

                                        {/* INPUT */}
                                        {
                                            el.type == 'input'
                                            &&
                                            <ItemEdit 
                                                title={el.question}
                                                name={[el.name[0]]}
                                                itemValue={[ questions[el.name[0]] ]}
                                                inputType='input'
                                                inputTypeSpecific={el.inputType}
                                                span={el.span}
                                                placeholder={el.placeholder}
                                                about=""
                                                formErrors={formErrors}
                                                setData={setData}
                                                saveDataChanged={saveDataChanged}
                                            />
                                        }    
                                    </Flex>
                                )
                            }
                        })
                        :
                        specificQuestions.Servico[enterpriseSpecificCategory]
                        .map((el, index) => {
                            return (
                                <Flex direction='column' bg='white'
                                    w={{base:'100%', lg:'70%'}}
                                    p='5'
                                    justifyContent='center'
                                    boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                                    borderRadius={8} 
                                >
                                    
                                    {/* RADIO */}
                                    {
                                        el.type == 'radio'
                                        &&
                                        <ItemEdit 
                                            title={el.question}
                                            name={[el.name[0], el.name[1]]}
                                            itemValue={[ questions[el.name[0]], questions[el.name[1]] ]}
                                            inputType='radio'
                                            options={el.options}
                                            placeholder={el.placeholder}
                                            about=""
                                            formErrors={formErrors}
                                            setData={setData}
                                            saveDataChanged={saveDataChanged}
                                        />
                                    }

                                    {/* TEXTAREA */}
                                    {
                                        el.type == 'textarea'
                                        &&
                                        <ItemEdit 
                                            title={el.question}
                                            name={[el.name[0]]}
                                            itemValue={[ questions[el.name[0]] ]}
                                            inputType='textarea'
                                            placeholder={el.placeholder}
                                            about=""
                                            formErrors={formErrors}
                                            setData={setData}
                                            saveDataChanged={saveDataChanged}
                                        />
                                    }

                                    {/* INPUT */}
                                    {
                                        el.type == 'input'
                                        &&
                                        <ItemEdit 
                                            title={el.question}
                                            name={[el.name[0]]}
                                            itemValue={[ questions[el.name[0]] ]}
                                            inputType='input'
                                            inputTypeSpecific={el.inputType}
                                            span={el.span}
                                            placeholder={el.placeholder}
                                            about=""
                                            formErrors={formErrors}
                                            setData={setData}
                                            saveDataChanged={saveDataChanged}
                                        />
                                    }
                                </Flex>
                            )
                        })
                    }
                </Stack>
       
                <EditDivider/>

            </Box>
        </Stack>

    );
}