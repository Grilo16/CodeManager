import * as pages from "../pages"

export const appRoutesData = [
    {
        element: <pages.Home/>,
        path: "/",
        label: "home",
    },
    {
        element: <pages.TestPage/>,
        path: "/test",
        label: "Test page",
    },
    {
        element: <pages.ProjectDashboard/>,
        path: "/project-dashboard",
        label: "Project Dashboard",
    },
    {
        element: <pages.GenerateTemplatePage/>,
        path: "/generate-template",
        label: "Generate Template",
    },
 

    // <Route element={<GenerateTemplatePage/>} path={"/gen-template"}/>
    // <Route element={<TestPage/>} path={"/test"}/>
    // <Route element={<FileExplorer/>} path={"/explorer"}/>
    // <Route element={<MyProjects/>} path={"/projects"}/>
    // <Route element={<ProjectDashboard/>} path={"/project-dashboard"}/>
]
