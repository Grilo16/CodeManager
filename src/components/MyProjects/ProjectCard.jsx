import { useDispatch } from "react-redux"
import { handleInvoke } from "../../utils"
import { Button, Wrapper } from "../layout"
import { clearSelectedProject, setAllProjects, setSelectedProject } from "../../features"
import { useNavigate } from "react-router-dom"
import { ExplorerControls } from "../FileExplorer/ExplorerControls"

export const ProjectCard = ({id, name, path}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const project = {id, name, path}
    
    

    const getAllProjects = async () => {
        const projects = await handleInvoke("get_all_projects")
        dispatch(setAllProjects(projects))
    }

    const handleDeleteProject = async () => {
        const result = await handleInvoke("delete_project", {...project})
        dispatch(clearSelectedProject())
        getAllProjects()
    }

    const handleSelectProject = () => {
        dispatch(setSelectedProject(project))
        navigate("/project-dashboard")
    }

    return (
        <Wrapper theme={"light"} padding={"1rem"} layout={"manual-grid"} templateRows={".7fr .2fr"}>
            <h1>{name}</h1>
            
            <Wrapper layout={"flex"} gap={"1rem"} justifyContent={"center"} >
                <Button onClick={handleSelectProject}>Start</Button>
                <Button onClick={handleDeleteProject}>Delete</Button>
            </Wrapper>
        </Wrapper>
    )
}
