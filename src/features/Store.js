import { configureStore } from "@reduxjs/toolkit";
import FileExplorerReducer from "./reducers/FileExplorerReducer";
import ProjectsReducer from "./reducers/ProjectsReducer";
import TemplatesReducer from "./reducers/TemplatesReducer";

export const Store = configureStore({
    reducer: {
        fileExplorer: FileExplorerReducer,
        projects: ProjectsReducer,
        templates: TemplatesReducer,
    }
})