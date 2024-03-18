import { CreateProject, FileExplorer, Main, MyProjects } from "../components"
export const Home = () => {
    return (
        <Main theme={"dark"} layout={"manual-grid"} templateColumns={"24rem 1fr"} templateRows={"100%"} maxHeight={"calc(100vh - 3rem)"}>
            <CreateProject/>
            <MyProjects/>
        </Main>
    )
}