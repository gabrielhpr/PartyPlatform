import { Box, Button, Flex, Icon, Input, Menu, MenuButton, MenuDivider, MenuItemOption, MenuList, MenuOptionGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import Image from 'next/image'
import { useEffect, useState } from "react";
import FotoDebutante from '../assets/imgs/festaDebutante.jpg';
import { CardService } from "../components/CardService";
import api from "../utils/api";
import { useRouter } from "next/router";
import { Header } from "../components/Header";
import { RiArrowGoBackFill, RiCloseFill, RiFilter2Fill } from "react-icons/ri";
import { Footer } from "../components/Footer";
import { enterpriseSpecificCategoryDict, locationMap, minPrice, priceOptionsPerService, typeOfParties, typeOfServices } from "../utils/typeOfParties";
import { Sidebar } from "../components/Sidebar";
import { MenuServicesOnClick } from "../components/MenuServicesOnClick";
import { FiSearch } from "react-icons/fi";
import KidBirthday from '../assets/imgs/kid-birthday.jpg';

export default function ServicesPage() {
    const [services, setServices] = useState([]);
    const [filters, setFilters] = useState({price:{value:'', textToShow:''}, buffetIncluded: false, nOfPeople: ''});
    const routerNext = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [searchData, setSearchData] = useState({ partyType: '', serviceCategory: '', serviceSpecificCategory: '', location: '', city: '', state: '', country: ''});
    const [menuPartyTypeDisp, setMenuPartyTypeDisp] = useState('none');
    const [menuService, setMenuService] = useState('none');
    const [searchInputValueFirst, setSearchInputValueFirst] = useState('');
    const [menuWhere, setMenuWhere] = useState('none');
    const isMobileVersion = useBreakpointValue({
        base: true,
        lg: false,
    });
    
    function handleClick( el: any ) {
        console.log( el );
        const id = el.id;
        const partyType = el.partyMainFocus;

        localStorage.setItem("previousRoute", routerNext.asPath);
    
        routerNext.push({
            pathname: '/serviceProfile',
            query: { 
                id: id,
                partyType: partyType
            }
        });
    }
    
    function handleSearch() {

        routerNext.push({
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
    
    useEffect(() => {
        if( !routerNext.isReady ) {
            return;
        }
        const { partyType, serviceCategory, serviceSpecificCategory, city, state, country, price } = routerNext.query;

        api.get('/services', {
                params: {
                    partyType: partyType,
                    serviceCategory: serviceCategory,
                    serviceSpecificCategory: serviceSpecificCategory,
                    city: city,
                    state: state,
                    country: country,
                    price: price
                }
        })
        .then((response) => {
            setServices(response.data.services);
            console.log(services[0]);
        })
        .catch((err) => {
            console.log(err);
        }) 

    }, [routerNext.query]);

    return (
        <Box h='100vh'>
            <Header name="" position="relative" type='oneColor' />

            <Sidebar/>

            {/* Carroussel and Menu */}
            <Flex 
                height='25vh'
                w='100vw'
                fontSize={32}
                justifyContent='center'
                bg='gray.white'
                borderBottom='1px solid rgba(0,0,0,0.3)'
            >
                <Flex 
                    width='100%' 
                    height='25vh'
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
                        <Text
                            w='90%'
                            mx='auto'
                            mb='3'
                            fontSize={{base:20, lg:26}}
                        >
                            {routerNext.query?.partyType} / {routerNext.query?.serviceCategory == 'Espaco' ? 'Espaço' : ''} {enterpriseSpecificCategoryDict[routerNext.query?.serviceSpecificCategory]}
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
                                    borderRightRadius={{lg:0}}
                                    borderBottomRightRadius={{base:0, lg:0}}
                                    borderBottomLeftRadius={{base:0, lg:8}}
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
                                        searchData.partyType + ' / ' + (searchData.serviceCategory == 'Espaco' ? 'Espaço':'Serviço') + ' / ' + enterpriseSpecificCategoryDict[searchData.serviceSpecificCategory]
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
                                                fontSize={20}
                                                fontWeight={500}
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
                                                    py='1'
                                                    borderRadius={0}
                                                    _focus={{outline:'none'}}
                                                    _hover={{bg:'rgba(0,0,0,0.1)'}}
                                                    name='partyType'
                                                    value={el.value}
                                                    borderBottom='0.5px solid rgba(0,0,0,0.4)'
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
                                                        py='7'
                                                        bg='brand.white'
                                                        borderBottom='1px solid rgba(0,0,0,0.2)'
                                                        borderRadius={0}
                                                        name='service'
                                                        value={el.parent+'-'+el.value}
                                                        leftIcon={<Icon as={el.icon} fontSize={18} mr='2' />}
                                                        onClick={(event) => {
                                                            setSearchData({...searchData, serviceCategory: el.parent, serviceSpecificCategory: el.value});
                                                            setMenuService('none');
                                                        }}
                                                        
                                                    >
                                                        <Text
                                                            textAlign='left'
                                                            w='80%'
                                                            fontSize={18}
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
                                borderTopLeftRadius={{base:0, lg:0}}
                                borderTopRightRadius={{base:0, lg:8}}
                                bg='brand.red'
                                color='white'
                                fontSize={18}
                                fontWeight={900}
                                _focus={{outline:'none'}}
                                onClick={handleSearch}
                                leftIcon={<Icon as={FiSearch} fontSize={20} fontWeight={900} />}
                            >
                                Pesquisar
                            </Button>
                        </Flex>

                        

                    </Flex>

                    {/* Square of pictures */}
                    <Flex 
                        display={{base:'none', lg:'flex'}}
                        direction='column' 
                        justifyContent='center'
                        alignItems='center'
                        //mx='auto'
                        w='50%'
                        h='98%'
                        bg='brand.white'
                        //borderLeftRadius=
                        //borderTopRadius={{base:'30%'}}
                        //borderTopRightRadius={{base:'30%',lg:'0%'}}
                        //borderBottomLeftRadius={{base:'30%'}}

                    >
                        <Flex position='relative'
                            h='100%'
                            w='100%'
                            mr='5'
                            //borderRadius={4}
                            borderLeftRadius={80}
                            overflow='hidden'
                            
                        >
                            <Image
                                src={KidBirthday}
                                layout='fill'
                                objectFit='cover'
                            /> 
                        </Flex>
                    </Flex>      
                </Flex>
            </Flex>

            <Box w='100%' h='auto' minHeight='70vh'
            >
                {/* Contain all cards */}
                <Flex w='100%' h='100%' bg='white' mx='auto' >

                    <Flex w='100%' flexWrap='wrap'
                        justifyContent='center'
                    >

                        {/* Visualization options */}
                        <Flex w='100%' justifyContent='center'
                            bg='white'
                            py='5'
                            position='sticky'
                            top={0}
                            zIndex={1}
                        >
                            <Flex w='90%' 
                                justifyContent='space-between'
                                alignItems='center'
                            >
                                <Text
                                    fontWeight={600}
                                    fontSize={19}
                                    color='gray'
                                >
                                    {services.length} RESULTADOS
                                </Text>


                                {/* DESKTOP - FILTERS*/}    
                                <Stack spacing={5} direction='row'
                                    display={{base:'none', lg:'flex'}}
                                >
                                    {/* Price filter */}
                                    <Flex>
                                        <Menu>
                                            <MenuButton as={Button} bg='brand.blue'
                                                textColor='brand.white'
                                                width={250}
                                            >
                                                {
                                                filters.price.value == ''
                                                ?   
                                                'Preço mínimo'
                                                :
                                                'Preço: '+filters.price.textToShow
                                                }
                                            </MenuButton>
                                            <MenuList minWidth='240px'>
                                                <MenuOptionGroup type='radio' value={filters.price.value}
                                                >
                                                    {
                                                        routerNext.query.serviceCategory == 'Servico'
                                                        ?
                                                        priceOptionsPerService.Servico[routerNext?.query?.serviceSpecificCategory].map((el,index) => {
                                                            return (
                                                                <MenuItemOption value={el.value}
                                                                    onClick={(event: any) => {
                                                                        setFilters({...filters, price: {...filters.price, value: el.value, textToShow: el.textToShow}});

                                                                        routerNext.push({
                                                                            pathname: '/services',
                                                                            query: { 
                                                                                partyType: routerNext.query.partyType,
                                                                                serviceCategory: routerNext.query.serviceCategory,
                                                                                serviceSpecificCategory: routerNext.query.serviceSpecificCategory,
                                                                                city: routerNext.query.city,
                                                                                state: routerNext.query.state,
                                                                                country: routerNext.query.country,
                                                                                price: el.value,
                                                                                nOfPeople: routerNext.query.nOfPeople
                                                                            }
                                                                        });
                                                                        console.log(filters);
                                                                    }}
                                                                >
                                                                    {el.textToShow}
                                                                </MenuItemOption>
                                                            )
                                                        })
                                                        :
                                                        
                                                        priceOptionsPerService.Espaco[filters.buffetIncluded == false ? 'SoEspaco' : 'EspacoEBuffet'].map((el,index) => {
                                                            if( index == 0 ) {
                                                                return (
                                                                    <Flex>
                                                                        <Button
                                                                            bg={filters.buffetIncluded == false ? 'brand.blue' : 'brand.white'}
                                                                            textColor={filters.buffetIncluded == false ? 'brand.white' : 'brand.dark_blue'}
                                                                            
                                                                            onClick={() => {
                                                                                setFilters({...filters, price: {value: '', textToShow: ''}, buffetIncluded: false})
                                                                                console.log(filters);
                                                                                
                                                                            }}
                                                                        >
                                                                            Só espaço
                                                                        </Button>

                                                                        <Button
                                                                            bg={filters.buffetIncluded == true ? 'brand.blue' : 'brand.white'}
                                                                            textColor={filters.buffetIncluded == true ? 'brand.white' : 'brand.dark_blue'}
                                                                            onClick={() => { 
                                                                                setFilters({...filters, price: {value: '', textToShow: ''}, buffetIncluded: true});
                                                                                console.log(filters);
                                                                                
                                                                            }}
                                                                        >
                                                                            Espaço com buffet
                                                                        </Button>

                                                                    </Flex>

                                                                )
                                                            }
                                                            return (
                                                                <MenuItemOption value={el.value}
                                                                    onClick={(event: any) => {
                                                                        setFilters({...filters, price: {...filters.price, value: el.value, textToShow: el.textToShow}});

                                                                        routerNext.push({
                                                                            pathname: '/services',
                                                                            query: { 
                                                                                partyType: routerNext.query.partyType,
                                                                                serviceCategory: routerNext.query.serviceCategory,
                                                                                serviceSpecificCategory: routerNext.query.serviceSpecificCategory,
                                                                                city: routerNext.query.city,
                                                                                state: routerNext.query.state,
                                                                                country: routerNext.query.country,
                                                                                price: el.value,
                                                                                buffetIncluded: filters.buffetIncluded,
                                                                                nOfPeople: routerNext.query.nOfPeople
                                                                            }
                                                                        });
                                                                        console.log(filters);
                                                                    }}
                                                                >
                                                                    {el.textToShow}
                                                                </MenuItemOption>
                                                            )
                                                        })
                                                    }
                                                </MenuOptionGroup>
                                            </MenuList>
                                        </Menu>
                                    </Flex>

                                    {/* Number of people */}
                                    {
                                        (
                                            (
                                            routerNext.query.serviceCategory == 'Servico' 
                                            && ( ['Buffet', 'Bolos', 'Decoracao'].includes(routerNext.query.serviceSpecificCategory) )
                                            )
                                            ||
                                            routerNext.query.serviceCategory == 'Espaco' 
                                        )
                                        ?
                                        <Flex>
                                            <Menu>
                                                <MenuButton as={Button} bg='brand.blue'
                                                    textColor='brand.white'
                                                    width={250}
                                                >
                                                    {
                                                    filters.nOfPeople == ''
                                                    ?   
                                                    'Número de convidados'
                                                    :
                                                    'Convidados: ' + filters.nOfPeople
                                                    }
                                                </MenuButton>
                                                <MenuList minWidth='240px'>
                                                    <MenuOptionGroup type='radio' value={filters.price.value}
                                                    >
                                                        {
                                                        [
                                                            {value: '0-49', textToShow: '0 - 49'},
                                                            {value: '50-99', textToShow: '50 - 99'},
                                                            {value: '100-199', textToShow: '100 - 199'},
                                                            {value: '200-299', textToShow: '200 - 299'},
                                                            {value: '300-399', textToShow: '300 - 399'},
                                                            {value: '400-10000', textToShow: '+400'},

                                                        ].map((el, index) => {
                                                            
                                                            return(
                                                                <MenuItemOption
                                                                    value={el.value}
                                                                    onClick={() => {
                                                                        setFilters({...filters, nOfPeople: el.value});
                                                                        routerNext.push({
                                                                            pathname: '/services',
                                                                            query: { 
                                                                                partyType: routerNext.query.partyType,
                                                                                serviceCategory: routerNext.query.serviceCategory,
                                                                                serviceSpecificCategory: routerNext.query.serviceSpecificCategory,
                                                                                city: routerNext.query.city,
                                                                                state: routerNext.query.state,
                                                                                country: routerNext.query.country,
                                                                                price: routerNext.query.price,
                                                                                buffetIncluded: routerNext.query.buffetIncluded,
                                                                                nOfPeople: el.value
                                                                            }
                                                                        });
                                                                        console.log(filters);
                                                                    }}
                                                    
                                                                >
                                                                    {el.textToShow}
                                                                </MenuItemOption>
                                                            )
                                                        })
                                                        }
                                                    </MenuOptionGroup>
                                                </MenuList>
                                            </Menu>
                                        </Flex>
                                        :
                                        <>
                                        </>
                                    }
                                    
                                    {/* 
                                    <Button
                                        leftIcon={<Icon as={RiFilter2Fill}/>}
                                        borderRadius={11}
                                        fontSize={18}
                                        fontWeight={500}
                                        variant='outline'
                                        py='3'
                                    >
                                        Filtros
                                    </Button>
                                    */}
                                </Stack>
                                    

                                {/* MOBILE - FILTERS */}
                                <Stack spacing={5} direction='row'
                                    display={{base:'flex', lg:'none'}}
                                >
                                    <Button
                                        leftIcon={<Icon as={RiFilter2Fill}/>}
                                        borderRadius={11}
                                        fontSize={18}
                                        fontWeight={500}
                                        variant='outline'
                                        py='3'
                                        onClick={onOpen}
                                    >
                                        Filtros
                                    </Button>
                                    <Modal closeOnOverlayClick={true} size='4xl' isOpen={isOpen} onClose={onClose}>
                                        <ModalOverlay />
                                        <ModalContent>
                                            <ModalHeader>Filtros</ModalHeader>
                                            <ModalCloseButton />
                                            <ModalBody pb={6}>

                                                {/* Price filter */}
                                                <Flex justifyContent='center'
                                                >
                                                    <Menu
                                                    >
                                                        <MenuButton as={Button} bg='brand.blue'
                                                            textColor='brand.white'
                                                            width='60vw'
                                                        >
                                                            {
                                                            filters.price.value == ''
                                                            ?   
                                                            'Preço mínimo'
                                                            :
                                                            'Preço: '+filters.price.textToShow
                                                            }
                                                        </MenuButton>
                                                        <MenuList minWidth='100vw' minHeight='auto'
                                                            overflowY='scroll'
                                                        >
                                                            <MenuOptionGroup type='radio' value={filters.price.value}
                                                            >
                                                                {
                                                                    routerNext.query.serviceCategory == 'Servico'
                                                                    ?
                                                                    priceOptionsPerService.Servico[routerNext?.query?.serviceSpecificCategory].map((el,index) => {
                                                                        return (
                                                                            <MenuItemOption value={el.value}
                                                                                h='8vh'
                                                                                onClick={(event: any) => {
                                                                                    setFilters({...filters, price: {...filters.price, value: el.value, textToShow: el.textToShow}});

                                                                                    routerNext.push({
                                                                                        pathname: '/services',
                                                                                        query: { 
                                                                                            partyType: routerNext.query.partyType,
                                                                                            serviceCategory: routerNext.query.serviceCategory,
                                                                                            serviceSpecificCategory: routerNext.query.serviceSpecificCategory,
                                                                                            city: routerNext.query.city,
                                                                                            state: routerNext.query.state,
                                                                                            country: routerNext.query.country,
                                                                                            price: el.value,
                                                                                            nOfPeople: routerNext.query.nOfPeople
                                                                                        }
                                                                                    });
                                                                                    console.log(filters);
                                                                                }}
                                                                            >
                                                                                {el.textToShow}
                                                                            </MenuItemOption>
                                                                        )
                                                                    })
                                                                    :
                                                                    
                                                                    priceOptionsPerService.Espaco[filters.buffetIncluded == false ? 'SoEspaco' : 'EspacoEBuffet'].map((el,index) => {
                                                                        if( index == 0 ) {
                                                                            return (
                                                                                <Flex
                                                                                    justifyContent='space-evenly'
                                                                                >
                                                                                    <Button
                                                                                        w='48%'
                                                                                        bg={filters.buffetIncluded == false ? 'brand.blue' : 'brand.white'}
                                                                                        textColor={filters.buffetIncluded == false ? 'brand.white' : 'brand.dark_blue'}
                                                                                        
                                                                                        onClick={() => {
                                                                                            setFilters({...filters, price: {value: '', textToShow: ''}, buffetIncluded: false})
                                                                                            console.log(filters);
                                                                                            
                                                                                        }}
                                                                                    >
                                                                                        Só espaço
                                                                                    </Button>

                                                                                    <Button
                                                                                        w='48%'
                                                                                        bg={filters.buffetIncluded == true ? 'brand.blue' : 'brand.white'}
                                                                                        textColor={filters.buffetIncluded == true ? 'brand.white' : 'brand.dark_blue'}
                                                                                        onClick={() => { 
                                                                                            setFilters({...filters, price: {value: '', textToShow: ''}, buffetIncluded: true});
                                                                                            console.log(filters);
                                                                                            
                                                                                        }}
                                                                                    >
                                                                                        Espaço com buffet
                                                                                    </Button>

                                                                                </Flex>
                                                                            )
                                                                        }
                                                                        return (
                                                                            <MenuItemOption 
                                                                                h='8vh'
                                                                                value={el.value}
                                                                                onClick={(event: any) => {
                                                                                    setFilters({...filters, price: {...filters.price, value: el.value, textToShow: el.textToShow}});

                                                                                    routerNext.push({
                                                                                        pathname: '/services',
                                                                                        query: { 
                                                                                            partyType: routerNext.query.partyType,
                                                                                            serviceCategory: routerNext.query.serviceCategory,
                                                                                            serviceSpecificCategory: routerNext.query.serviceSpecificCategory,
                                                                                            city: routerNext.query.city,
                                                                                            state: routerNext.query.state,
                                                                                            country: routerNext.query.country,
                                                                                            price: el.value,
                                                                                            buffetIncluded: filters.buffetIncluded,
                                                                                            nOfPeople: routerNext.query.nOfPeople
                                                                                        }
                                                                                    });
                                                                                    console.log(filters);
                                                                                }}
                                                                            >
                                                                                {el.textToShow}
                                                                            </MenuItemOption>
                                                                        )
                                                                    })
                                                                }
                                                            </MenuOptionGroup>
                                                        </MenuList>
                                                    </Menu>
                                                </Flex>

                                                {/* Number of people */}
                                                {
                                                    (
                                                        (
                                                        routerNext.query.serviceCategory == 'Servico' 
                                                        && ( ['Buffet', 'Bolos', 'Decoracao'].includes(routerNext.query.serviceSpecificCategory) )
                                                        )
                                                        ||
                                                        routerNext.query.serviceCategory == 'Espaco' 
                                                    )
                                                    &&
                                                    <Flex justifyContent='center' mt='10'>
                                                        <Menu>
                                                            <MenuButton as={Button} bg='brand.blue'
                                                                textColor='brand.white'
                                                                width='60vw'
                                                            >
                                                                {
                                                                filters.nOfPeople == ''
                                                                ?   
                                                                'Número de convidados'
                                                                :
                                                                'Convidados: ' + filters.nOfPeople
                                                                }
                                                            </MenuButton>
                                                            <MenuList minWidth='100vw' minHeight='auto'
                                                                overflowY='scroll'
                                                            >
                                                                <MenuOptionGroup type='radio' value={filters.price.value}
                                                                >
                                                                    {
                                                                    [
                                                                        {value: '0-49', textToShow: '0 - 49'},
                                                                        {value: '50-99', textToShow: '50 - 99'},
                                                                        {value: '100-199', textToShow: '100 - 199'},
                                                                        {value: '200-299', textToShow: '200 - 299'},
                                                                        {value: '300-399', textToShow: '300 - 399'},
                                                                        {value: '400-10000', textToShow: '+400'},

                                                                    ].map((el, index) => {
                                                                        
                                                                        return(
                                                                            <MenuItemOption
                                                                                h='8vh'
                                                                                value={el.value}
                                                                                onClick={() => {
                                                                                    setFilters({...filters, nOfPeople: el.value});
                                                                                    routerNext.push({
                                                                                        pathname: '/services',
                                                                                        query: { 
                                                                                            partyType: routerNext.query.partyType,
                                                                                            serviceCategory: routerNext.query.serviceCategory,
                                                                                            serviceSpecificCategory: routerNext.query.serviceSpecificCategory,
                                                                                            city: routerNext.query.city,
                                                                                            state: routerNext.query.state,
                                                                                            country: routerNext.query.country,
                                                                                            price: routerNext.query.price,
                                                                                            buffetIncluded: routerNext.query.buffetIncluded,
                                                                                            nOfPeople: el.value
                                                                                        }
                                                                                    });
                                                                                    console.log(filters);
                                                                                }}
                                                                
                                                                            >
                                                                                {el.textToShow}
                                                                            </MenuItemOption>
                                                                        )
                                                                    })
                                                                    }
                                                                </MenuOptionGroup>
                                                            </MenuList>
                                                        </Menu>
                                                    </Flex>
                                                }
                                    
                                            </ModalBody>

                                            <ModalFooter
                                                justifyContent='space-between'
                                            >
                                                <Button onClick={onClose}
                                                    w='30%'
                                                >
                                                    Cancelar
                                                </Button>
                                                <Button colorScheme='blue' mr={3} onClick={onClose}
                                                    w='50%'
                                                >
                                                    Salvar
                                                </Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                </Stack>

                            </Flex>
                        </Flex>
                        
                        {
                        services.length > 0
                        ?
                        /* LIST OF CARDS */
                        <Flex w='90%' bg='white'
                            h='auto'
                            mx='auto'
                            py='5' flexWrap='wrap'
                            justifyContent={{base:'center',lg:'space-between'}}
                            rowGap={8}
                        >
                            {
                            services.map((el:any, i:any) => {
                                    return (
                                        <CardService 
                                            key={i}
                                            name={el.enterpriseName}
                                            location={el.location}
                                            classification={el.ratingQuantity != 0 ? `${(el.ratingSum / el.ratingQuantity).toFixed(1)} (${el.ratingQuantity})` : '0'}
                                            rangeOfPeople='10-100'
                                            price={'R$ ' + minPrice(el)}
                                            photos={el.photos.split(",").slice(0,5)}
                                            handleOnClick={() => handleClick(el)} 
                                        />
                                    );
                                })
                            }

                        </Flex>
                        :
                        <Flex
                            pt='10'
                            pb='20'
                            px='10'
                            justifyContent='center'
                        >
                            <Text
                                fontSize={20}
                                fontWeight={400}
                                textAlign='center'
                            >
                                Não encontramos nenhum resultado para 
                                a sua pesquisa
                            </Text>
                        </Flex>    
                        }
                    </Flex>

                </Flex>
            </Box>
            
            <Footer/>
        </Box>
    );
}