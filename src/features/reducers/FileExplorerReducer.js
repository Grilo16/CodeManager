import { createSlice } from "@reduxjs/toolkit";

const FileExplorerReducer = createSlice({
    name: "fileExplorer",
    
    initialState: {
        inputPath: "E:\\My projects\\CodeManagerApp\\CodeManager\\src-tauri",
        currentPath: "E:\\My projects\\CodeManagerApp\\CodeManager\\src-tauri",
        directories: [],
        files: [],
        selectedDirectory: {
            index: null,
            path: "",
        },
        selectedFile: {
            index: null,
            path: "",
        },
    },
    
    reducers: {
        setInputPath: (state, action) => {
            state.inputPath = action.payload
        },

        setCurrentPathData: (state, action) => {
            state.inputPath = action.payload?.path
            state.currentPath = action.payload?.path
            state.directories = action.payload?.directories
            state.files = action.payload?.files
        },

        setSelectedDirectory: (state, action) => {
            state.selectedDirectory.index = action.payload.index
            state.selectedDirectory.path = action.payload.path
            state.selectedFile.index = null
            state.selectedFile.path = ""
        },
        
        setSelectedFile: (state, action) => {
            state.selectedFile.index = action.payload.index
            state.selectedFile.path = action.payload.path
            state.selectedDirectory.index = null
            state.selectedDirectory.path = ""
        },
        
        clearSelectedPath: (state, actions) => {
            state.selectedDirectory.index = null
            state.selectedDirectory.path = ""
            state.selectedFile.index = null
            state.selectedFile.path = ""
        },

        setDirectories: (state, action) => {
            state.directories = action.payload    
        },
        
        setFiles: (state, action) => {
            state.files = action.payload    
            
        },
    }
})

export const { 
    setInputPath,
    setCurrentPathData,
    setDirectories,
    setFiles,
    setSelectedDirectory,
    setSelectedFile,
    clearSelectedPath,
 } =
  FileExplorerReducer.actions;
export default FileExplorerReducer.reducer


export const SelectInputPath = state => state.fileExplorer.inputPath
export const SelectCurrentPath = state => state.fileExplorer.currentPath
export const SelectDirectories = state => state.fileExplorer.directories
export const SelectFiles = state => state.fileExplorer.files
export const SelectSelectedDirectory = state => state.fileExplorer.selectedDirectory
export const SelectSelectedFile = state => state.fileExplorer.selectedFile