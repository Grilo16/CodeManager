import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setCurrentPathData } from "../../features";
import { invoke } from "@tauri-apps/api/tauri";
import { ExplorerControls } from "./ExplorerControls";
import { FolderIconSvg } from "../../assets";

export const Directory = ({...props}) => {
    
    const {goToDirectory} = ExplorerControls()

    const handleClickDirectory = () => {
        goToDirectory(props.path)
    }

    return (
        <StyledDirectoryDiv onClick={handleClickDirectory} title={props.path}>
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
&:hover{
    background-color: ${({theme}) => theme.colors.cadetGrey}
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

