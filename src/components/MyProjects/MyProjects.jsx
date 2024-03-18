import { useDispatch, useSelector } from "react-redux"
import { handleInvoke } from "../../utils"
import { SelectAllProjects, SelectNewProjectData, SelectSelectedProject, SelectUpdateProjectData, clearSelectedProject, clearUpdateProjectData, setAllProjects, setNewProjectName, setNewProjectPath, setSelectedProject, setUpdateProjectName, setUpdateProjectPath } from "../../features"
import { useEffect } from "react"
import { ProjectCard } from "./ProjectCard"
import { Wrapper } from "../layout"

export const MyProjects = () => {

    const dispatch = useDispatch()
    const allProjects = useSelector(SelectAllProjects)
    const newProjectData = useSelector(SelectNewProjectData)
    const updateProjectData = useSelector(SelectUpdateProjectData)
    const {id, name, path} = useSelector(SelectSelectedProject)


    useEffect(() => {
        getAllProjects()
    }, [])


    const getAllProjects = async () => {
        let projects = await handleInvoke("get_all_projects")
        dispatch(setAllProjects(projects))
    }

    const handleDeleteProject = async (project) => {
        let result = await handleInvoke("delete_project", {...project})
        console.log(result)
        dispatch(clearSelectedProject())
        getAllProjects()
    }


    const handleCreateProject = async () => {
        let result = await handleInvoke("create_new_project", {...newProjectData})
        console.log(result)
        getAllProjects()
    }

    const handleUpdateProject = async () => {
        let result = await handleInvoke("update_project", {id: id, ...updateProjectData})
        console.log(result)
        dispatch(clearSelectedProject())
        dispatch(clearUpdateProjectData())
        getAllProjects()        
    }
    const displayProjects = allProjects.map((project, index) => <ProjectCard key={index} {...project}/>)
    // const displayProjects = allProjects.map((project, index) => (
    //     <div style={{display: "flex", justifyContent: "space-between"}}>
    //         <h1 key={index} onClick={() => dispatch(setSelectedProject(project))}>
    //             {project?.name}
    //         </h1>

    //         <button onClick={() => handleDeleteProject({...project})}>Delete project</button>

    //     </div>
    // ));

    return (
        <Wrapper theme={"dark"} layout={"auto-grid"} minColumnSize={"16rem"}  overflowY={"scroll"} autoRows={"16rem"}>
            {displayProjects}
        </Wrapper>
        )
    }
    
    {/* 
    // <>
    // <div>
    //     <h1>Selected Project</h1>
    //     <h4>project id: {id}</h4>
    //     <h4>name: {name}</h4>
    //     <h4>path: {path}</h4>
    //     <hr />

    // </div>
    //     <h1 onClick={getAllProjects}>my projects</h1>
    //     <br />
    // {displayProjects}
    // </>
            <h4>update name</h4>    
            <input type="text" value={updateProjectData.name} onChange={(e) => dispatch(setUpdateProjectName(e.target.value))}/>
            <h4>update Path</h4>
            <input type="text" value={updateProjectData.path} onChange={(e) => dispatch(setUpdateProjectPath(e.target.value))}/>

            <button onClick={handleUpdateProject}>update</button>

            <br />

            <button onClick={()=>handleDeleteProject({id: id, name: name, path: path})}>delete project</button> */}

                    {/* <div>
            <h1>Create new project</h1>
            <h4>Project Name</h4>
        {    console.log(newProjectData)}
            <input type="text" value={newProjectData.name} onChange={(e) => dispatch(setNewProjectName(e.target.value))}/>

            <h4>Project Path</h4>
            <input type="text" value={newProjectData.path} onChange={(e) => dispatch(setNewProjectPath(e.target.value))}/>
            
            <button onClick={handleCreateProject}>Create</button>
        </div> */}