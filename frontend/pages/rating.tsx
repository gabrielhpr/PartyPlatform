import { Button, Flex, Icon, Input, Menu, MenuButton, MenuItem, MenuItemOption, MenuList, MenuOptionGroup, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Text, Textarea, Tooltip } from "@chakra-ui/react";
import { useState } from "react";
import { RegisterFormLayout } from "../components/Enterprise/RegisterFormLayout";
import { RiInformationLine } from 'react-icons/ri';

interface ratingDataInterf {
    step: number;
    ratingServiceQuality: number;
    ratingPrice: number;
    ratingAnswerTime: number;
    ratingFlexibility: number;
    ratingProfessionalism: number;
    recommendToAFriend: string;
    recommendToAFriendObservation: string;
    opinionTitle: string;
    opinionContent: string;
}

const ratingDataNullState = {
    step: 0,
    ratingServiceQuality: 0,
    ratingPrice: 0,
    ratingAnswerTime: 0,
    ratingFlexibility: 0,
    ratingProfessionalism: 0,
    recommendToAFriend: '',
    recommendToAFriendObservation: '',
    opinionTitle: '',
    opinionContent: ''
}


export default function Rating() {
    const [ratingData, setRatingData] = useState<ratingDataInterf>( ratingDataNullState );

    function nextStep() {
        setRatingData({...ratingData, step: ratingData.step + 1});
    }

    function previousStep() {       
        if( ratingData.step > 0) {
            setRatingData({...ratingData, step: ratingData.step - 1});
        }
    }

    function handleChange( event: any ) {
        setRatingData({...ratingData, [event.currentTarget.name]: event.currentTarget.value});
        console.log( ratingData );
    }

    switch( ratingData.step ) {

        case 0:
            return (
                <RegisterFormLayout 
                    question="A sua opinião vale muito!"
                    subTitle="Deixe aqui a sua opinião sobre os fornecedores"
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                    showFooterMenu={true}
                    style="yellow"
                >
                    <Flex direction='column' w='50%' alignItems='center'>
                        <Text
                            textAlign='center'
                        >
                            Escreva abaixo o nome do fornecedor que você quer 
                            deixar uma opinião.
                        </Text>

                        <Input 
                            mt='7'
                            w='80%' 
                            placeholder="Nome da empresa"
                        
                        />

                    </Flex>
                </RegisterFormLayout>
            )
        case 1:
            return (
                <RegisterFormLayout 
                    question="Avalie o fornecedor por quesitos"
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                    showFooterMenu={true}
                    style="yellow"
                >
                    <Flex direction='column' w='60%' alignItems='center'>
                        
                        {/* Infos do prestador de serviço */}
                        <Flex
                            border='2px solid black'
                            w='100%'
                            mb='4'
                        >
                            <Text>
                                Infos do fornecedor
                            </Text>
                        </Flex>

                        {
                            [
                                {title: 'Qualidade do serviço', name: 'ratingServiceQuality', subTitle: 'Avalie se o prestador de serviço cumpriu com o prometido, prestando atenção a todos os detalhes requeridos por você.' },
                                {title: 'Relação Custo Benefício', name: 'ratingPrice', subTitle: 'Considerando o preço e a qualidade do serviço, avalie se o valor cobrado condiz com a qualidade.' },
                                {title: 'Tempo de resposta', name: 'ratingAnswerTime', subTitle: 'Avalie se o fornecedor realizou um atendimento adequado, respondendo às suas dúvidas com atenção.' },
                                {title: 'Flexibilidade', name: 'ratingFlexibility', subTitle: 'Avalie o fornecedor de acordo com a sua habilidade de se adaptar a possíveis imprevistos.' },
                                {title: 'Profissionalismo', name: 'ratingProfessionalism', subTitle: 'Avalie se o fornecedor foi um bom profissional, entregando o que prometeu, lidando bem com os imprevistos e tratando você com respeito. ' }
                            ].map((el, index) => {
                                return (
                                    <Flex direction='column' width='100%'
                                        mb='2'
                                    >
                                        <Flex >

                                            <Text fontWeight={500}
                                                fontSize={20}
                                                mr='1'
                                            >
                                                {el.title}
                                            </Text>

                                            <Tooltip label={el.subTitle} aria-label='A tooltip'
                                                w='100%' h='100%'
                                            >
                                                <Text as='span'>
                                                    <Icon as={RiInformationLine} w='100%' h='100%'/>
                                                </Text>
                                            </Tooltip>
                                        </Flex>
                                                            
                                        

                                        <Flex justifyContent='space-between'
                                            alignItems='center'
                                            mb='2'
                                        >
                                            <Text as='span'>
                                                Nota
                                            </Text>

                                            <Menu>
                                                <MenuButton as={Button} >
                                                    {ratingData[el.name] != 0 ? ratingData[el.name] : 'Nota'}
                                                </MenuButton>
                                                <MenuList>
                                                    <MenuOptionGroup type='radio'
                                                        onChange={(event: any) => {
                                                            setRatingData({...ratingData, [el.name]: event});
                                                            console.log( ratingData );
                                                        }}
                                                    >
                                                        <MenuItemOption value='5'>
                                                            5 - Excelente
                                                        </MenuItemOption>
                                                        
                                                        <MenuItemOption value='4'>
                                                            4 - Ótimo
                                                        </MenuItemOption>
                                                        
                                                        <MenuItemOption value='3'>
                                                            3 - Bom
                                                        </MenuItemOption>

                                                        <MenuItemOption value='2'>
                                                            2 - Regular
                                                        </MenuItemOption>

                                                        <MenuItemOption value='1'>
                                                            1 - Ruim
                                                        </MenuItemOption>
                                                    </MenuOptionGroup>
                                                </MenuList>
                                            </Menu>
                                        </Flex>

                                        <Flex border='0.5px solid rgba(0,0,0,0.4)'
                                            
                                        ></Flex>
                                    </Flex>
                                )
                            })
                        }
                        

                    </Flex>
                </RegisterFormLayout>
            )
        case 2:
            return (
                <RegisterFormLayout 
                    question="Escreva a sua opinião!"
                    //subTitle="Deixe aqui a sua opinião sobre os fornecedores"
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                    showFooterMenu={true}
                    style="yellow"
                >
                    <Flex direction='column' w='50%' alignItems='flex-start'>

                        <Stack direction='column' spacing={3} w='100%'>
                            <Text fontSize={18} textAlign='center'>
                                Você recomendaria o serviço a um amigo ?
                            </Text>
                            <Flex justifyContent='space-evenly'>
                                <Button w='45%' 
                                    bg={ratingData.recommendToAFriend == 'Sim' ? 'brand.red' : 'brand.white'}
                                    textColor={ratingData.recommendToAFriend == 'Sim' ? 'brand.white' : 'brand.dark_blue'}
                                    name='recommendToAFriend' 
                                    value='Sim'
                                    onClick={handleChange} 
                                >
                                    Sim
                                </Button>
                                <Button w='45%' 
                                    bg={ratingData.recommendToAFriend == 'Não' ? 'brand.red' : 'brand.white'}
                                    textColor={ratingData.recommendToAFriend == 'Não' ? 'brand.white' : 'brand.dark_blue'}
                                    name='recommendToAFriend' 
                                    value='Não'
                                    onClick={handleChange} 
                                >
                                    Não
                                </Button>
                            </Flex>
                            <Input placeholder="Observações: " 
                                name='recommendToAFriendObservation' 
                                onChange={handleChange}
                            />
                        </Stack>

                        <Flex direction='column' mt='10' mb='3' w='100%'>
                            <Text fontSize={18}>Título da sua opinião</Text>
                            <Input placeholder="Escreva aqui o título da sua opinião"
                                name='opinionTitle'
                                onChange={handleChange}
                            />
                        </Flex>

                        <Flex direction='column' w='100%'>
                            <Text fontSize={18}>Opinião</Text>
                            <Textarea placeholder="Descreva em detalhes as suas impressões sobre o serviço prestado pelo fornecedor" 
                                name='opinionContent'
                                onChange={handleChange}
                            />
                        </Flex>

                    </Flex>
                </RegisterFormLayout>
            )
        case 3:
            return (
                <RegisterFormLayout 
                    question="Realize o login para enviar a sua avaliação!"
                    //subTitle="Deixe aqui a sua opinião sobre os fornecedores"
                    handleNextStep={nextStep}
                    handlePreviousStep={previousStep}
                    showFooterMenu={true}
                    style="yellow"
                >
                    <Flex direction='column' w='50%' alignItems='center'>
                        <Text
                            textAlign='center'
                        >
                            Escreva abaixo o nome do fornecedor que você quer 
                            deixar uma opinião.
                        </Text>

                        <Input 
                            mt='7'
                            w='80%' 
                            placeholder="Nome da empresa"
                        
                        />

                    </Flex>
                </RegisterFormLayout>
            )
    }
}