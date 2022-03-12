import { extendTheme } from '@chakra-ui/react';


export const theme = extendTheme({

    colors: {
        brand: {
            "yellow":    "#ffdd7c",
            "red":       "#FF5851",
            "blue":      "#3A57B5",
            "dark_blue": "#021231",



            "blue_light":"#98dffd",
            "purple":    "#7541ee",

            "white":        "#FAFAFA",
            "black":        "#000000",

            "yellow_70": "#ffd666",
            "yellow_65": "#ffcf4d",
            "yellow_60": "#ffc933",
            "yellow_55": "#ffc21a",
            "yellow_50": "#ffbb00",
            "yellow_45": "#e6a800",
            "yellow_40": "#cc9600",

            

            "light_blue_95":    "#e7f8fd",
            "light_blue_90":    "#cff1fc",
            "light_blue_85":    "#b7eafa",
            "light_blue_80":    "#a0e4f8",
            "light_blue_75":    "#88ddf7",
            "light_blue_70":    "#70d6f5",
            "light_blue_65":    "#58cff3",
            "light_blue_60":    "#40c8f2",
            "light_blue_50":    "#11bbee",
            "light_blue_45":    "#0fa8d7",
            "light_blue_40":    "#0d95bf",
            "light_blue_35":    "#0c83a7",

            "red_80": "#ff9b99", 
            "red_75": "#ff8280",
            "red_70": "#ff6966",
            "red_65": "#ff4f4d",
            "red_60": "#ff3633",
            "red_55": "#ff1d1a",
            "red_50": "#ff0400",
            "red_45": "#e60400",
            "red_40": "#cc0300",
            "red_35": "#b30300",
            "red_30": "#990300",
            
            "white_95":     "#f2f2f2",
            "white_90":     "#e6e6e6",
            "white_85":     "#d9d9d9",
            "white_80":     "#cccccc",
            "white_75":     "#bfbfbf",
            "white_70":     "#b3b3b3",
            "white_65":     "#a6a6a6",
            "white_60":     "#999999",
            "white_55":     "#8c8c8c",
            "white_50":     "#808080",
            "white_45":     "#737373",
            "white_40":     "#666666",
            "white_35":     "#595959",
        },
        old_brand: {
            "beige":            "#F2C9A7",
            "light_blue":       "#26C1F0", // light_blue_55
            "blue":             "#2C5BC9",
            "dark_blue":        "#233970",
            "pink":             "#F27496",
            "white":            "#FFFFFF",

            "light_blue_95":    "#e7f8fd",
            "light_blue_90":    "#cff1fc",
            "light_blue_85":    "#b7eafa",
            "light_blue_80":    "#a0e4f8",
            "light_blue_75":    "#88ddf7",
            "light_blue_70":    "#70d6f5",
            "light_blue_65":    "#58cff3",
            "light_blue_60":    "#40c8f2",
            "light_blue_50":    "#11bbee",
            "light_blue_45":    "#0fa8d7",
            "light_blue_40":    "#0d95bf",
            "light_blue_35":    "#0c83a7",

            "white_95": "#f2f2f2",
            "white_90": "#e6e6e6",
            "white_85": "#d9d9d9",
            "white_80": "#cccccc",
            "white_75": "#bfbfbf",
            "white_70": "#b3b3b3",
        },

        gray: {
            "900": "#181B23",
            "800": "#1F2029",
            "700": "#353646",
            "600": "#4B4D63",
            "500": "#616480",
            "400": "#797D9A",
            "300": "#9699B0",
            "200": "#B3B5C6",
            "100": "#D1D2DC",
            "50" : "#EEEEF2",
        },

        white: {

        }

    },
    fonts: {
        heading: 'Roboto',
        body: 'Roboto',
    },
    styles: {
        global: {
            html: {
                height: '100vh',
            },
            body: {
                bg: 'brand.white',
                color: 'black',
                height: '100%',
            },
            '.carousel .control-arrow, .carousel.carousel-slider .control-arrow': {
                opacity: 1,
            },
            '.alice-carousel.__ssr': {

            },
            
        }
    }
})