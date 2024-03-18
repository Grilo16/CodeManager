import styled from "styled-components"
import { FileIconSvg } from "../../assets"
import { SelectSelectedFile, clearSelectedPath, setSelectedFile } from "../../features"
import { useDispatch, useSelector } from "react-redux"

export const File = ({...props}) => {

    const selectedFile = useSelector(SelectSelectedFile)

    const dispatch = useDispatch()

    const handleSelectFile = () => {
        selectedFile?.index === props.index 
        ? dispatch(clearSelectedPath())
        : dispatch(setSelectedFile({index: props.index, path: props.path}))
    }


    return (
        <StyledFileDiv $selected={selectedFile?.index === props.index} onClick={handleSelectFile} title={props.path} as={"button"}>
            <Wrapper >
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
justify-content: stretch;
min-width: 100%;
background-color: ${({$selected, theme}) => $selected ? theme.colors.cadetGrey : `white`};
&:hover{
    background-color: ${({theme}) => theme.colors.cadetGrey}
}
&  h1,  h2, h3 ,h4, p {
    font-weight: 500;
    cursor: auto;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: none;
}

`

const Wrapper = styled.div`
display: flex;
align-items: center;
gap: 0.2rem;
min-width: 18rem;
flex-grow: 1;
`