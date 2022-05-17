import { Text } from "@chakra-ui/react";

interface TitleEditProps {
    title: string;
    id: string;
    mb?: string;
    mt?: string;
}


export function TitleEdit({title, id, mb='1', mt='0',...rest}: TitleEditProps) {
    return (
        <Text as="h2"
            fontWeight="500"
            fontSize={22}
            id={id}
            mb={mb}
            mt={mt}
            {...rest}
        >
            {title}
        </Text>
    );
}