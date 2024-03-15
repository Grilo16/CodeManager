import styled from "styled-components"
import { FileIconSvg } from "../../assets"

export const File = ({...props}) => {

    return (
        <StyledFileDiv title={props.path}>
            <Wrapper>
                <FileIconSvg/>
                <h4>{props.name}</h4>
            </Wrapper>
            <p>Size: {props.size_in_bytes} bytes</p>
        </StyledFileDiv>
    )
}

const StyledFileDiv = styled.div`
    display: flex;
justify-content: space-between;
flex-wrap: wrap;
align-items: center;
padding: 0.5rem;
gap: 0.5rem;
&:hover{
    background-color: ${({theme}) => theme.colors.cadetGrey}
}

`

const Wrapper = styled.div`
display: flex;
align-items: center;
gap: 0.2rem;
min-width: 18rem;
flex-grow: 1;
`