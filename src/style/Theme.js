const colors = {
    black: "#000000",
    white: "#FFFFFF",

    saffron: "#E8C547",
    davieGray: "#4D5061",
    glaucousBlue: "#5C80BC",
    columbiaBlue: "#CEE5F2",
    platinum: "#E0E0E0",
    ashGrey: "#CDD1C4",
    coral: "#FC814A",
    ghostWhite: "#FBFBFF",
    uranianBlue: "#A5D8FF",
    mountbatenPink: "#967CA2",
    darkPurple: "#362A3C",

    // light colors
    wisteria: "#A9A0CF",
    periwinkle: "#D6D6FF",
    lavender: "#EBEBFF",
    mistyRose: "#FFE2D6",
    frenchGrey: "#BABDC9",
    thisle: "#CEC9E4",
    champagnePink: "#FDE3D8",
    cadetGrey: "#8DA7BE",
    aliceBlue: "#DDEEF8",
    iceBlue: "#9DF7FB",
    azureWeb: "#F3FDFF",

    // dark colors
    jet: "#30323D",
    teal: "#177E89",
    licorice: "#191516",
    rust: "#B63B02",
    Onyx: "#363845",
    night: "#121317",
    prussianBlue: "#02383B",

    
}

export const Theme = {

    colors: {
        background: {
            light : colors.azureWeb,
            dark : colors.jet,
            accent: {
                light: colors.coral,
                dark: colors.night,
            },
        },
        
        text: {
            light: colors.azureWeb, 
            dark: colors.jet,
            accent: {
                light: colors.coral,
                dark: colors.night,
            }
        },
        ...colors,
    },
}

