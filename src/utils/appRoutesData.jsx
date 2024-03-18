import * as pages from "../pages"

export const appRoutesData = [
    {
        element: <pages.Home/>,
        path: "/",
        label: "Dashboard",
    },
    {
        element: <pages.ProjectDashboard/>,
        path: "/file-generator",
        label: "File Generator",
    },
    {
        element: <pages.TemplatesDashboard/>,
        path: "/template-editor",
        label: "Template Editor",
    },
    // {
    //     element: <pages.TestPage/>,
    //     path: "/test",
    //     label: "Test page",
    // },
]
