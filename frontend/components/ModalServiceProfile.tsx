import { Button, Modal, ModalOverlay, ModalContent, Text,
ModalHeader, ModalCloseButton, ModalFooter, ModalBody, useDisclosure, Flex, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";
import Script from "next/script";

interface ModalServiceProfileProps {
    buttonText: string;
    title: string;
    subtitle: string;
    icon: IconType;
    iconColor: string;
    content: string;
    handleClick: () => void;
}


export function ModalServiceProfile( {buttonText, title, subtitle, icon, iconColor, content, handleClick }: ModalServiceProfileProps ) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            {/* GOOGLE ANALYTICS */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-RLBGWS0TCG"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-RLBGWS0TCG', {
                        send_page_view: false
                    });
                    
                `}
            </Script>

            <Button ml='0' 
                onClick={() => {
                    onOpen();
                    handleClick();
                }}
                variant='outline'
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