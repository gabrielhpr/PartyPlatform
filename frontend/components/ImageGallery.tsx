import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Box } from "@chakra-ui/react";
import Image from "next/image";

interface ImageGalleryProps {
    data: any,
}

export function ImageGallery({data}: ImageGalleryProps) {
	return (
        <Carousel
            width='70vw'
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
                                h='85vh' 
                                w='100%'
                                justifyContent='center'
                                alignItems='center'
                                position='relative'
                            >
                                <Image
                                    src={image}
                                    //height={100}
                                    //height={100}
                                    //width='auto'
                                    layout='fill'
                                    objectFit='cover'
                                    //objectPosition=
                                /> 
                            </Box>
                    )
                })
            }
        
        </Carousel>
    );
}