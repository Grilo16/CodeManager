import styled from "styled-components"
import { FileExplorer } from "../FileExplorer"
import { Button, Wrapper } from "../layout"
import { useDispatch, useSelector } from "react-redux"
import { SelectNewProjectData, SelectSelectedDirectory, setAllProjects, setNewProjectName, setNewProjectPath } from "../../features"
import { useEffect } from "react"
import { NewProjectForm } from "./NewProjectForm"

export const CreateProject = () => {

    const dispatch = useDispatch()
    const selectedDirectory = useSelector(SelectSelectedDirectory)
    const newProjectData = useSelector(SelectNewProjectData)

    useEffect(() => {
        dispatch(setNewProjectPath(selectedDirectory.path))
    }, [selectedDirectory])

 

    const NoDirectorySelected = () => {
        return (
            <Wrapper theme={"light"} layout={"auto-grid"} placeItems={"center"} height={"14rem"}> 
                <h2>No project directory selected</h2>
            </Wrapper>
        )
    };

    return (
        <Wrapper layout={"manual-grid"} templateRows={"auto 1fr"} gap={"0"}>
            {
                selectedDirectory.path
                ? <NewProjectForm/>
                : <NoDirectorySelected/>
            }
            
            <FileExplorer/>
        </Wrapper>
    )
}

