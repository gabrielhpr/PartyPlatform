import { Box, Flex, Icon, Text, Link as NavLink } from "@chakra-ui/react";
import { RiMailFill } from "react-icons/ri";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import Logo from "../assets/imgs/logo3.png";
import Image from "next/image"
import CriancaAniversario from "../assets/imgs/crianca-aniversario.png";
import Debutante from "../assets/imgs/debutante.png";
import EntregaPresente from "../assets/imgs/entrega-presente.png";
import IdosoAniversario from "../assets/imgs/idoso-aniversario.png";
import KidBirthday from "../assets/imgs/kid-birthday.jpg";
import MulherAniversario from "../assets/imgs/mulher-aniversario.png"
import PessoasFesta from "../assets/imgs/pessoas-festa.jpg";

export default function ContactPage() {
    return (
        <Box>
            {/* Header */}
            <Header name='' position='relative' />

            <Sidebar/>

            <Flex
                direction='column'
                alignItems='center'
                justifyContent='center'
                h='auto'
                py='5'
            >
                <Text
                    fontSize={{base:28, lg:32}}
                    fontWeight={500}
                    py='2'
                >
                    Direitos Autorais das imagens
                </Text>

                <Text
                    textAlign='center'
                    fontSize={{base:18,lg:20}}
                    mt='0'
                >
                </Text>
               
               
                
                <Flex
                    w={{base:'100%', lg:'80%'}}
                    mt='5'
                    direction='column'
                    justifyContent='center'
                    alignItems='center'

                >
                    {
                    [
                        {src: CriancaAniversario, href: 'http://www.freepik.com', name:'Kid birthday by freepik - www.freepik.com'},
                        {src: Debutante, href: 'http://www.freepik.com', name: 'Foto Debutante - br.freepik.com'},
                        {src: EntregaPresente, href: 'https://www.freepik.com/photos/happy-birthday-party', name: 'Happy birthday party photo created by freepik - www.freepik.com'},    
                        {src: IdosoAniversario, href: 'https://br.freepik.com/fotos-vetores-gratis/homem', name: 'Homem foto criado por karlyukav - br.freepik.com'},
                        {src: KidBirthday, href: 'https://www.freepik.com/photos/mom-dad', name: 'Mom dad photo created by freepik - www.freepik.com'},
                        {src: MulherAniversario, 
                            href: 'https://br.freepik.com/fotos-vetores-gratis/mulher', 
                            name: 'Mulher foto criado criado por benzoix - br.freepik.com'},
                        {src: PessoasFesta, href: 'https://www.freepik.com/photos/new-year-celebration', name:'New year celebration photo created by freepik - www.freepik.com'},
                    ].map((el, index) => {
                        return (
                            <Flex
                                direction='row'
                                alignItems='center'
                                //justifyContent='space-between'
                                w={{base:'90%', lg:'50%'}}
                                mb='3'
                            >
                                <Flex
                                    position='relative'
                                    h={{base: 55, lg:150}}
                                    w={{base:'20%', lg:'30%'}}
                                    mr='3'
                                >
                                    <Image
                                        src={el.src}   
                                        layout='fill'                 
                                    /> 
                                </Flex>

                                <NavLink
                                    href={el.href}
                                    isExternal
                                    color='blue'
                                    
                                    w={{base:'80%', lg:'70%'}}
                                >
                                    {el.name}
                                </NavLink>
                            </Flex>
                        )
                    })
                    }
                </Flex>
                

                <Flex
                    position='relative'
                    h={432/4}
                    w={571/4}
                    mx={{base:'auto', lg:'auto'}}
                    mt='6'
                    //h='auto'
                >
                    <Image
                        src={Logo}
                        layout="fill"
                        //width={150}
                    />
                </Flex>



            </Flex>

            <Footer/>
        </Box>
    );
}