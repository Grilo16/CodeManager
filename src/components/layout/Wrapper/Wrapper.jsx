import styled from "styled-components"
import { BorderRadius, LayoutSelector, SetDimensions, SetMarginPadding, SetOverflow, SetSelfAlign, SetTextAlign, ThemeSelector } from "../../../style"

export const Wrapper = ({
    children, 
    theme, 
    layout, 
    placeItems,
    placeContent,
    flexDirection,
    justifyContent,
    alignItems,
    textAlign,
    minColumnSize,
    columnCount,
    templateColumns,
    templateRows,
    autoRows,
    gridColumn,
    gridRow,
    gap,
    overflow,
    overflowX,
    overflowY,
    textOverflow,
    justifySelf,
    alignSelf,
    height,
    minHeight,
    maxHeight,
    width,
    minWidth,
    maxWidth,
    margin,
    padding,
    borderRadius,
    ...props
}) => {
    return (
        <WrapperDiv
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
        $gridColumn={gridColumn}
        $autoRows={autoRows}
        $textAlign={textAlign}
        $overflow={overflow}
        $overflowX={overflowX}
        $overflowY={overflowY}
        $textOverflow={textOverflow}
        $justifySelf={justifySelf}
        $alignSelf={alignSelf}
        $height={height}
        $minHeight={minHeight}
        $maxHeight={maxHeight}
        $width={width}
        $minWidth={minWidth}
        $maxWidth={maxWidth}
        $margin={margin}
        $padding={padding}
        $borderRadius={borderRadius}
        {...props}
        >
{children}
</WrapperDiv>
)
}

const WrapperDiv = styled.div`
${ThemeSelector};
${LayoutSelector};
${SetTextAlign};
${SetOverflow};
${SetDimensions};
${SetMarginPadding};
${SetSelfAlign};
${BorderRadius};
`
