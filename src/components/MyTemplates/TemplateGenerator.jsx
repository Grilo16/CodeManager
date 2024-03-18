import { useDispatch, useSelector } from "react-redux";
import { SelectCurrentPath, SelectFieldValues, SelectOutputFileName, SelectSelectedTemplate, setOutputFileName } from "../../features";
import { PlaceholderForm } from "./PlaceholderForm";
import { Button, Wrapper } from "../layout";
import styled from "styled-components";
import { ExplorerControls } from "../FileExplorer/ExplorerControls";
import { handleInvoke } from "../../utils";
import { invoke } from "@tauri-apps/api/tauri";

export const TemplateGenerator = () => {
  const dispatch = useDispatch()
  const {goToDirectory} = ExplorerControls()    
  const selectedTemplate = useSelector(SelectSelectedTemplate);
  const outputFileName = useSelector(SelectOutputFileName)
  const currentDirectory = useSelector(SelectCurrentPath)
  const fieldValues = useSelector(SelectFieldValues)
  
  const generatorParams = {
    outputDirPath: currentDirectory,
    templateId: selectedTemplate?.id,
    replacements: Object.values(fieldValues),
    fileName: outputFileName
  }

  const handleChangeOutputFileName = (e) => {
    dispatch(setOutputFileName(e.target.value))
}
  const handleGenerateFile = async () => {
    console.log(generatorParams)
    const result = await invoke("generate_file_from_template", generatorParams)
    goToDirectory(currentDirectory)
  }

const displayFieldInputs = selectedTemplate?.editFields.map(
    (placeholder, index) => {
      return (
        <PlaceholderForm key={index} index={index} placeholder={placeholder} />
      );
    }
  );

  const NoTemplateSelected = () => {
    return (
      <Wrapper theme={"light"} layout={"flex"} alignItems={"center"} justifyContent={"center"}>
        <h1>◄ Select a template</h1>
      </Wrapper>
    )
  }

  return selectedTemplate?.id ? (
    <Wrapper theme={"light"} layout={"manual-grid"} overflowY={"scroll"} padding={".5rem"} templateColumns={"1fr 1fr"} placeItems={"stretch"}>
      <StyledLabel>Selected Template: </StyledLabel>
      <h1>{selectedTemplate?.name}</h1>
      <StyledLabel>Output file name: </StyledLabel>
      <StyledInput value={outputFileName} onChange={handleChangeOutputFileName}/>
      {displayFieldInputs}
      <Button $gridColumn={"1/-1"} onClick={handleGenerateFile}>Generate File</Button>
    </Wrapper>
  ) : <NoTemplateSelected/>
};

const StyledLabel = styled.h1`
justify-self: center;

`

const StyledInput = styled.input`
padding: 0.2rem 1rem;
border-radius: 2rem;
border: 1px solid grey;
&:focus{
    outline: none;
}
`