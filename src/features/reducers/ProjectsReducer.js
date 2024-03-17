import { createSlice } from "@reduxjs/toolkit";

const ProjectsReducer = createSlice({
    name: "projects",

    initialState: {
        selectedProject: {
            id: null,
            name: "",
            path: "",
        },
        newProjectData: {
            name: "",
            path: "",
        },
        updateProjectData: {
            name: "",
            path: "",
        },
        allProjects: [],
    },

    reducers: {

        
        setSelectedProject: (state, action) => {
            state.selectedProject = {...action.payload}
        },
        
        clearSelectedProject: (state, action) => {
            state.selectedProject.id = null
            state.selectedProject.name = "" 
            state.selectedProject.path = "" 
        },

        setNewProjectName : (state, action) => {
            state.newProjectData.name = action.payload
        },
        setNewProjectPath : (state, action) => {
            state.newProjectData.path = action.payload
        },

        clearNewProjectData : (state, action) => {
            state.newProjectData.name = ""
            state.newProjectData.path = ""
        },

        setUpdateProjectName : (state, action) => {
            state.updateProjectData.name = action.payload
        },
        setUpdateProjectPath : (state, action) => {
            state.updateProjectData.path = action.payload
        },

        clearUpdateProjectData : (state, action) => {
            state.updateProjectData.name = ""
            state.updateProjectData.path = ""
        },

        setAllProjects : (state, action) => {
            state.allProjects = action.payload
        }

    }

})

export const {
  setAllProjects,
  setSelectedProject,
  clearSelectedProject,
  setNewProjectName,
  setNewProjectPath,
  clearNewProjectData,
  setUpdateProjectName,
  setUpdateProjectPath,
  clearUpdateProjectData,
} = ProjectsReducer.actions;
export default ProjectsReducer.reducer

export const SelectAllProjects = (state) => state.projects.allProjects
export const SelectSelectedProject = (state) => state.projects.selectedProject
export const SelectNewProjectData = (state) => state.projects.newProjectData
export const SelectUpdateProjectData = (state) => state.projects.updateProjectData