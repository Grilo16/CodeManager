import styled from "styled-components"
import { FileExplorer } from "../components"
import { handleInvoke } from "../utils"
import { SelectNewProjectData, SelectSelectedPath, setAllProjects, setNewProjectName, setNewProjectPath } from "../features"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

export const ProjectDashboard = () => {
    
    const newProjectData = useSelector(SelectNewProjectData)
    const selectedPathData = useSelector(SelectSelectedPath)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setNewProjectPath(selectedPathData.path))
    }, [selectedPathData])

    const getAllProjects = async () => {
        let projects = await handleInvoke("get_all_projects")
        dispatch(setAllProjects(projects))
    }

    const handleCreateProject = async () => {
        let result = await handleInvoke("create_new_project", {...newProjectData})
        getAllProjects()
    }

    return (
        <PageWrapper>
            <Wrapper>
                <h1>project dashboard</h1>
                <Wrapper>
                    <h1>Create new project</h1>
                    <div>
            <h4>Project Name</h4>
            <input type="text" value={newProjectData.name} onChange={(e) => dispatch(setNewProjectName(e.target.value))}/>

            <h4>Project Path</h4>
            {newProjectData.path ? <h5>{newProjectData.path}</h5> : <h5>Select a project directory</h5>}
            
            <button onClick={handleCreateProject}>Create</button>
        </div>

                </Wrapper>

            </Wrapper>
            <FileExplorer/>
        </PageWrapper>
    )
}

const PageWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 100vh;

`
const Wrapper = styled.div`
    

`