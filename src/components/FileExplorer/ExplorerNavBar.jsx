import { useDispatch, useSelector } from "react-redux";
import { SelectCurrentPath, SelectInputPath, setInputPath } from "../../features";
import { ExplorerControls } from "./ExplorerControls";
import styled from "styled-components";
import { ArrowRightSvg, ArrowTopSvg } from "../../assets";

export const ExplorerNavBar = () => {
    
    const dispatch = useDispatch()
   
    const {moveUpDirectory, goToDirectory} = ExplorerControls()
    const inputPath = useSelector(SelectInputPath)
    const currentPath = useSelector(SelectCurrentPath)
    
    const handlePathInput = (e) => {
        dispatch(setInputPath(e.target.value))
    }
   
    const handleGoToDirectory = (e) => {
        e.preventDefault()
        goToDirectory(inputPath)
    };

    const handleMoveUpDirectory = () => {
        moveUpDirectory(currentPath)
    };


    return (
      <StyledDiv>
        <StyledButton onClick={handleMoveUpDirectory}>
            <ArrowTopSvg/>
        </StyledButton>
        <StyledForm action="">
          <StyledInput
            type="text"
            value={inputPath}
            onChange={handlePathInput}
          />
          <StyledButton onClick={handleGoToDirectory}>
            <ArrowRightSvg />
          </StyledButton>
        </StyledForm>
      </StyledDiv>
    );
}

const StyledDiv = styled.div`
    position: sticky;
    top: 0;
    background-color: ${({theme}) => theme.colors.jet};
    padding: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

`

const StyledForm = styled.form`
flex-grow: 1;
display: flex;
gap: 0.2rem;
align-items: center;
`

const StyledInput = styled.input`
    flex-grow: 1;
    border-radius: 5px;
    &:focus{
        outline: 1px solid ${({theme}) => theme.colors.coral};
    }
`

const StyledButton = styled.button`
display: flex;
align-items: center;
padding: 0.2rem;
border-radius: 5px;
&:hover {
    background-color: grey;
}

    


`