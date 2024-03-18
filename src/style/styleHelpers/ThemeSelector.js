import {css} from "styled-components"

const BackgroundDark = css`
    background-color: ${({theme}) => theme.colors.background.dark};
`
const BackgroundDarkAccent = css`
    background-color: ${({theme}) => theme.colors.background.accent.dark};

`
const BackgroundLight = css`
    background-color: ${({theme}) => theme.colors.background.light};

`
const BackgroundLightAccent = css`
    background-color: ${({theme}) => theme.colors.background.accent.light};
`
const TextLight = css`
    color:  ${({theme}) => theme.colors.text.light};

`
const TextLightAccent = css`
    color:  ${({theme}) => theme.colors.text.accent.light};

`
const TextDark = css`
    color:  ${({theme}) => theme.colors.text.dark};

`
const TextDarkAccent = css`
    color:  ${({theme}) => theme.colors.text.accent.dark};

`

const DarkTheme = css`
${BackgroundDark};

& > h1, & > * > h1 {
    ${TextLight};
};
& > h2, & > * > h2 {
    ${TextLightAccent};
};
& > p, & > * > p, & > a, & > * > a {
    ${TextLight};
};

& > button, & > * > button {
    ${BackgroundLightAccent};
    > p {
        ${TextLight};
    }
};
`
const DarkAccentTheme = css`
${BackgroundDarkAccent};
& > h1, & > * > h1 {
    ${TextLightAccent};
};
& > h2, & > * > h2 {
    ${TextLightAccent};
};
& > p, & > * > p, & > a, & > * > a {
    ${TextLight};
};
& > button, & > * > button {
    ${BackgroundLightAccent};
    & > p {
    ${TextDarkAccent};
    };
};
`
const LightTheme = css`
${BackgroundLight};

& > h1, & > * > h1 {
    ${TextDark};
};
& > h2, & > * > h2 {
    ${TextDarkAccent};
};
& > p, & > * > p, & > a, & > * > a {
    ${TextDark};
};
& > button, & > * > button {
    ${BackgroundDark};
    & > p {
        ${TextLight};
    };
};

`
const LightAccentTheme = css`
${BackgroundLightAccent};
& > h1, & > * > h1 {
    ${TextDarkAccent};
};
& > h2, & > * > h2 {
    ${TextDark};
};
& > p, & > * > p, & > a, & > * > a {
    ${TextDarkAccent};
};
& > button, & > * > button {
    ${BackgroundDarkAccent};
    & > p {
        ${TextLightAccent};
    };
};
`
export const ThemeSelector = css`
    ${({$theme}) => 
        $theme === "dark"
        ? DarkTheme
        : $theme === "dark-accent"
        ? DarkAccentTheme
        : $theme === "light-accent"
        ? LightAccentTheme
        : $theme === "light"
        ? LightTheme
        : null
    }; 
`
