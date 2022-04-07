import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue } from "@chakra-ui/react";
import { useSidebarDrawer } from "../../context/sidebarDrawerContext";
import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
    const { isOpen, onClose } = useSidebarDrawer();

    const isDrawerSidebar = useBreakpointValue({
        base: true,
        lg: false,
    });

    if( isDrawerSidebar ) {
        return (
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay>
                    <DrawerContent bgColor="brand.white" p="4">

                        <DrawerCloseButton mt="3" fontSize={16}/>

                        <DrawerHeader mb='4'></DrawerHeader>

                        <DrawerBody>
                            <SidebarNav/>
                        </DrawerBody>

                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        );
    }
    return(
        <>
        </>
    );
}