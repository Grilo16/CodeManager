import styled from "styled-components"

export const Main = ({children ,...props}) => {
    return (
        <StyledMain {...props}>{children}</StyledMain>
    )
}
const StyledMain = styled.main`
    height: 100%;

`