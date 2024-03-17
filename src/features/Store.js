import { configureStore } from "@reduxjs/toolkit";
import FileExplorerReducer from "./reducers/FileExplorerReducer";
import ProjectsReducer from "./reducers/ProjectsReducer";

export const Store = configureStore({
    reducer: {
        fileExplorer: FileExplorerReducer,
        projects: ProjectsReducer,
    }
})