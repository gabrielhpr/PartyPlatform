import { Button, Modal, ModalOverlay, ModalContent, Text,
ModalHeader, ModalCloseButton, ModalFooter, ModalBody, useDisclosure, Flex, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface ModalServiceProfileProps {
    buttonText: string;
    title: string;
    subtitle: string;
    icon: IconType;
    iconColor: string;
    content: string;
}


export function ModalServiceProfile( {buttonText, title, subtitle, icon, iconColor, content }: ModalServiceProfileProps ) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button ml='0' onClick={onOpen} variant='outline'
                _focus={{outline:'none'}}
                border='none'
                leftIcon={<Icon as={icon} color={iconColor} />}
                fontWeight={500}
            >
                {buttonText}
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent alignItems='center' pt='3' pb='5' px='2'>
                    <ModalHeader fontSize={25} fontWeight={500}>
                        { title }
                    </ModalHeader>

                    <ModalCloseButton />
                    
                    <ModalBody alignItems='center'>
                        <Text textAlign='center' fontSize={21}>
                            { subtitle }
                        </Text>

                        <Flex justifyContent='center' mt='4'
                            alignItems='center'
                            border='1px solid rgba(0,0,0,0.4)'
                            borderRadius={8}
                            py='2'
                            w='auto'
                        >
                            <Icon as={icon} color={iconColor}/>
                            <Text ml='2' fontSize={23}>
                                {content}
                            </Text>
                        </Flex>

                    </ModalBody>

                    
                </ModalContent>
            </Modal>        
        </>
    );
}