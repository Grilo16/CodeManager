import { useDispatch } from "react-redux"
import { handleInvoke } from "../../utils"
import { Button, Wrapper } from "../layout"
import { clearSelectedProject, setAllProjects, setSelectedProject } from "../../features"
import { useNavigate } from "react-router-dom"
import { ExplorerControls } from "../FileExplorer/ExplorerControls"
import styled from "styled-components"

export const ProjectCard = ({id, name, path}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const project = {id, name, path}
    
    

    const getAllProjects = async () => {
        const projects = await handleInvoke("get_all_projects")
        dispatch(setAllProjects(projects))
    }

    const handleDeleteProject = async () => {
        const confirmation = await confirm(
            'Are you sure?',
            { title: 'Tauri', type: 'warning' }
          );
        if (confirmation){
            const result = await handleInvoke("delete_project", {...project})
            dispatch(clearSelectedProject())
            getAllProjects()
        }
    }


    const handleGoTemplateFromFile = () => {
        dispatch(setSelectedProject(project))
        navigate("/template-editor")
        
    }
    
    const handleGoFileFromTemplate = () => {
        dispatch(setSelectedProject(project))
        navigate("/file-generator")
    }
  

    return (
        <Wrapper theme={"light"} padding={"1rem"} layout={"manual-grid"} templateRows={"5rem auto"}>
            <StyledH1>{name}</StyledH1>
            <Wrapper layout={"manual-grid"} gap={"1rem"} justifyContent={"center"} >
                <Button onClick={handleGoFileFromTemplate}>File Generator</Button>
                <Button onClick={handleGoTemplateFromFile}>Template Editor</Button>
                <Button onClick={handleDeleteProject}>Delete</Button>
            </Wrapper>
        </Wrapper>
    )
}

const StyledH1 = styled.h1`
    
    font-weight: 500;
    cursor: auto;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: none;

`