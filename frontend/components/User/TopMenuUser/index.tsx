import { Flex, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { RiCompass3Line, RiDraftFill, RiGlobalFill, RiSettings3Line, RiStore3Fill, RiStore3Line } from "react-icons/ri";
import { FiSearch } from 'react-icons/fi';
import { TopMenuItemUser } from "./TopMenuItemUser";

export function TopMenuUser() {
    
    return (
        <Flex as="header"
            width="100%"
            bg="brand.white"
            px={{base:'0', lg:"12"}}
            alignItems="center"
            h={20}
            position='relative'
            justifyContent={{base:'space-evenly', md:"center"}}
        >
            <TopMenuItemUser
                name='Pesquisa'
                icon={FiSearch}
                href='/User/home'
            />
           
        </Flex>
    );
}