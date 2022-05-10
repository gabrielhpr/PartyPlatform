import { Alert, AlertIcon, AlertTitle, Box, Button, Divider, Flex, FormControl, FormErrorMessage, Grid, GridItem, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import { RiArrowRightSLine } from "react-icons/ri";
import Image from 'next/image';
import { TitleEdit } from "./Title";
import { ItemEdit } from "./Item";
import { EditDivider } from "./Divider";
import { specificQuestions } from "../../../../utils/typeOfParties";
import { ItemList } from "../../ItemList";
import { useState } from "react";
import RUG, { DragArea, DropArea, Card, List } from 'react-upload-gallery';
import { FiUpload } from "react-icons/fi";

interface AdDetailsEditProps {
    serviceDescription: string;
    photos: string[];
    enterpriseCategory: string;
    enterpriseSpecificCategory: string;
    questions: Object;
    formErrors: Object;
    setData: Function;
    setFormErrors: Function;
    saveDataChanged: Function;
    saveImagesChanged: Function;
    handleComponentToLoad: Function;
}

export function AdDetailsEdit({ serviceDescription, photos, enterpriseCategory, enterpriseSpecificCategory, questions, formErrors, setData, setFormErrors, saveDataChanged, saveImagesChanged, handleComponentToLoad}: AdDetailsEditProps) {
    //console.log( questions );
    const modalPhotos = useDisclosure();
   
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
                        <Button 
                            onClick={() => {
                                modalPhotos.onOpen();
                                //handleComponentToLoad('photos');
                            }}
                            rightIcon={<Icon as={RiArrowRightSLine} fontSize={25}/>}
                            bg='brand.white'
                        >
                            Editar
                        </Button>
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
                            <Button
                                onClick={modalPhotos.onOpen}
                            >
                                Editar fotos
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
                
            {/* Edit photos */}
            <Modal isOpen={modalPhotos.isOpen} onClose={modalPhotos.onClose}
                size='full'
            >
                <ModalOverlay />
                <ModalContent
                    //w='100vw'
                    //h='100vh'
                >
                    <ModalHeader>Alteração das fotos</ModalHeader>
                    <ModalCloseButton />
                    
                    <ModalBody>
                        <Flex
                            direction='column'
                            //w='100vw'
                            h='80vh'
                            alignItems='center'
                            justifyContent='space-evenly'
                        >
                            {
                                Object.values( formErrors.photos ).some( value => value != '')
                                &&
                                Object.values(formErrors.photos).map((el, index) => {
                                    if( el != '' ) {
                                        return (
                                            <Alert status='error'
                                                justifyContent='center'
                                            >
                                                <AlertIcon />
                                                <AlertTitle>{el}</AlertTitle>
                                            </Alert>
                                        );
                                    }
                                })
                            }

                            <Flex
                                h='20%'
                                alignItems='center'
                                direction='column'
                            >
                                <Text
                                    fontSize={18}
                                    my='3'
                                >
                                    Clique e segure na foto para reordenar
                                </Text>
                                <Button
                                    ml='3'
                                    bg='brand.blue'
                                    color='brand.white'
                                    onClick={() => {
                                        saveImagesChanged();
                                    }}
                                >
                                    Salvar Alterações
                                </Button>
                            </Flex>

                            <Flex
                                w='100%'
                                h='80%'
                                //h={{ base:'40vh', lg:'80vh' }}
                                //alignItems='center'
                                justifyContent='center'
                                //flexWrap='wrap'
                                overflowY='scroll'
                                pt='2'
                                //direction='column'
                            >
                                
                                <RUG 
                                    //zIndex={10}
                                    //w='100%'
                                    initialState={photos.map((el, index) => {
                                        console.log(index);
                                        return (
                                            {source:`http://localhost:5000/images/enterprise/${photos[photos.length-index-1]}`, name: photos[photos.length-index-1]}
                                        )
                                    })
                                    }
                                    action="http://example.com/upload"  
                                    autoUpload={false}
                                    rules={{
                                        limit: 25,
                                        size: 1024,
                                        width: {
                                            min: 600
                                        },
                                        height: {
                                            min: 400
                                        }
                                    }}
                                    accept={['jpg', 'jpeg', 'png']}
                                    onSortEnd={(images, {oldIndex, newIndex}) => {
                                        //console.log(images);
                                        console.log(oldIndex);
                                        console.log(newIndex);
                                    }}
                                    onChange={(images) => {
                                        let newOrder = images.map((el, index) => {
                                            if( el.file == undefined) {
                                                return el.name;
                                            }
                                            else {
                                                return 'novaImagem';
                                            }
                                        })
                                        setData((prevData) => ({...prevData, photosNew: images}));
                                        setData((prevData) => ({...prevData, photosNewOrder: newOrder}));
                                    }}
                                    onDeleted={(image) => {
                                        // File undefined a imagem já existe no db
                                        // Save removed image in images removed array
                                        if( image.file == undefined ) {
                                            setData((prevData) => ({...prevData, photosRemoved: [prevData.photosRemoved, image.name]}));//[...prevData['photosRemoved'], image.name]})); //[...prevData.photosRemoved, image.name] }));
                                        }
                                    }}
                                    onWarning={(type, rules) => {
                                        switch(type) {
                                            case 'accept':
                                                console.log(`Only ${rules.accept.join(', ')}`);
                                                setFormErrors((formE) => ({...formE, photos: {...formE.photos, accept: `Formato inválido. Os formatos permitidos são ${rules.accept.join(', ')}`}}));

                                            case 'limit':
                                                console.log('limit <= ', rules.limit);
                                                setFormErrors((formE) => ({...formE, photos: {...formE.photos, maxLimit: `O limite de fotos é ${rules.limit}`}}));

                                            case 'size':
                                                console.log('max size <= ', rules.size);
                                                setFormErrors((formE) => ({...formE, photos: {...formE.photos, size: `O tamanho da imagem deve ser menor do que 1Mb.`}}));
                                        
                                            case 'minWidth': case 'minHeight':
                                                console.log('Dimensions > ', `${rules.width.min}x${rules.height.min}`);
                                                setFormErrors((formE) => ({...formE, photos: {...formE.photos, minDim: `A largura mínima deve ser 600px e a altura mínima deve ser 400px.`}}));
                                        
                                            case 'maxWidth': case 'maxHeight':
                                                console.log('Dimensions < ', `${rules.width.max}x${rules.height.max}`);
                                                //setFormErrors((formE) => ({...formE, photos: {...formE.photos, maxDim: `A largura máxima deve ser xx e a altura máxima deve ser yy.`}}));
                                        
                                            default:
                                        }
                                    }}
                                    header={({ openDialogue }) => (
                                        <DropArea
                                        >
                                        {
                                            (isDrag) => 
                                            <Flex style={{ background: isDrag ? 'yellow' : '#fff' }}
                                                w='100%'
                                            >
                                                <Button 
                                                    onClick={() => {
                                                        openDialogue();
                                                        setFormErrors((formE) => ({...formE, photos: {accept: '', minLimit: '', maxLimit: '', size: '', minDim: '', maxDim: ''}}));
                                                    }}
                                                    rightIcon={<Icon as={FiUpload}/>}
                                                >
                                                    Upload de Fotos
                                                </Button>
                                            </Flex>
                                        }
                                        </DropArea>
                                    )}
                                >                                
                                </RUG>                                
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>

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