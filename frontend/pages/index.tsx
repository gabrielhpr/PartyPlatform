import Head from 'next/head'
import Image from 'next/image'
import { Box, Button, Flex, Icon, Input, Text, Link as NavLink, useBreakpointValue } from '@chakra-ui/react';

import Debutante from '../assets/imgs/debutante.png';
import IdosoAniversario from '../assets/imgs/idoso-aniversario.png';
import MulherAniversario from '../assets/imgs/mulher-aniversario.png';
import CriancaAniversario from '../assets/imgs/crianca-aniversario.png';


import { useEffect, useState } from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { MenuServicesOnClick } from '../components/MenuServicesOnClick';
import { RiBriefcaseLine, RiCake2Fill, RiCloseFill, RiArrowGoBackFill } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { locationMap, typeOfParties, typeOfServices } from '../utils/typeOfParties';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Sidebar } from '../components/Sidebar';


export default function HomePage() {
    const [photoNum, setPhotNum] = useState(0);

    const [searchData, setSearchData] = useState({ partyType: '', serviceCategory: '', serviceSpecificCategory: '', location: '', city: '', state: '', country: ''});
    const [menuPartyTypeDisp, setMenuPartyTypeDisp] = useState('none');
    const [menuService, setMenuService] = useState('none');
    const [searchInputValueFirst, setSearchInputValueFirst] = useState('');
    const [menuWhere, setMenuWhere] = useState('none');

    const [cardSearchData, setCardSearchData] = useState({ partyType: 'Infantil', service: ''});

    const routerSearch = useRouter();
    const handleDragStart = (e) => e.preventDefault();

    const isMobileVersion = useBreakpointValue({
        base: true,
        lg: false,
    });

    // Close dropdown menu on click outside
    useEffect(() => {
        if( !isMobileVersion ) {
            console.log('entrou');
            document.addEventListener('mouseup', function (e) {
                var menu1 = document.getElementById('menuPartyTypeOnClickAndOnSearch');
                var menu2 = document.getElementById('menuServicesOnClick');
                var menu3 = document.getElementById('menuServicesOnSearch');
                var menu4 = document.getElementById('menuLocation');
    
                if (!menu1?.contains(e.target)) {
                    setMenuPartyTypeDisp('none');
                }
                if (!menu2?.contains(e.target)) {
                    setMenuService('none');
                }
                if (!menu3?.contains(e.target)) {
                    setMenuService('none');
                }
                if (!menu4?.contains(e.target)) {
                    setMenuWhere('none');
                }
    
            }.bind(this));
        }
    },[]);


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

            <Sidebar/>
            
            {/* Carroussel and Menu */}
            <Flex 
                height='92vh'
                w='100vw'
                fontSize={32}
                justifyContent='center'
                bg='brand.yellow'
            >
                
                <Flex 
                    width='100%' 
                    height='92vh'
                    alignItems='center'
                    justifyContent='space-between'
                    bg='rgba(0,0,0,0)' zIndex={5}
                    position='absolute'
                    flexWrap='wrap'
                >
                    {/* Menus */}
                    <Flex
                        direction='column' 
                        justifyContent={{base:'center', lg:'center'}}
                        width={{base:'100%', lg:'50%'}}
                        h={{base:'50%', lg:'100%'}}
                        //bg='brand.yellow'
                        borderRadius={30}
                        borderRightRadius='50%'
                        px='30'
                    >

                        <Text as='h2' 
                            fontSize={{base:32,lg:42}}
                            fontWeight={600} 
                            color='black'
                            zIndex={2} 
                            textAlign='center'
                            mb='8'
                        >
                            Tudo para a sua festa de aniversário!
                        </Text>

                        <Flex 
                            width='90%'
                            height={{base:'auto',lg:16}}
                            borderRadius={8}
                            alignItems='center'
                            direction={{base:'column',lg:'row'}}
                            mx='auto'
                            boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.65)"
                        >   

                            {/* O que você procura ? */}
                            <Flex direction='column'
                                w={{base:'100%',lg:'40%'}}
                                h='100%'
                            >

                                <Input placeholder='O que você procura ?'
                                    fontSize={19}
                                    id='partyTypeAndServicesInput'
                                    bg='white'
                                    w='100%'
                                    h='100%'
                                    py={{base:'3',lg:'0'}}
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
                                        console.log('clicou');
                                        if(searchData.partyType === '') {
                                            setMenuPartyTypeDisp('');
                                        }
                                        else if (searchData.serviceCategory === '') {
                                            if(isMobileVersion) {
                                                console.log('is mobile version');
                                                setMenuService('mobile');
                                            }
                                            else {
                                                console.log('not mobile version');
                                                setMenuService('onclick');
                                            }
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
                                    height={{base:'100vh',lg:230}}
                                    width={{base:'100vw',lg:350}}
                                    mt={{base:12,lg:20}}
                                    position={{base:'fixed',lg:'absolute'}}
                                    left={{base:0, lg:'auto'}}
                                    bottom={{base: 0, lg:'auto'}}
                                    borderTopRadius={{base:'30%'}}
                                    borderRadius={{base:0, lg:10}}
                                    id='menuPartyTypeOnClickAndOnSearch'
                                    overflowY="scroll"
                                    display={menuPartyTypeDisp}
                                    zIndex={3}
                                    bg='white'
                                >
                                    <Flex direction="column" id="menuPartyType"
                                        h='100%'
                                    >
                                        <Flex
                                            h={{base:'10%',lg:'20%'}}
                                            px='5'
                                            py='2'
                                            bg='rgba(0,0,0,0.1)'
                                            alignItems='center'
                                            justifyContent='space-between'
                                        >
                                            <Text
                                                fontSize={19}
                                                fontWeight={400}
                                                color='black'
                                            >
                                                Qual o tipo da festa ?
                                            </Text>
                                            
                                            {/* Close button - MOBILE*/}
                                            
                                            <Button 
                                                display={{base:'',lg:'none'}}
                                                bg='none'
                                                py='2' px='2'
                                                my='2' mx='2'
                                                _hover={{bg:'none', textColor: 'brand.red'}}
                                                _focus={{outline:'none'}}
                                                onClick={() => {
                                                    setMenuPartyTypeDisp('none');
                                                }}
                                            >
                                                <Icon as={RiCloseFill} fontSize={30} />
                                            </Button>
                                            

                                        </Flex>

                                        {
                                        /* Type of parties */
                                        Object.values(typeOfParties).map((el, i) => {
                                            return(
                                                <Button
                                                    bg='white'
                                                    h={{base:'10%',lg:'25%'}}
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
                                                        if( isMobileVersion ) {
                                                            console.log('is mobile versions');
                                                            
                                                            setMenuService('mobile');
                                                        }
                                                        else {
                                                            setMenuService('onclick');
                                                            document.getElementById('partyTypeAndServicesInput').focus();
                                                        }
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
                                

                                {/* MOBILE - Menu Services */}
                                <Box 
                                    id='menuServicesOnSearchMobile'
                                    height='100vh'
                                    width='100vw'
                                    mt={12}
                                    position='fixed'
                                    left={0}
                                    bottom={0}
                                    borderTopRadius='30%'
                                    borderRadius={0}
                                    zIndex={5}                                    
                                    overflowY="scroll"
                                    display={menuService == 'mobile' ? '' : 'none'}
                                    bg='brand.white'
                                >
                                    <Flex direction="column" 
                                        alignItems='center'
                                    >
                                        <Flex justifyContent='space-between'
                                            alignItems='center'
                                            w='100%'
                                        >
                                            <Button 
                                                bg='none'
                                                py='2' px='2'
                                                my='2' mx='2'
                                                _hover={{bg:'none', textColor: 'brand.red'}}
                                                _focus={{outline:'none'}}
                                                onClick={() => {
                                                    setMenuService('none');
                                                    setMenuPartyTypeDisp('');
                                                }}
                                            >
                                                <Icon as={RiArrowGoBackFill} 
                                                    fontSize={22} 
                                                />
                                            </Button>

                                            <Text
                                                fontSize={20}
                                                fontWeight={500}
                                            >
                                                O que procura ?
                                            </Text>
                                            <Button 
                                                bg='none'
                                                py='2' px='2'
                                                my='2' mx='2'
                                                _hover={{bg:'none', textColor: 'brand.red'}}
                                                _focus={{outline:'none'}}
                                                onClick={() => {
                                                    setMenuService('none');
                                                }}
                                            >
                                                <Icon as={RiCloseFill} fontSize={30} />
                                            </Button>
                                        </Flex>

                                        <Input placeholder='O que você procura ?'
                                            fontSize={19}
                                            mb='3'
                                            id='partyTypeAndServicesInputMobile'
                                            bg='white'
                                            w='90%'
                                            h='100%'
                                            py={{base:'3',lg:'0'}}
                                            borderRightRadius={10}
                                            _focus={{outline:'none'}}
                                            autoComplete='off'
                                            onChange={(event: any) => { 
                                                setSearchInputValueFirst( event.currentTarget.value );
                                                searchFunction(event, "menuServicesMobile");
                                                //handleSearchData({...searchData, serviceCategory: event.currentTarget.value});
                                            }}
                                            value={searchInputValueFirst}
                                        />

                                        <Flex id="menuServicesMobile" 
                                            direction='column'
                                            w='100%'
                                        >
                                            {
                                            typeOfServices[searchData.partyType]?.services.map((el, i) => {
                                                return(
                                                    <Button
                                                        key={i}
                                                        w='100%'
                                                        py='6'
                                                        bg='brand.white'
                                                        borderBottom='1px solid rgba(0,0,0,0.2)'
                                                        borderRadius={0}
                                                        name='service'
                                                        value={el.parent+'-'+el.value}
                                                        onClick={(event) => {
                                                            setSearchData({...searchData, serviceCategory: el.parent, serviceSpecificCategory: el.value});
                                                            setMenuService('none');
                                                        }}
                                                    >
                                                        <Text
                                                            textAlign='left'
                                                            w='80%'
                                                            fontWeight={400}
                                                        >
                                                            {el.textToShow}
                                                        </Text>
                                                    </Button>
                                                );
                                            })
                                            }
                                        </Flex>

                                    </Flex>
                                </Box>


                                {/* DESKTOP */}
                                {/* Menu onClick - Desktop */}
                                <Box 
                                    height={230}
                                    width={700}
                                    mt={20}
                                    position={'absolute'}
                                    left='auto'
                                    bottom='auto'
                                    borderRadius={10}
                                    id='menuServicesOnClick'
                                    overflowY="scroll"
                                    display={menuService == 'onclick' ? '' : 'none'}
                                    bg='white'
                                    zIndex={3}
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

                                {/* Menu onSearch - Desktop */}
                                <Box 
                                    id='menuServicesOnSearch'
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
                            
                            {/* LOCATION MENU */}
                            <Flex direction='column'
                                w={{base:'100%',lg:'40%'}}
                                h='100%'
                            >
                                {/* Onde - Localização */}
                                <Input 
                                    //display={{base:'none', lg:''}}
                                    placeholder='Onde ?'
                                    fontSize={19}
                                    bg='white'
                                    w='100%'
                                    h='100%'
                                    py={{base:'3',lg:'0'}}
                                    autoComplete='off'
                                    borderRadius={0}
                                    _focus={{outline:'none'}}
                                    value={searchData.location}
                                    onChange={(event: any) => {
                                        setSearchData({...searchData, location: event.currentTarget.value})
                                        searchFunction(event, "menuWhere");
                                    }}
                                    onClick={() => {
                                        setMenuWhere('');
                                        setSearchData({...searchData, location: '', city:'', state:'', country:''});
                                    }}
                                />


                                {/* LOCATION MENU */}
                                <Box 
                                    id='menuLocation'
                                    height={{base:'100vh',lg:230}}
                                    width={{base:'100vw',lg:350}}
                                    mt={{base:12,lg:20}}
                                    left={{base:0, lg:'auto'}}
                                    bottom={{base: 0, lg:'auto'}}
                                    borderTopRadius={{base:'30%'}}
                                    borderRadius={{base:0, lg:10}}
                                    overflowY="scroll"
                                    display={menuWhere}
                                    position={{base:'fixed',lg:'absolute'}}
                                    bg='brand.white'
                                    zIndex={5}
                                >
                                    <Flex
                                        direction='column'
                                    >
                                            
                                        {/* MOBILE */}
                                        <Flex
                                            display={{base:'flex', lg:'none'}} 
                                            justifyContent='center'
                                            direction='column'
                                            h='15%' w='100%'
                                        >
                                            {/* Close button */}
                                            <Flex 
                                                direction='row'
                                                justifyContent='space-between'
                                                alignItems='center'
                                                w='100%'
                                                px='4'
                                                h='50%'
                                                //minHeight={100}
                                            >
                                                <Flex alignItems='center'
                                                    h='100%'
                                                >
                                                    <Text
                                                        fontSize={20}
                                                        fontWeight={500}
                                                        h='auto'
                                                    >
                                                        Onde ?
                                                    </Text>
                                                </Flex>

                                                <Button 
                                                    h='100%'
                                                    bg='brand.white'
                                                    py='2' px='2'
                                                    //_hover={{bg:'none', textColor: 'brand.red'}}
                                                    //_focus={{outline:'none'}}
                                                    onClick={() => {
                                                        setMenuWhere('none');
                                                    }}
                                                >
                                                    <Icon as={RiCloseFill} fontSize={30} />
                                                </Button>
                                            </Flex>

                                            <Input placeholder='Onde procura ?'
                                                h='50%'
                                                fontSize={19}
                                                mb='3'
                                                mx='auto'
                                                id='inputWhere2'
                                                bg='white'
                                                w='90%'
                                                py={{base:'3',lg:'0'}}
                                                borderRightRadius={10}
                                                _focus={{outline:'none'}}
                                                autoComplete='off'
                                                value={searchData.location}
                                                
                                                onChange={(event: any) => {
                                                    console.log(event.currentTarget.value);
                                                    setSearchData({...searchData, location: event.currentTarget.value});
                                                    searchFunction(event, "menuWhere");
                                                }}
                                            />
                                        </Flex>
                                            
                                        

                                        <Flex direction="column" 
                                            id="menuWhere"
                                            h={{base:'85%',lg:'100%'}}
                                        >
                                            {
                                            Object.values(locationMap).map((el, i) => {
                                                return(
                                                    <Button
                                                        key={i}
                                                        py='6'
                                                        px='5'
                                                        bg='brand.white'
                                                        borderBottom='1px solid rgba(0,0,0,0.2)'
                                                        h={{base:'8%',lg:'25%'}}
                                                        //py='4'
                                                        borderRadius={0}
                                                        _focus={{outline:'none'}}
                                                        _hover={{bg:'rgba(0,0,0,0.1)'}}
                                                        //name='partyType'
                                                        //value={searchData.location}
                                                        onClick={(event) => {
                                                            setSearchData({...searchData, location: el.textToShow, city: el.city, state: el.state, country: el.country});
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
                                    </Flex>
                                </Box>

                            </Flex>

                            <Button
                                w={{base:'100%',lg:'20%'}}
                                h='100%'
                                py={{base:'3',lg:'0'}}
                                //py='7'
                                borderLeftRadius={{lg:0}}
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
                        //mx='auto'
                        w={{base:'100%', lg:'50%'}}
                        h={{base:'50%', lg:'100%'}}
                        bg='brand.white'
                        borderLeftRadius={{base:'0%', lg:'50%'}}
                        borderTopRadius={{base:'30%'}}
                        borderTopRightRadius={{base:'30%',lg:'0%'}}
                        //borderBottomLeftRadius={{base:'30%'}}

                    >
                        <Flex  mb={{base:'2', lg:'5'}} mx='auto'>
                            <Flex position='relative'
                                h={{base:150, lg:230}} 
                                w={{base:150, lg:230}} 
                                mr={{base:'2', lg:'5'}}
                                borderRadius={4}
                                borderTopLeftRadius='50%'
                                overflow='hidden'
                                
                            >
                                <Image
                                    src={CriancaAniversario}
                                    layout='fill'
                                    objectFit='cover'
                                /> 
                            </Flex>

                            <Flex position='relative'
                                h={{base:150, lg:230}} 
                                w={{base:150, lg:230}} 
                                borderRadius={4}
                                overflow='hidden'
                                borderTopRightRadius='50%'
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
                                h={{base:150, lg:230}} 
                                w={{base:150, lg:230}} 
                                mr={{base:'2', lg:'5'}}
                                borderRadius={4}
                                borderBottomLeftRadius='50%'
                                overflow='hidden'
                            >
                                <Image
                                    src={MulherAniversario}
                                    layout='fill'
                                    objectFit='cover'
                                /> 
                            </Flex>

                            <Flex position='relative'
                                h={{base:150, lg:230}} 
                                w={{base:150, lg:230}} 
                                borderRadius={4}
                                overflow='hidden'
                                borderBottomRightRadius='50%'
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
        
            </Flex>


            {/* Ache fornecedores */}
            <Flex
                w='100%'
                h='auto'
                bg='brand.white'
                direction='column'
                alignItems='center'
                justifyContent='center'
                mt='10'                
            >
                <Text
                    h="5vh"
                    fontSize={28}
                    fontWeight={600}
                    mb='10'
                >
                    Qual o tipo da sua festa ?
                </Text>

                {/* Type of party */}
                <Flex direction='row'
                    w='100%'
                    h={{base:'35vh', lg:'30vh'}}
                    alignItems='flex-end'
                    justifyContent={{base:'space-evenly',lg:'center'}}
                    mt='5'
                >  
                    {
                        Object.values(typeOfParties).map((el, index) => {
                            return (
                                <Button
                                    mr={{base:'0',lg:'5'}}
                                    p='0'
                                    w={{base:'30vw', lg:'15vw'}}
                                    h='100%'
                                    bg={cardSearchData.partyType == el.value ? 'brand.yellow' : 'brand.white'}
                                    value={el.value}
                                    boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                                    onClick={(event:any) => setCardSearchData({...cardSearchData, partyType: event.currentTarget.value})}
                                >
                                    <Flex direction='column' h='100%' w='100%'
                                        justifyContent='center' 
                                        alignItems='center'
                                        
                                    >
                                        <Flex position='relative'
                                            h='28vh' 
                                            w={{base:'30vw', lg:'15vw'}}
                                            borderRadius={4}
                                            overflow='hidden'
                                        >
                                            <Image
                                                src={el.value == 'Infantil' ? CriancaAniversario : el.value == 'Debutante' ? Debutante : IdosoAniversario}
                                                layout='fill'
                                                objectFit='cover'
                                            /> 
                                        </Flex>

                                        <Flex
                                            h='7vh'
                                            w={{base:'30vw', lg:'15vw'}}
                                            alignItems='center' 
                                            //flexWrap='wrap'                                            
                                        >
                                            <Text
                                                w='100%'
                                                whiteSpace='break-spaces'
                                                fontSize={{base: 16, lg:18}}
                                                fontWeight={500}
                                            >
                                                {el.textToShow}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </Button>
                            )
                        })
                    }   

                </Flex>
            
                {/* Services */}
                <Flex 
                    justifyContent='center'
                    alignItems='flex-start'
                    h={{base:'45vh', lg:'35vh'}}
                    w='100%'
                    mt='4'
                    pt='14'
                    bg='brand.yellow'
                    borderTopRadius='20%'
                >
                    <Flex
                        w={{base:'60%', lg:'60%'}}
                        h={{base:'20vh',lg:'15vh'}}
                        >
                        <AliceCarousel
                            autoPlay={false}
                            autoHeight={true}
                            responsive={{
                                0: {items:1.1},
                                1024: {items:5}
                            }}

                            mouseTracking
                            items={
                                typeOfServices[cardSearchData.partyType].services.map((el, index) => {
                                    return (
                                        <Button
                                            h={{base:'20vh',lg:'15vh'}}
                                            w='90%'
                                            my='1'
                                            mx='1'
                                            key={index}
                                            boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                                            bg='rgba(255,255,255,0.95)'
                                            _hover={{bg:'brand.yellow'}}
                                            onClick={() => {
                                                routerSearch.push({
                                                    pathname: '/services',
                                                    query: { 
                                                        partyType: cardSearchData.partyType,
                                                        serviceCategory: el.parent,
                                                        serviceSpecificCategory: el.value,
                                                    }
                                                });
                                            }}
                                        >
                                            <Flex w='100%'
                                                h='100%'
                                                direction='column'
                                                alignItems='center'
                                                justifyContent='space-evenly'
                                                py='4'
                                            >
                                                <Icon as={el.icon} color='brand.dark_blue' 
                                                    fontSize={42}
                                                />
                                                <Text
                                                    w='90%'
                                                   whiteSpace='break-spaces' 
                                                >
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
            

            </Flex>


            {/* Empresas destacadas 
            <Flex
                w='100%'
                h='30vh'
                bg='brand.white'
            >

            </Flex>
            */}

            <Footer/>
        </Box>
    )
}
