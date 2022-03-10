import { Button, Flex, Text } from "@chakra-ui/react";

interface TypeOfAccommodationItemProps {
    name: string;
    value: string;
    textToShow: string;
    selectedName: string;
    styleType?: number;
    handleOnClick: Function;
}

export function ItemList({name, value, textToShow, selectedName, styleType=1, handleOnClick}: TypeOfAccommodationItemProps) {
    return (
        <Button 
            width="100%" 
            py="8"
            bg={ value === selectedName ? "brand.red" : "brand.white" }
            _hover={ value === selectedName ? {} : {bg:"brand.white_90"}}
            _focus={{ outline:"none" }}
            color={ value === selectedName ? "brand.white" : "black" }
            name={name}
            value={value}
            onClick={handleOnClick}
            borderRadius={styleType == 1 ? 0 : 8}
            borderBottom={styleType == 1 ? "1.7px solid" : "none"}
            borderColor={styleType == 1 ? "brand.white_80" : "none"}
            boxShadow={styleType == 1 ? "none" : "0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45)"}
        >
            <Flex
                width="100%"
                height="100%"
                justifyContent="space-between"
                alignItems="center"
                textAlign="left"
                fontWeight={400}
            >
                <Text width="100%" ml="5"
                    fontSize={20}
                >
                    {textToShow}
                </Text>
            </Flex>
        </Button>
    );
}