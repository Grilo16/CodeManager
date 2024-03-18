import { useSelector } from "react-redux";
import {
  SelectCurrentPath,
  SelectDirectories,
  SelectFiles,
} from "../../features";
import { Directory } from "./Directory";
import { File } from "./File";
import { ExplorerNavBar } from "./ExplorerNavBar";
import styled from "styled-components";
import { SetOverflow } from "../../style";
import { useEffect } from "react";
import { ExplorerControls } from "./ExplorerControls";

export const FileExplorer = () => {
  const currentPath = useSelector(SelectCurrentPath)
  const directories = useSelector(SelectDirectories);
  const files = useSelector(SelectFiles);
  const {goToDirectory} = ExplorerControls()
  useEffect(() => {
    goToDirectory(currentPath)
  }, [])

  const displayDirectories = directories?.map((directory, index) => (
    <Directory key={index} index={index} {...directory} />
  ));
  const displayFiles = files?.map((file, index) => (
    <File key={index} index={index} {...file} />
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
display: grid;
height: 100%;
min-height: 20rem;
grid-template-rows: 3rem 1fr;
`
const ExplorerWrapper= styled.div`
  background-color: ${({theme}) => theme.colors.jet};
  overflow: hidden;
  
  
  `
const ExplorerWrapperInner= styled.div`
  ${SetOverflow};
  background-color: white;
  border-radius: 5px;
  height: 100%; 
`