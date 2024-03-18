import * as pages from "../pages"

export const appRoutesData = [
    {
        element: <pages.Home/>,
        path: "/",
        label: "home",
    },
    {
        element: <pages.ProjectDashboard/>,
        path: "/project-dashboard",
        label: "Project Dashboard",
    },
    {
        element: <pages.TemplatesDashboard/>,
        path: "/templates-dashboard",
        label: "Templates Dashboard",
    },
    // {
    //     element: <pages.TestPage/>,
    //     path: "/test",
    //     label: "Test page",
    // },
]
