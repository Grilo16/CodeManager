import { configureStore } from "@reduxjs/toolkit";
import FileExplorerReducer from "./reducers/FileExplorerReducer";

export const Store = configureStore({
    reducer: {
        fileExplorer: FileExplorerReducer
    }
})