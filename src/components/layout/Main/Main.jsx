import styled from "styled-components";
import { LayoutSelector, SetDimensions, SetOverflow, ThemeSelector } from "../../../style";

export const Main = ({
  children,
  theme,
  layout,
  placeItems,
  placeContent,
  alignItems,
  justifyContent,
  flexDirection,
  templateColumns,
  templateRows,
  minColumnSize,
  columnCount,
  gridRow,
  gap,
  height,
  minHeight,
  maxHeight,
  width,
  minWidth,
  maxWidth,
  ...props
}) => {
  return (
    <StyledMain
      $theme={theme}
      $layout={layout}
      $placeItems={placeItems}
      $placeContent={placeContent}
      $alignItems={alignItems}
      $justifyContent={justifyContent}
      $flexDirection={flexDirection}
      $templateColumns={templateColumns}
      $templateRows={templateRows}
      $minColumnSize={minColumnSize}
      $columnCount={columnCount}
      $gridRow={gridRow}
      $gap={gap}
      $height={height}
      $minHeight={minHeight}
      $maxHeight={maxHeight}
      $width={width}
      $minWidth={minWidth}
      $maxWidth={maxWidth}
      {...props}
    >
      {children}
    </StyledMain>
  );
};

const StyledMain = styled.main`
  ${ThemeSelector};
  ${SetOverflow};
  ${LayoutSelector};
  ${SetDimensions};
  padding: 1rem;
`;
