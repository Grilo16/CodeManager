import styled from "styled-components"

export const Button = ({children, ...props}) => {
    return (
        <StyledButton {...props}>{children}</StyledButton>
    )
}

const StyledButton = styled.button`
    padding: 0.5rem 2rem;
    border-radius: 10px;
    ${({$gridColumn}) => $gridColumn ? `grid-column: ${$gridColumn};`: null};
    color: white;
`