import { Box, Flex, Text, Input, Icon, Img, Textarea, Button } from "@chakra-ui/react";
//import Image from 'next/image'
import FotoDebutante from '../assets/imgs/festaDebutante.jpg';
import { RiStarSFill, RiPhoneFill, RiWhatsappFill, RiMailFill } from "react-icons/ri";

export default function ServiceProfilePage() {
    const images = [9, 8, 7, 6, 5].map((number) => ({
        src: `https://www.donaantoniabolos.com.br/bolo-especial/3b.jpg`
    }));

    return (
        <Box>
            {/* Content */}
            <Flex w='100%' justifyContent='center'>
                <Flex w='70%' direction='column'>

                    {/* Details about the service */}
                    <Flex direction='column'>
                        <Flex alignItems='flex-end'>
                            <Text as='h1'
                                fontSize={30}
                                fontWeight={400}
                            >
                                Recanto da Alvorada
                            </Text>
                            <Text ml='3' border='2px solid red' borderRadius={5}
                                p='1'
                            >
                                Premium
                            </Text>
                        </Flex>
                        
                        <Flex mt='2'>
                            <Text>São Paulo, SP</Text>
                            <Text ml='5'>Ver no mapa</Text>
                        </Flex>
                        
                        <Flex mt='2'>
                            <Flex alignItems='center'>
                                <Icon as={RiStarSFill} color='red' />
                                <Text ml='1'>
                                    5,0
                                </Text>
                            </Flex>

                            <Flex ml='3' alignItems='center'>
                                <Icon as={RiPhoneFill}/>
                                <Text ml='1'>
                                    Ver Tefone
                                </Text>
                            </Flex>

                            <Flex ml='3' alignItems='center'>
                                <Icon as={RiWhatsappFill} color='green'/>
                                <Text ml='1'>
                                    Ver Whatsapp
                                </Text>
                            </Flex>

                            <Flex ml='3' alignItems='center'>
                                <Icon as={RiMailFill}/>
                                <Text ml='1'>
                                    Ver E-mail
                                </Text>
                            </Flex>

                        </Flex>
                    </Flex>                        


                    {/* Photos */}
                    <Flex w='100%' pb='10' pt='5' h={500}>
                        <Flex w='50%'>
                            <Img 
                                borderLeftRadius={8} 
                                objectFit='cover'
                                src='https://www.tuacasa.com.br/wp-content/uploads/2020/11/bolo-aniversario-masculino-00.png'
                            />
                        </Flex>

                        <Flex w='50%' h='100%' flexWrap='wrap' >
                            <Flex w='50%' h='50%' pl='2' pb='1'>
                                <Img 
                                    src='https://www.tuacasa.com.br/wp-content/uploads/2020/11/bolo-aniversario-masculino-00.png'
                                    objectFit='cover'
                                />
                            </Flex>
                            <Flex w='50%' h='50%' pl='2' pb='1'>
                                <Img 
                                    borderTopRightRadius={8}
                                    objectFit='cover'
                                    src='https://www.tuacasa.com.br/wp-content/uploads/2020/11/bolo-aniversario-masculino-00.png'
                                />
                            </Flex>
                            <Flex w='50%' h='50%' pl='2' pt='1'>
                                <Img 
                                    src='https://www.tuacasa.com.br/wp-content/uploads/2020/11/bolo-aniversario-masculino-00.png'
                                    objectFit='cover'
                                />
                            </Flex>
                            <Flex w='50%' h='50%' pl='2' pt='1' position='relative'>
                                <Button 
                                    bg='white'
                                    color='black'
                                    w='70%'
                                    position='absolute'
                                    top='50%'
                                    left='50%'
                                    transform='translate(-50%, 80%)'
                                >
                                    Ver todas fotos
                                </Button>
                                <Img 
                                    src='https://www.tuacasa.com.br/wp-content/uploads/2020/11/bolo-aniversario-masculino-00.png'
                                    borderBottomRightRadius={8}
                                    objectFit='cover'
                                />
                            </Flex>
                        </Flex>
                            
                    </Flex>

                    <Flex direction='row'>

                        <Flex w='65%' direction='column' pr='20'>
                            {/* Description about the service */}
                            <Flex direction='column'
                                height={1500}
                            >
                                <Text
                                    as='h2'
                                    fontSize={20}
                                    fontWeight={700}
                                >
                                    Descrição
                                </Text>

                                <Text as='p'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
                                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim 
                                    id est laborum.
                                </Text>
                            </Flex>

                            {/* Description about the service */}
                            <Flex direction='column'>
                                <Text
                                    as='h2'
                                    fontSize={20}
                                    fontWeight={700}
                                >
                                    Descrição
                                </Text>

                                <Text as='p'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
                                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim 
                                    id est laborum.
                                </Text>
                            </Flex>

                            {/* Description about the service */}
                            <Flex direction='column'>
                                <Text
                                    as='h2'
                                    fontSize={20}
                                    fontWeight={700}
                                >
                                    Descrição
                                </Text>

                                <Text as='p'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
                                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim 
                                    id est laborum.
                                </Text>
                            </Flex>

                            {/* Usefull details about the service */}
                            <Flex direction='column' my='3'>
                                <Text as='h2' 
                                    fontSize={18}
                                    fontWeight={700}
                                >
                                    Informações rápidas
                                </Text>

                                <Text as='h3'>
                                    Subtitle
                                </Text>

                                <Text as='p'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                                </Text>

                            </Flex>
                        </Flex>

                        {/* Card */}
                        <Flex w='35%' 
                            justifyContent='flex-end'
                        >
                            <Flex 
                                h={420}
                                w='85%'
                                position='sticky'
                                top={20}
                                px='5'
                                boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                                borderRadius={8}
                                direction='column'
                                textAlign='center'
                            >

                                <Text as='h2'
                                    fontSize={21}
                                    fontWeight={500}
                                    my='4'
                                >
                                    Pedir um orçamento!
                                </Text>

                                <Flex 
                                    direction='column'
                                    textAlign='left'
                                >
                                    
                                    <Flex direction='column' mb='3'>
                                        <Text as='span'>Data do evento</Text>
                                        <Input type='date' />
                                    </Flex>

                                    <Flex direction='column' mb='3'>
                                        <Text as='span'>Número de convidados</Text>
                                        <Input type='number' />
                                    </Flex>

                                    <Flex direction='column' mb='3'>
                                        <Text as='span'>Mensagem</Text>
                                        <Textarea resize='none' maxLength={300} h={100}/>
                                    </Flex>

                                    <Button
                                        bg='red'
                                        color='white'
                                        height={12}
                                        fontSize={18}
                                    >
                                        Pedir orçamento!
                                    </Button>




                                </Flex>
                            </Flex>    


                        </Flex>

                    </Flex>


                    {/* Rating */}
                    <Flex>

                    </Flex>

                    {/* Opinions about the service */}
                    <Flex>

                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
}