import { useDispatch, useSelector } from "react-redux"
import { SelectNewProjectData, SelectSelectedDirectory, clearNewProjectData, clearSelectedPath, setAllProjects, setNewProjectName } from "../../features"
import { Button, Wrapper } from "../layout"
import styled from "styled-components"
import { handleInvoke } from "../../utils"
import { useEffect, useRef } from "react"

export const NewProjectForm = () => {
    const dispatch = useDispatch()
    
    const selectedDirectory = useSelector(SelectSelectedDirectory)
    const newProjectData = useSelector(SelectNewProjectData)
    const inputRef = useRef(null)

    useEffect(() => {
        inputRef?.current?.focus()
    }, [])

    const getAllProjects = async () => {
        const projects = await handleInvoke("get_all_projects")
        dispatch(setAllProjects(projects))
    }

    const handleCreateProject = async (e) => {
        e.preventDefault()
        const result = await handleInvoke("create_new_project", {...newProjectData})
        getAllProjects()
        dispatch(clearNewProjectData())
        dispatch(clearSelectedPath())
    }


    return (
        <Wrapper as={"form"} theme={"light"} margin={"1rem"} padding={"0.5rem"} layout={"manual-grid"} templateRows={"min-content 2rem min-content 3rem 2rem"} onSubmit={handleCreateProject}>
        <h4>Project name</h4>
        <StyledInput ref={inputRef} type="text" value={newProjectData.name} onChange={(e) => dispatch(setNewProjectName(e.target.value))}/>

        <h4>Selected path</h4>  
        <p>{selectedDirectory.path}</p>
        <Button>Bookmark project</Button>

        </Wrapper>
    )
}

const StyledInput = styled.input`
padding: 0.2rem 1rem;
border-radius: 2rem;
border: 1px solid grey;
&:focus{
    outline: none;
}
`