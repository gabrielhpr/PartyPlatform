import { Flex, Grid, GridItem, Text, Icon, Divider, Box, Button, Input, FormControl, FormErrorMessage, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiArrowRightFill, RiArrowRightSLine, RiCloseFill } from "react-icons/ri";
import { locationMap } from "../../../../utils/typeOfParties";
import { ItemList } from "../../ItemList";
import { TitleEdit } from "./Title";

interface ItemEditProps {
    isTitleItem?: boolean;
    title: string;
    name: string[];
    itemValue?: string[] | number[];
    about?: string;
    inputType: string;
    inputTypeSpecific?: string;
    placeholder?: string;
    options?: any;
    span?: string;
    formErrors: Object;
    setData: Function;
    saveDataChanged: Function;    
}

export function ItemEdit({isTitleItem=false, title, name, itemValue, about, inputType, inputTypeSpecific, placeholder, options, span, setData, saveDataChanged, formErrors, ...rest}: ItemEditProps) {
    const [isEdit, setIsEdit] = useState(false);
    const [inputData, setInputData] = useState({});
    const [menuWhere, setMenuWhere] = useState('none');

    ////console.log('Values received by props');
    ////console.log(`name: ${name}, itemValue: ${itemValue}, inputType: ${inputType}, options: ${options}`);
    
    useEffect(() => {
        //console.log('deu useEffect');
        //console.log( formErrors );
        if( name.length == 1 ) {
            ////console.log('nome length == 1');
            setInputData({ ...inputData, [name[0]]: itemValue[0] });    
        }
        else if( name.length == 2 ) {
            ////console.log('nome length == 2');
            setInputData({ ...inputData, [name[0]]: itemValue[0], [name[1]]: itemValue[1] });    
        }
    }, [isEdit]);

    //   Close dropdown menu on click outside
    useEffect(() => {
        document.addEventListener('mouseup', function (e) {
            var menu1 = document.getElementById('menuLocation');

            if (!menu1?.contains(e.currentTarget)) {
                setMenuWhere('none');
            }
        }.bind(this));
    },[]);

    // This is used when a Space changes its option of buffet, it open
    // all the inputs that have to be filled 
    useEffect(() => {
        if( formErrors[name[0]] != '' ) {
            setIsEdit(true);
        }
    }, [formErrors]);

    function handleInput( event: any ) {
        setInputData({...inputData, [event.currentTarget.name]: event.currentTarget.value});
    }

    // Used in Menu search
    function searchFunction( event: any, menuId: string ) {
        //console.log( event.currentTarget.value );
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

    /* Not in Edit Mode */
    if(!isEdit) {
        return(
            <Box {...rest}>
                <Flex 
                    my="0" justifyContent="space-between"
                >
                        {isTitleItem 
                            ?
                            <TitleEdit title={title} id={title}/>
                            :
                            <Text as="h2"
                                fontWeight={500}
                                fontSize={18}
                            >
                                {title}
                            </Text>                       
                        }
                        
                        <Flex alignItems="center">
                            <Text as="p"
                                onClick={() => {setIsEdit(true)}}
                            >
                                Editar
                            </Text>
                            <Icon as={RiArrowRightSLine}
                                fontSize={25}
                            />
                        </Flex>
                </Flex>
                { 
                    itemValue
                    &&
                    <Flex>
                        <Text color="gray"
                            fontWeight={400}
                            fontSize={16}
                            whiteSpace='nowrap'
                            overflow='hidden'
                            textOverflow='clip'
                        >
                            {span == 'R$ ' ? span : ''} 

                            {itemValue.join('. ')} 
                        
                            {span != 'R$ ' ? span : ''}
                        </Text>
                    </Flex>
                }
            </Box>
        )
    }
    /* Edit Mode */
    else {
        return (
            <Box 
                boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
                borderRadius={8} 
                bg="brand.white"
                p="5"
                {...rest}
            >
                <Box mb="3">
                    <Flex justifyContent="space-between"
                        mb="1"
                    >
                        <Text as="h2"
                                fontWeight={500}
                                fontSize={18}
                        >
                            {title}
                        </Text>
                        <Icon as={RiCloseFill} 
                            onClick={() => {
                                if( name.length == 1 ) {
                                    //console.log('nome length == 1');
                                    setData((prevData) => ({...prevData, [name[0]]: inputData[name[0]]}));
                                }
                                else if( name.length == 2) {
                                    //console.log('nome length == 2');
                                    setData((prevData) => ({...prevData, [name[0]]: inputData[name[0]], [name[1]]: inputData[name[1]]}));
                                }
                                setIsEdit(false);
                            }}
                            color="gray.500"
                            fontSize={23}
                            _hover={{bg:"gray.100"}}
                            borderRadius="50%"
                        />
                    </Flex>
                    <Text 
                        color="gray"
                        fontWeight={400}
                        fontSize={16}
                    >
                        {about}
                    </Text>
                </Box>
               
                {/* RADIO */}
                {
                    inputType == 'radio'
                    &&
                    <Flex direction='column'>
                        <FormControl isInvalid={formErrors[name[0]] != '' ? true : false}>
                            <Flex
                                justifyContent='space-evenly'
                                mb='4'
                            >
                                {
                                    options.map((element, index) => {
                                        return (
                                            <ItemList
                                                styleType={2}
                                                width='40%'
                                                name={name[0]}
                                                textAlign='center'
                                                value={element}
                                                textToShow={element}
                                                selectedName={itemValue[0]}
                                                handleOnClick={ (event:any) => {
                                                        setData((prevData) => ({...prevData, [event.currentTarget.name]: event.currentTarget.value }));
                                                    }
                                                }
                                            />
                                        )
                                    })
                                }
                            </Flex>
                            <FormErrorMessage>
                                {formErrors[name[0]]}
                            </FormErrorMessage>
                        </FormControl>
    
                        <FormControl isInvalid={formErrors[name[1]] != '' ? true : false}>
                            <Textarea 
                                name={name[1]} 
                                value={itemValue[1]}
                                onChange={(event:any) => {
                                    setData((prevData) => ({...prevData, [event.currentTarget.name]: event.currentTarget.value }));
                                }}
                            />
                            <FormErrorMessage>
                                {formErrors[name[1]]}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                }

                {/* TEXTAREA */}
                {
                    inputType == 'textarea'  
                    &&
                    <Flex direction='column'>
                        <FormControl isInvalid={formErrors[name[0]] != '' ? true : false}>
                            <Textarea 
                                name={name[0]} 
                                placeholder={placeholder}
                                value={itemValue[0]}
                                onChange={(event:any) => {
                                    setData((prevData) => ({...prevData, [event.currentTarget.name]: event.currentTarget.value }));
                                }}
                            />
                            <FormErrorMessage>
                                {formErrors[name[0]]}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                }       

                {/* INPUT */}
                {
                    inputType == 'input'  
                    &&
                    <Flex direction='row'
                        alignItems='center'
                    >                                     
                        <FormControl isInvalid={formErrors[name[0]] != '' ? true : false}>
                            {
                                span
                                &&
                                <Text as='span' mr='2'>
                                    {span}
                                </Text>
                            }
                            <Input 
                                name={name[0]} 
                                type={inputTypeSpecific}
                                width='100%'
                                value={itemValue[0]}
                                onChange={(event:any) => {
                                    setData((prevData) => ({...prevData, [event.currentTarget.name]: event.currentTarget.value }));
                                }}
                            />
                            <FormErrorMessage>
                                {formErrors[name[0]]}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                }      

                {/* LOCATION */} 
                {
                    inputType == 'location'
                    &&
                    <Flex direction='column'
                    >
                        <FormControl isInvalid={formErrors[name[0]] != '' ? true : false}>
                            
                            {/* Onde - Localização */}
                            <Input 
                                _focus={{outline:'none'}}
                                value={itemValue[0]}
                                onChange={(event:any) => {
                                    setData((prevData) => ({...prevData, location: event.currentTarget.value }));
                                    searchFunction(event, "menuWhere");
                                }}
                                onClick={() => {
                                    setMenuWhere('onclick');
                                    setData((prevData) => ({...prevData, location: ''}));
                                }}
                            />
                            <Flex 
                                id='menuLocation'
                                height={230} 
                                width={{base:'100%', lg:350}}
                                display={menuWhere}
                                position='absolute'
                                overflowY="scroll"
                                bg='brand.white'
                                mt={{base:2, lg:2}}
                                borderRadius={10}
                                zIndex={3}
                                boxShadow="0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"
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
                                                py='4'
                                                px='5'
                                                borderRadius={0}
                                                _focus={{outline:'none'}}
                                                _hover={{bg:'rgba(0,0,0,0.1)'}}
                                                //name='partyType'
                                                //value={el.value}
                                                onClick={(event) => {
                                                    setData((prevData) => ({...prevData, location: el.textToShow, city: el.city, state: el.state, country: el.country}));
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
                            <FormErrorMessage>
                                {formErrors[name[0]]}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>   
                }

                {/* PASSWORD */}
                {
                    inputType == 'password'
                    &&
                    <Flex direction='column'
                        justifyContent='center'
                        alignItems='center'
                    >                                     
                        <FormControl isInvalid={formErrors[name[0]] != '' ? true : false}>
                            <Text as='span'>
                                Nova Senha
                            </Text>
                            <Input 
                                name={name[0]} 
                                type='password'
                                width='100%'
                                value={itemValue[0]}
                                onChange={(event:any) => {
                                    setData((prevData) => ({...prevData, [event.currentTarget.name]: event.currentTarget.value }));
                                }}
                            />
                            <FormErrorMessage>
                                {formErrors[name[0]]}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={formErrors[name[1]] != '' ? true : false}
                            mt='5'
                        >
                            <Text as='span'>
                                Confirmação da senha
                            </Text>
                            <Input 
                                name={name[1]} 
                                type='password'
                                width='100%'
                                value={itemValue[1]}
                                onChange={(event:any) => {
                                    setData((prevData) => ({...prevData, [event.currentTarget.name]: event.currentTarget.value }));
                                }}
                            />
                            <FormErrorMessage>
                                {formErrors[name[1]]}
                            </FormErrorMessage>
                        </FormControl>
                    </Flex>
                }

                <Divider my="6" borderColor="gray.400" />
    
                {/* Cancelar e Salvar */}
                <Flex justifyContent="space-between"
                    alignItems="center"
                >
                    <Text as="h3"
                        onClick={() => {
                            if( name.length == 1 ) {
                                //console.log('nome length == 1');
                                setData((prevData) => ({...prevData, [name[0]]: inputData[name[0]]}));
                            }
                            else {
                                //console.log('nome length == 2');
                                setData((prevData) => ({...prevData, [name[0]]: inputData[name[0]], [name[1]]: inputData[name[1]]}));
                            }
                            setIsEdit(false);
                        }}
                    >
                        Cancelar
                    </Text>
                  
                    <Button color="brand.white"
                        bg="black"
                        _hover={{bg:"gray.600"}}
                        onClick={
                            async () => {
                                await saveDataChanged( inputData )
                                .then((isValid) => {
                                    //console.log('isvalid - item button');
                                    //console.log( isValid );
                                    if( isValid ) {
                                        setIsEdit(false);
                                    }
                                });
                            }
                        }
                    >
                        Salvar
                    </Button>
                </Flex>    
            </Box>
        )
    }
}