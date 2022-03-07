import { Text } from "@chakra-ui/react";

interface TitleEditProps {
    title: string,
}


export function TitleEdit({title, ...rest}: TitleEditProps) {
    return (
        <Text as="h2"
            fontWeight="500"
            fontSize={22}
            {...rest}
        >
            {title}
        </Text>
    );
}