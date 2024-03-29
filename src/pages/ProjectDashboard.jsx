import { FileExplorer, Main, MyTemplates, TemplateGenerator, Wrapper } from "../components"
import { handleInvoke } from "../utils"
import { SelectSelectedProject, SelectSelectedTemplate, SelectTemplates, setTemplates } from "../features"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { ExplorerControls } from "../components/FileExplorer/ExplorerControls"
import { useNavigate } from "react-router-dom"
import { Editor } from "@monaco-editor/react"

export const ProjectDashboard = () => {

    const editorRef = useRef(null)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {goToDirectory} = ExplorerControls()    

    const selectedTemplate = useSelector(SelectSelectedTemplate)
    const templates = useSelector(SelectTemplates)
    const {id, name, path} = useSelector(SelectSelectedProject)
    const [editorData, setEditorData] = useState("")
    
    
    useEffect(() => {
        !path ?  navigate("/") : goToDirectory(path)
    }, [])

    useEffect(() => {
        selectedTemplate.id ? handleGetTemplateById() : null

    }, [selectedTemplate])

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor
    }

    const handleGetTemplateById = async () => {
        let fileContents = await handleInvoke("get_template_by_id", {id: selectedTemplate?.id})
        editorRef.current.setValue(fileContents.contents)       
    }

    return (
        <Main theme={"dark"} layout={"manual-grid"} templateRows={"2rem 1fr"} maxHeight={"calc(100vh - 3rem)"}>
            <Wrapper layout={"manual-grid"} templateRows={"22vh 69vh"} templateColumns={"1fr 1fr"} maxHeight={"auto"} >
                <MyTemplates/>
                <TemplateGenerator/>
                <Wrapper theme={"dark"}>
                    <h1>Open output folder</h1>
                    <FileExplorer/>
                </Wrapper>
                <Wrapper layout={"manual-grid"} theme={"dark"} maxHeight={"100%"}>
                    <h1>Template preview</h1>
                    <Editor
                         theme="vs-dark"
                         defaultLanguage="javascript"
                         onMount={handleEditorDidMount}
                         onChange={(value, event) => setEditorData(value)}
                    />
                </Wrapper>
            </Wrapper>
       
        </Main>
    )
}

