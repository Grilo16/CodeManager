import { useSelector } from "react-redux";
import {
  SelectDirectories,
  SelectFiles,
} from "../../features";
import { Directory } from "./Directory";
import { File } from "./File";
import { ExplorerNavBar } from "./ExplorerNavBar";
import styled from "styled-components";
import { SetOverflow } from "../../style";

export const FileExplorer = () => {
  const directories = useSelector(SelectDirectories);
  const files = useSelector(SelectFiles);

  const displayDirectories = directories?.map((directory, index) => (
    <Directory key={index} {...directory} />
  ));
  const displayFiles = files?.map((file, index) => (
    <File key={index} {...file} />
  ));

  return (
    <FileExplorerDiv>
      <ExplorerNavBar />
      <ExplorerWrapper>
        <ExplorerWrapperInner $overflowY={"auto"} $overflowX={"hidden"}>
          {displayDirectories}
          {displayFiles}
        </ExplorerWrapperInner>
      </ExplorerWrapper>
    </FileExplorerDiv>
  );
};

const FileExplorerDiv = styled.div`
background-color: green;
display: grid;
height: 100%;
grid-template-rows: 3rem 1fr;
`
const ExplorerWrapper= styled.div`
  background-color: ${({theme}) => theme.colors.jet};
  padding: 0 1rem;
  overflow: hidden;
  
  
  `
const ExplorerWrapperInner= styled.div`
  ${SetOverflow};
  background-color: white;
  border-radius: 5px;
  height: calc(100% - 1rem); 
`