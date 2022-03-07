import { Flex, Icon, Text } from "@chakra-ui/react";
import { RiCompass3Line, RiGlobalFill, RiSettings3Line, RiStore3Fill, RiStore3Line } from "react-icons/ri";
import { TopMenuItem } from "./TopMenuItem";

export function TopMenuEnterprise() {
    return (
        <Flex as="header"
            width="100%"
            bg="brand.white"
            px="12"
            alignItems="center"
            h={20}
            position='relative'
            justifyContent="center"
        >
            <TopMenuItem
                name='Visão geral'
                icon={RiCompass3Line}
                href='/Enterprise/home'
            />

            <TopMenuItem
                name='Meus anúncios'
                icon={RiStore3Line}
                href='/Enterprise/ads'
            />

            <TopMenuItem
                name='Minha conta'
                icon={RiSettings3Line}
                href='/Enterprise/settings'
            />
        </Flex>
    );
}