import { Text } from '@chakra-ui/react';

interface TextSpanInputProps {
    textToShow: string;
}

export function TextSpanInput({textToShow}: TextSpanInputProps) {
    return (
        <Text as='span'
            fontSize={18}
        >
            {textToShow}
        </Text>
    );
}