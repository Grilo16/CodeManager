import { css } from "styled-components"

export const rotatingCardStyle = {
  setHight: "20rem",
}

export const CenteredFlex = {
    layout: "flex-column",
    justifyContent: "center",
    alignItems: "center",
}



export const LineHighlightOnHover = css`
isolation: isolate;
position: relative;
&::before {
  transition: inset-inline 0.4s ease-in-out;
  content: "";
  position: absolute;
  inset-inline: 40%;
  bottom: 0;
  top: 99%;
  background-color: white;
  z-index: -1;
};
&:hover::before {
  top: 99%;
  inset-inline: 20%;
  background-color: white;
};
`

export const SetMarginPadding = css`
${({$margin}) => $margin ? `margin: ${$margin}` : null };
${({$padding}) => $padding ? `padding: ${$padding}` : null };
`

export const SetTextAlign = css`
${({$textAlign}) => $textAlign ? `text-align: ${$textAlign}` : null};
`
export const SetGridArea = css`
${({$gridArea}) => $gridArea ? `grid-area: ${$gridArea}` : null};

`

export const SetSelfAlign = css`
${({$justifySelf}) => $justifySelf ? `justify-self: ${$justifySelf}` : null };
${({$alignSelf}) => $alignSelf ? `align-self: ${$alignSelf}` : null };
`
export const SectionPadding = css`
    padding-block: 2rem;
    padding-inline: min(10rem, 10%);
`
export const BorderRadius = css`
border-radius: ${({$borderRadius}) => $borderRadius ?? "5px"};
`
export const SetFontLayout = css`
 ${({ $weight }) => ($weight ? `font-weight: ${$weight}` : null)};
font-size: ${({ $size }) =>
    $size === "small"
      ? `clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem);`
      : $size === "medium"
      ? `clamp(1.25rem, 0.61vw + 1.1rem, 1.58rem);`
      : $size === "large"
      ? `clamp(1.56rem, 1vw + 1.31rem, 2.11rem);`
      : $size === "x-large"
      ? `clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem);`
      : $size === "xx-large"
      ? `clamp(2.44rem, 2.38vw + 1.85rem, 3.75rem);`
      : $size === "xxx-large"
      ? `clamp(3.05rem, 3.54vw + 2.17rem, 5rem);`
      : `clamp(1rem, 0.34vw + 0.91rem, 1.19rem);`};
`