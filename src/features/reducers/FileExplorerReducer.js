import { createSlice } from "@reduxjs/toolkit";

const FileExplorerReducer = createSlice({
    name: "fileExplorer",
    
    initialState: {
        inputPath: "E:\\My projects\\CodeManagerApp\\CodeManager\\src-tauri",
        currentPath: "E:\\My projects\\CodeManagerApp\\CodeManager\\src-tauri",
        directories: [],
        files: [],
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

        setDirectories: (state, action) => {
            state.directories = action.payload    
        },
        
        setFiles: (state, action) => {
            state.files = action.payload    
            
        },
    }
})

export const { setInputPath, setCurrentPathData, setDirectories, setFiles } = FileExplorerReducer.actions
export default FileExplorerReducer.reducer


export const SelectInputPath = state => state.fileExplorer.inputPath
export const SelectCurrentPath = state => state.fileExplorer.currentPath
export const SelectDirectories = state => state.fileExplorer.directories
export const SelectFiles = state => state.fileExplorer.files