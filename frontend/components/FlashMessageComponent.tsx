import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import bus from "../utils/bus";

export function FlashMessageComponent() {
    const [visibility, setVisibility] = useState( false );
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    
    useEffect(() => {
        bus.addListener('flash', ({ message, type }) => {
            setVisibility( true );
            setMessage( message );
            setType( type );
            console.log('entrou no bus');

            setTimeout(() => {
                setVisibility(false);
            }, 6000);
        })
    }, []);

    return (
        visibility && 
        
        (
        <Flex
            bg={type == 'success' ? 'green.400' : 'red.400'}
            color='brand.white'
            fontSize={18}
            fontWeight={500}
            position='fixed'
            left='50%'
            ml={{base:'-40vw', lg:'-15vw'}}
            mt='2'
            w={{base:'80vw', lg:'30vw'}}
            py='4'
            justifyContent='center'
            borderRadius={8}
            zIndex={10}
            textAlign='center'
        >
            { message }
        </Flex>
        )
    )
}