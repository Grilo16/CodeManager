import { css } from "styled-components";

export const SetDimensions = css`
      ${({ $width }) => ($width ? `width: ${$width}` : null)};
      ${({ $minWidth }) => ($minWidth ? `min-width: ${$minWidth}` : null)};
      ${({ $maxWidth }) => ($maxWidth ? `max-width: ${$maxWidth}` : null)};

      ${({ $height }) => ($height ? `height: ${$height}` : null)};
      ${({ $maxHeight }) => ($maxHeight ? `max-height: ${$maxHeight}` : null)};
      ${({ $minHeight }) => ($minHeight ? `min-height: ${$minHeight}` : null)};
`