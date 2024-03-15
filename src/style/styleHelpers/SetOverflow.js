import { css } from "styled-components";

const StyledScrollBar = css`
    &::-webkit-scrollbar {
        background: transparent;
        height: 5px;
        width: 5px;
    };
    &::-webkit-scrollbar-corner {
        background: rgba(0,0,0,0);
    };
    &:hover {
        &::-webkit-scrollbar-thumb {
            background: ${({theme}) => theme.colors.jet};
            border-radius: 10px;
        };
    };
`
export const SetOverflow = css`
  ${({ $overflow }) => ($overflow ? `overflow: ${$overflow}` : null)};
  ${({ $overflowX }) => ($overflowX ? `overflow-x: ${$overflowX}` : null)};
  ${({ $overflowY }) => ($overflowY ? `overflow-y: ${$overflowY}` : null)};
  ${({ $overflow, $overflowX, $overflowY }) =>
    [$overflow, $overflowX, $overflowY].some((overflow) =>
    ["scroll", "auto"].includes(overflow)
    )
    ? StyledScrollBar
    : null};
  ${({$textOverflow}) => ($textOverflow ? `text-overflow: ${$textOverflow}` : null)};

`;