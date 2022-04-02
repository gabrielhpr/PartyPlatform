import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Box, useBreakpointValue } from "@chakra-ui/react";
import Image from "next/image";

interface ImageGalleryProps {
    data: any,
}

export function ImageGallery({data}: ImageGalleryProps) {
    const isMobileVersion = useBreakpointValue({
        base: true,
        lg: false,
    });

	return (
        <Carousel
            width={isMobileVersion ? '100vw' : '70vw'}
            autoPlay={true}
            infiniteLoop
            transitionTime={600}
            interval={4000}
            showThumbs={false}            
        >

            {
                data.map((image, i) => {
                    return (
                            <Box
                                h={{base:'45vh', lg:'85vh'}}
                                w='100%'
                                justifyContent='center'
                                alignItems='center'
                                position='relative'
                            >
                                <Image
                                    src={image}
                                    layout='fill'
                                    objectFit='cover'
                                /> 
                            </Box>
                    )
                })
            }
        
        </Carousel>
    );
}