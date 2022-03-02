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
                <ModalContent alignItems='center'>
                    <ModalHeader>
                        { title }
                    </ModalHeader>

                    <ModalCloseButton />
                    
                    <ModalBody>
                        <Text textAlign='center'>
                            { subtitle }
                        </Text>

                        <Flex justifyContent='center' mt='3'
                            alignItems='center'
                        >
                            <Icon as={icon} color={iconColor}/>
                            <Text ml='2'>
                                {content}
                            </Text>
                        </Flex>

                    </ModalBody>

                    <ModalFooter>
                        
                    </ModalFooter>
                </ModalContent>
            </Modal>        
        </>
    );
}