import Head from 'next/head'
import Image from 'next/image'
import { Box, Button, Flex, Icon, Input, Text, Link as NavLink } from '@chakra-ui/react';
import FotoDebutante from '../assets/imgs/festaDebutante.jpg';
import FotoInfantilFem from '../assets/imgs/festaInfantilFeminino1.jpg';
import FotoInfantilMasc from '../assets/imgs/festaInfantilMasculino1.jpg';

import Debutante from '../assets/imgs/debutante.png';
import IdosoAniversario from '../assets/imgs/idoso-aniversario.png';
import MulherAniversario from '../assets/imgs/mulher-aniversario.png';
import CriancaAniversario from '../assets/imgs/crianca-aniversario.png';


import { useState } from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { MenuServicesOnClick } from '../components/MenuServicesOnClick';
import { RiBriefcaseLine, RiCake2Fill } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { locationMap, typeOfParties, typeOfServices } from '../utils/typeOfParties';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


export default function HomePage() {
    let photo = [FotoDebutante, FotoInfantilFem, FotoInfantilMasc]
    const [photoNum, setPhotNum] = useState(0);

    const [searchData, setSearchData] = useState({ partyType: '', serviceCategory: '', serviceSpecificCategory: '', location: '', city: '', state: '', country: ''});
    const [menuPartyTypeDisp, setMenuPartyTypeDisp] = useState('none');
    const [menuService, setMenuService] = useState('none');
    const [searchInputValueFirst, setSearchInputValueFirst] = useState('');
    const [menuWhere, setMenuWhere] = useState('none');

    const [cardSearchData, setCardSearchData] = useState({ partyType: 'Infantil', service: ''});

    const routerSearch = useRouter();
    const handleDragStart = (e) => e.preventDefault();


    function handleSearch() {

        routerSearch.push({
            pathname: '/services',
            query: { 
                partyType: searchData.partyType,
                serviceCategory: searchData.serviceCategory,
                serviceSpecificCategory: searchData.serviceSpecificCategory,
                city: searchData.city,
                state: searchData.state,
                country: searchData.country
            }
        });

    }

    function handleSearchData( event: any ) {
        setSearchData({...searchData, [event.currentTarget.name]: event.currentTarget.value});
    }

    // Return to previous step in the first search input
    function previousStepSearch() {
        setSearchData({...searchData, partyType:'', serviceCategory:'', serviceSpecificCategory: ''});
        // Hide Service Menu
        setMenuService('none');
        // show Party Type Menu
        setMenuPartyTypeDisp('');
        // Reset previous search on Party Type Menu
        searchFunction({currentTarget: { value: ''}}, 'menuPartyType');
        // Reset input value
        setSearchInputValueFirst('');
    }

    // Show current state of searchData
    function showData() {
        console.log( searchData );
    }

    // Used in Menu search
    function searchFunction( event: any, menuId: string ) {
        console.log( event.currentTarget.value );
        let inputValue = event.currentTarget.value.toUpperCase();
        let menu = document.getElementById( menuId );
        let itemList = menu.getElementsByTagName("button");
        
        for (let i = 0; i < itemList.length; i++) {
            if (itemList[i].innerHTML.toUpperCase().indexOf(inputValue) > -1) {
                itemList[i].style.display = "";
            } 
            else {
                itemList[i].style.display = "none";
            }
        }
    }

    return (
        <Box>
        
            {/* Header */}
            {/*************/}

            <Header name='' position='relative' />

            
            {/* Carroussel and Menu */}
            <Flex 
                h='90vh' 
                w='100vw'
                fontSize={32}
                justifyContent='center'
                
                //alignItems='center'
                //position='absolute'
                bg='brand.yellow'
            >
                
                <Flex 
                    width='100%' 
                    height='90vh' 
                    alignItems='center'
                    justifyContent='space-between'
                    bg='rgba(0,0,0,0)' zIndex={5}
                    position='absolute'

                >
                    
                    <Flex
                        direction='column' justifyContent='center'
                        width='50%'
                        //bg='brand.yellow'
                        borderRadius={30}
                        borderRightRadius='50%'
                        pl='40'
                        h='100%'
                    >

                        <Text as='h2' fontSize={42} color='black'
                            zIndex={2} fontWeight={600} textAlign='center'
                            mb='6'
                        >
                            Tudo para a sua festa de aniversário!
                        </Text>

                        <Flex 
                            width='90%'
                            height={16}
                            borderRadius={8}
                            alignItems='center'
                            mx='auto'
                            boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.65)"
                        >   

                            {/* O que você procura ? */}
                            <Flex direction='column'
                                w='40%'
                                h='100%'
                            >

                                <Input placeholder='O que você procura ?'
                                    fontSize={19}
                                    id='partyTypeAndServicesInput'
                                    bg='white'
                                    w='100%'
                                    h='100%'
                                    borderRightRadius={0}
                                    _focus={{outline:'none'}}
                                    autoComplete='off'
                                    onChange={(event: any) => { 
                                        setSearchInputValueFirst( event.currentTarget.value );
                                        if( searchData.partyType === '' ) {
                                            searchFunction(event, "menuPartyType");
                                        }
                                        else {
                                            if( event.currentTarget.value.length === 0 ) {
                                                setMenuService('onclick');
                                            }
                                            else {
                                                setMenuService('onsearch');
                                                searchFunction(event, "menuServices");
                                            }
                                        }
                                    }}
                                    onClick={() => {
                                        if(searchData.partyType === '') {
                                            setMenuPartyTypeDisp('');
                                        }
                                        else if (searchData.serviceCategory === '') {
                                            setMenuService('onclick');
                                        }
                                        // Both are already setted up, reset all and start again
                                        else {
                                            setSearchData({...searchData, partyType: '', serviceCategory: '', serviceSpecificCategory: ''});
                                            setSearchInputValueFirst('');
                                            setMenuPartyTypeDisp('');
                                            // Reset previous search on Party Type Menu
                                            searchFunction({currentTarget: { value: ''}}, 'menuPartyType');
                                        }
                                    }}
                                    value={ 
                                        ( searchData.partyType !== '' && searchData.serviceCategory !== '' )
                                        ?
                                        searchData.partyType + ' / ' + searchData.serviceCategory + ' / ' + searchData.serviceSpecificCategory
                                        :
                                        searchInputValueFirst
                                    }
                                />


                                {/* Menu PartyType onClick and onSearch */}
                                <Box 
                                    height={230} 
                                    width={350}
                                    overflowY="scroll"
                                    display={menuPartyTypeDisp}
                                    position='absolute'
                                    bg='white'
                                    mt={20}
                                    borderRadius={10}
                                >
                                    <Flex direction="column" id="menuPartyType"
                                        h='100%'
                                    >
                                        <Text
                                            h='20%'
                                            fontSize={19}
                                            fontWeight={400}
                                            color='black'
                                            px='5'
                                            py='2'
                                            bg='rgba(0,0,0,0.1)'
                                        >
                                            Qual o tipo da festa ?
                                        </Text>

                                        {
                                        
                                        Object.values(typeOfParties).map((el, i) => {
                                            return(
                                                <Button
                                                    bg='white'
                                                    h='25%'
                                                    px='5'
                                                    borderRadius={0}
                                                    _focus={{outline:'none'}}
                                                    _hover={{bg:'rgba(0,0,0,0.1)'}}
                                                    name='partyType'
                                                    value={el.value}
                                                    onClick={(event) => {
                                                        handleSearchData(event);
                                                        setSearchInputValueFirst('');
                                                        setMenuPartyTypeDisp('none');
                                                        setMenuService('onclick');
                                                        document.getElementById('partyTypeAndServicesInput').focus();
                                                    }}
                                                >
                                                    <Text
                                                        width='100%'
                                                        textAlign='left'
                                                        fontWeight={400}
                                                        fontSize={18}
                                                    >
                                                        {el.textToShow}
                                                    </Text>
                                                </Button>
                                            );
                                        })
                                        }
                                    </Flex>
                                </Box>
                                

                                
                                {/* Menu onClick */}
                                <Box 
                                    height={300} 
                                    width={700}
                                    overflowY="scroll"
                                    display={menuService == 'onclick' ? '' : 'none'}
                                    position='absolute'
                                    bg='white'
                                    mt={20}
                                    borderRadius={10}
                                >
                                    <MenuServicesOnClick 
                                        handlePreviousStep={previousStepSearch}
                                        name='service'
                                        partyType={searchData.partyType}
                                        handleClick={(event) => {
                                            console.log('menuServicesOnClick');
                                            console.log(searchData.partyType);
                                            setSearchData({...searchData, serviceCategory: event.currentTarget.value.split('-')[0], serviceSpecificCategory: event.currentTarget.value.split('-')[1]});
                                            setMenuService('none');
                                        }}
                                    />
                                </Box>



                                {/* Menu onSearch */}
                                <Box 
                                    height={400} 
                                    width={280}
                                    overflowY="scroll"
                                    display={menuService == 'onsearch' ? '' : 'none'}
                                    position='absolute'
                                    bg='white'
                                    mt={20}
                                    borderRadius={10}
                                >
                                    <Flex direction="column" id="menuServices"
                                    >
                                        {
                                        typeOfServices[searchData.partyType]?.services.map((el, i) => {
                                            return(
                                                <Button
                                                    name='service'
                                                    value={el.parent+'-'+el.value}
                                                    onClick={(event) => {
                                                        setSearchData({...searchData, serviceCategory: el.parent, serviceSpecificCategory: el.value});
                                                        setMenuService('none');
                                                    }}
                                                >
                                                    {el.textToShow}
                                                </Button>
                                            );
                                        })
                                        }
                                    </Flex>
                                </Box>

                            </Flex>
                            
                            <Flex direction='column'
                                w='40%'
                                h='100%'
                            >
                                {/* Onde - Localização */}
                                <Input placeholder='Onde ?'
                                    fontSize={19}
                                    bg='white'
                                    w='100%'
                                    h='100%'
                                    autoComplete='off'
                                    borderRadius={0}
                                    _focus={{outline:'none'}}
                                    value={searchData.location}
                                    onChange={(event: any) => {
                                        setSearchData({...searchData, location: event.currentTarget.value})
                                        searchFunction(event, "menuWhere");
                                    }}
                                    onClick={() => {
                                        setMenuWhere('onclick')
                                    }}
                                />
                                <Box 
                                    height={230} 
                                    width={350}
                                    overflowY="scroll"
                                    display={menuWhere}
                                    position='absolute'
                                    bg='white'
                                    mt={20}
                                    borderRadius={10}
                                >
                                    <Flex direction="column" id="menuWhere"
                                        h='100%'
                                    >

                                        {
                                        
                                        Object.values(locationMap).map((el, i) => {
                                            return(
                                                <Button
                                                    bg='white'
                                                    h='25%'
                                                    px='5'
                                                    py='4'
                                                    borderRadius={0}
                                                    _focus={{outline:'none'}}
                                                    _hover={{bg:'rgba(0,0,0,0.1)'}}
                                                    //name='partyType'
                                                    //value={searchData.location}
                                                    onClick={(event) => {
                                                        setSearchData({...searchData, location: el.textToShow, city: el.city, state: el.state, country: el.country})
                                                        setMenuWhere('none');
                                                    }}
                                                >
                                                    <Text
                                                        width='100%'
                                                        textAlign='left'
                                                        fontWeight={400}
                                                        fontSize={18}
                                                    >
                                                        {el.textToShow}
                                                    </Text>
                                                </Button>
                                            );
                                        })
                                        }
                                    </Flex>
                                </Box>
                            </Flex>

                            <Button
                                w='20%'
                                h='100%'
                                //py='7'
                                borderLeftRadius={0}
                                bg='brand.red'
                                color='white'
                                fontSize={18}
                                fontWeight={900}
                                _focus={{outline:'none'}}
                                onClick={handleSearch}
                            >
                                Pesquisar
                            </Button>
                        </Flex>

                    </Flex>
                
                    {/* Square of pictures */}
                    <Flex direction='column' 
                        justifyContent='center'
                        alignItems='center'
                        w='50%'
                        h='100%'
                        bg='brand.white'
                        borderLeftRadius='50%'
                        //borderRightRadius='50%'

                        
                        
                    >
                        <Flex  mb='5' mx='auto'>
                            <Flex position='relative'
                                h={230} w={230}
                                mr='5' 
                                borderRadius={4}
                                overflow='hidden'
                                
                            >
                                <Image
                                    src={CriancaAniversario}
                                    layout='fill'
                                    objectFit='cover'
                                /> 
                            </Flex>

                            <Flex position='relative'
                                h={230} w={230}
                                borderRadius={4}
                                overflow='hidden'
                            >
                                <Image
                                    src={Debutante}
                                    layout='fill'
                                    objectFit='cover'
                                /> 
                            </Flex>
                        </Flex>
                                        
                        <Flex mx='auto'>
                            <Flex position='relative'
                                h={230} w={230}
                                mr='5'
                                borderRadius={4}
                                overflow='hidden'
                            >
                                <Image
                                    src={MulherAniversario}
                                    layout='fill'
                                    objectFit='cover'
                                /> 
                            </Flex>

                            <Flex position='relative'
                                h={230} w={230}
                                borderRadius={4}
                                overflow='hidden'
                            >
                                <Image
                                    src={IdosoAniversario}
                                    layout='fill'
                                    objectFit='cover'
                                /> 
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>

                {
                /* 

                <Carousel
                    width='100vw'
                    autoPlay={true}
                    infiniteLoop
                    transitionTime={800}
                    interval={4000}
                    showThumbs={false}
                    z-index={3}
                >

                        {
                            photo.map((image, i) => {
                                return (
                                        <Box
                                            h='70vh' 
                                            w='100vw'
                                            justifyContent='center'
                                            alignItems='center'
                                            position='relative'
                                        >
                                            <Image
                                                src={image}
                                                //height={100}
                                                //height={100}
                                                //width='auto'
                                                layout='fill'
                                                objectFit='cover'
                                                //objectPosition=
                                            /> 
                                        </Box>
                                )
                            })
                        }
                    
                </Carousel>

                */
                }
            </Flex>


            {/* Ache fornecedores */}
            <Flex
                w='100%'
                h='auto'
                bg='brand.white'
                direction='column'
                alignItems='center'
                justifyContent='center'
                my='10'                
            >
                <Text
                    h="5vh"
                    fontSize={25}
                >
                    Qual o tipo da sua festa ?
                </Text>


                <Flex direction='row'
                    w='80%'
                    h='12vh'
                    alignItems='center'
                    justifyContent='center'
                    mt='5'
                >  

                    {
                        Object.values(typeOfParties).map((el, index) => {
                            return (
                                <Button
                                    h='80%'
                                    bg='brand.white'
                                    border='2px solid'
                                    borderColor='brand.dark_blue'
                                    onDragStart={handleDragStart}
                                >
                                    {el.textToShow}
                                </Button>
                            )
                        })
                    }   
                    

                </Flex>
            
                <Flex 
                    justifyContent='center'
                    alignItems='flex-start'
                    h='35vh'
                    w='60%'
                    my={0}
                    //overflowX='scroll'                    
                >
                   

                    <AliceCarousel
                        //autoWidth={true}
                        //width='100%'
                        //autoWidth={true}
                        autoPlay={false}
                        autoHeight={true}
                        responsive={{
                            0: {items:1},
                            1024: {items:5}
                        }}

                        mouseTracking
                        items={
                            typeOfServices[cardSearchData.partyType].services.map((el, index) => {
                                return (
                                    <Button
                                        h='15vh'
                                        w='90%'
                                        key={index}
                                        boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                                        bg='brand.yellow'
                                    >
                                        <Flex w='100%'
                                            h='100%'
                                            direction='column'
                                            alignItems='center'
                                            justifyContent='center'
                                            
                                        >
                                            <Icon as={RiCake2Fill} />
                                            <Text>
                                                {el.textToShow}
                                            </Text>
                                        </Flex>
                                    </Button>
                                );
                            })
                        }
                    />
                    
                    
                </Flex>
            

            </Flex>




            <Footer/>
        </Box>
    )
}
