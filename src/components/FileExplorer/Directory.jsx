import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { SelectSelectedDirectory, clearSelectedPath, setSelectedDirectory } from "../../features";
import { invoke } from "@tauri-apps/api/tauri";
import { ExplorerControls } from "./ExplorerControls";
import { FolderIconSvg } from "../../assets";

export const Directory = ({...props}) => {
    
    const {goToDirectory} = ExplorerControls()
    const selectedDirectory = useSelector(SelectSelectedDirectory)
    const dispatch = useDispatch()

    const handleOpenDirectory = () => {
        goToDirectory(props.path)
    }

    const handleSelectDirectory = () => {
        selectedDirectory.index === props.index 
        ? dispatch(clearSelectedPath())
        : dispatch(setSelectedDirectory({index: props.index, path: props.path}))
    }

    return (
        <StyledDirectoryDiv $selected={selectedDirectory?.index === props.index} onClick={handleSelectDirectory} onDoubleClick={handleOpenDirectory} title={props.path}>
            <Wrapper>
                <FolderIconSvg/>
                <h3>{props.name}</h3>
            </Wrapper>
            <DirInfoDiv>
                <p>directories: {props.directory_count}</p>
                <p>files: {props.file_count}</p>
            </DirInfoDiv>
        </StyledDirectoryDiv>
    )
};

const StyledDirectoryDiv = styled.div`
display: flex;
justify-content: space-between;
flex-wrap: wrap;
align-items: center;
padding: 0.5rem;
gap: 0.2rem;
background-color: ${({$selected, theme}) => $selected ? theme.colors.cadetGrey : `white`};
&:hover{
    background-color: ${({theme}) => theme.colors.cadetGrey}
}
&  h1,  h2, h3 ,h4, p {
    cursor: auto;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
`
const Wrapper = styled.div`
display: flex;
align-items: center;
gap: 0.5rem;
min-width: 18rem;
flex-grow: 1;
`
const DirInfoDiv = styled.div`
display: flex;
gap: 0.5rem;
align-items: flex-end ;
justify-content: space-evenly;
flex-basis: 10rem;
`

