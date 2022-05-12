import { Stack, Flex, Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { FaBirthdayCake } from "react-icons/fa";
import { GiBlockHouse, GiCupcake, GiForkKnifeSpoon, GiPartyFlags } from "react-icons/gi";
import { HiHome } from "react-icons/hi";
import { ImCamera } from "react-icons/im";
import { RiCompass3Line, RiContactsLine, RiDashboardLine, RiDraftFill, RiGitMergeLine, RiInputMethodLine, RiSettings3Line, RiStore3Fill, RiSuitcaseLine } from "react-icons/ri";
import { useEnterpriseAuthContext } from "../../context/enterpriseContext";
import { useUserAuthContext } from "../../context/userContext";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
    const { authenticatedEnterprise, logoutEnterprise } = useEnterpriseAuthContext();
    const { authenticatedUser, logoutUser } = useUserAuthContext();
    const [ enterpriseArea, setEnterpriseArea ] = useState(false);
    const routerNext = useRouter();

    useEffect(() => {
        if( !routerNext.isReady ) {
            return;
        }
        if( routerNext.pathname == '/Enterprise/enterpriseAccess' ) {
            setEnterpriseArea(true);
        }
        else {
            setEnterpriseArea(false);
        }
        console.log( routerNext.pathname );

    }, [routerNext.pathname]);

    return (
        <Flex
            mt='5'
            align="flex-start"
        >
            {
                authenticatedUser
                ?
                <Stack spacing="8">
                    <NavLink icon={HiHome} href="/User/home">Home</NavLink>
                    <Divider/>
                    <NavLink icon={GiBlockHouse} href="/services?serviceCategory=Espaco">Espaços</NavLink>
                    <NavLink icon={GiForkKnifeSpoon} href="/services?serviceCategory=Servico&serviceSpecificCategory=Buffet">Buffets</NavLink>
                    <NavLink icon={FaBirthdayCake} href="/services?serviceCategory=Servico&serviceSpecificCategory=Bolos">Bolos</NavLink>
                    <NavLink icon={GiPartyFlags} href="/services?serviceCategory=Servico&serviceSpecificCategory=Decoracao">Decoração</NavLink>
                    <NavLink icon={GiCupcake} href="/services?serviceCategory=Servico&serviceSpecificCategory=Doces">Doces</NavLink>
                    <NavLink icon={ImCamera} href="/services?serviceCategory=Servico&serviceSpecificCategory=FotografiaFilmagem">Fotografia/Filmagem</NavLink>
                    <NavLink icon={BsMusicNoteBeamed} href="/services?serviceCategory=Servico&serviceSpecificCategory=Musica">Música</NavLink>
                </Stack>
                :
                authenticatedEnterprise
                ?
                <Stack spacing="8">
                    <NavLink icon={RiCompass3Line} href="/Enterprise/home">Visão geral</NavLink>
                    <NavLink icon={RiDraftFill} href="/Enterprise/ads">Meus anúncios</NavLink>
                    <NavLink icon={RiStore3Fill} href="/Enterprise/mybusiness">Meu negócio</NavLink>
                    <NavLink icon={AiOutlineStar} href="/Enterprise/rating">Avaliações</NavLink>
                    <NavLink icon={RiSettings3Line} href="/Enterprise/settings">Minha conta</NavLink>
                </Stack>
                :               
                <Stack spacing="8">
                    <NavLink icon={GiBlockHouse} href="/services?serviceCategory=Espaco">Espaços</NavLink>
                    <NavLink icon={GiForkKnifeSpoon} href="/services?serviceCategory=Servico&serviceSpecificCategory=Buffet">Buffets</NavLink>
                    <NavLink icon={FaBirthdayCake} href="/services?serviceCategory=Servico&serviceSpecificCategory=Bolos">Bolos</NavLink>
                    <NavLink icon={GiPartyFlags} href="/services?serviceCategory=Servico&serviceSpecificCategory=Decoracao">Decoração</NavLink>
                    <NavLink icon={GiCupcake} href="/services?serviceCategory=Servico&serviceSpecificCategory=Doces">Doces</NavLink>
                    <NavLink icon={ImCamera} href="/services?serviceCategory=Servico&serviceSpecificCategory=FotografiaFilmagem">Fotografia/Filmagem</NavLink>
                    <NavLink icon={BsMusicNoteBeamed} href="/services?serviceCategory=Servico&serviceSpecificCategory=Musica">Música</NavLink>
                    <Divider/>
                    <NavLink icon={RiSuitcaseLine} href="/Enterprise/enterpriseAccess">Acesso Empresas</NavLink>
                </Stack>
            }
        </Flex>
    );
}