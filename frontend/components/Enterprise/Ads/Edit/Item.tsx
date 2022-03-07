import { Flex, Grid, GridItem, Text, Icon, Divider, Box, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { RiArrowRightFill, RiArrowRightSLine, RiCloseFill } from "react-icons/ri";
import { TitleEdit } from "./Title";

interface ItemEditProps {
    isTitleItem?: boolean;
    title: string;
    name: string;
    itemValue?: string;
    about?: string;
    saveDataChanged: Function;    
}

export function ItemEdit({isTitleItem=false, title, name, itemValue, about, saveDataChanged, ...rest}: ItemEditProps) {
    const [isEdit, setIsEdit] = useState(false);
    const [inputData, setInputData] = useState({name: '', value: ''});
        
    function handleInput( event: any ) {
        setInputData({name: event.currentTarget.name, value: event.currentTarget.value});
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
                            <TitleEdit title={title}/>
                            :
                            
                            <Text as="h2"
                                fontWeight={400}
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
                { itemValue 
                    ?
                    <Flex>
                        <Text color="gray"
                            fontWeight={400}
                            fontSize={16}
                            whiteSpace='nowrap'
                            overflow='hidden'
                            textOverflow='clip'
                        >
                            {itemValue}
                        </Text>
                    </Flex>
                    :
                    <>
                    </> 
                }
            </Box>
        )
    }
    
    /* Edit Mode */
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
                        onClick={() => setIsEdit(false)}
                        color="gray.500"
                        fontSize={23}
                        _hover={{bg:"gray.100"}}
                        borderRadius="50%"
                    />
                </Flex>
                <Text color="gray"
                            fontWeight={400}
                            fontSize={16}
                >
                    {about}
                </Text>
            </Box>
           

            <Input maxW="80%"  
                onChange={handleInput} 
                name={name}
                defaultValue={itemValue} 
            />

            <Divider my="6" borderColor="gray.400" />


            <Flex justifyContent="space-between"
                alignItems="center"
            >
                <Text as="h3"
                    onClick={() => setIsEdit(false)}
                >
                    Cancelar
                </Text>
              
                <Button color="brand.white"
                    bg="black"
                    _hover={{bg:"gray.600"}}
                    onClick={() => {
                            saveDataChanged( inputData );
                            setIsEdit(false);
                        }
                    }
                    disabled={inputData.value == itemValue}
                >
                    Salvar
                </Button>
               
            </Flex>


        </Box>
    );


}