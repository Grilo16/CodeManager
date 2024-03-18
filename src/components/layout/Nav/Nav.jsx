import styled from "styled-components"
import { Link } from "react-router-dom"
import { appRoutesData } from "../../../utils"

export const Nav = () => {
    const links = appRoutesData.map((route, index) => <StyledLink key={index} to={route.path}> {route.label} </StyledLink>)
    
    return (
        <StyledNav> 
            {links}
        </StyledNav>
    )
}

const StyledNav = styled.nav`
display: flex;
background-color: ${({theme}) => theme.colors.davieGray};
gap: 1rem;
align-items: center;
padding-inline: 1rem;
`

const StyledLink = styled(Link)`
color: ${({theme}) => theme.colors.white}

`