import { Flex, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RiCompass3Line, RiDraftFill, RiGlobalFill, RiSettings3Line, RiStore3Fill, RiStore3Line } from "react-icons/ri";
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
                icon={RiDraftFill}
                href='/Enterprise/ads'
            />

            <TopMenuItem
                name='Meu negócio'
                icon={RiStore3Fill}
                href='/Enterprise/mybusiness'
            />  

            <TopMenuItem
                name='Minha conta'
                icon={RiSettings3Line}
                href='/Enterprise/settings'
            />
        </Flex>
    );
}