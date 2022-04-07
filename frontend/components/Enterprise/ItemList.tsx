import { Button, Flex, Text } from "@chakra-ui/react";

interface TypeOfAccommodationItemProps {
    name: string;
    value: string;
    textToShow: string;
    description?: string;
    textAlign?: 'center' | 'left';
    selectedName: string;
    styleType?: number;
    width?: string;
    handleOnClick: Function;
}

export function ItemList({name, value, textToShow, description, selectedName, textAlign='left', styleType=1,
    width='100%', handleOnClick}: TypeOfAccommodationItemProps) {
    return (
        <Button 
            width={width} 
            py="8"
            h='auto'
            bg={ value === selectedName ? "brand.yellow" : "brand.white" }
            _hover={ value === selectedName ? {} : {bg:"brand.white_90"}}
            _focus={{ outline:"none" }}
            color={ "brand.dark_blue" }
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
                justifyContent="flex-start"
                alignItems="center"
                textAlign={textAlign}
                fontWeight={400}
                direction='column'
            >
                <Text 
                    w="100%" 
                    whiteSpace='break-spaces'
                    fontSize={20}
                    fontWeight={value == selectedName ? 500 : 400}
                >
                    {textToShow}
                </Text>

                {description
                ?
                <Text
                    w='100%'  
                    whiteSpace='break-spaces'
                    //overflow='hidden'
                    //textOverflow='clip'  
                >
                    {description}
                </Text>
                :
                <>
                </>
                }
            </Flex>
        </Button>
    );
}