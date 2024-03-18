import { Editor } from "@monaco-editor/react"
import { invoke } from "@tauri-apps/api"
import styled from "styled-components"
import * as monaco from "monaco-editor"
import { useEffect, useRef, useState } from "react"
import { FileExplorer } from "../components/FileExplorer/FileExplorer"
import { useSelector } from "react-redux"
import { SelectSelectedFile } from "../features"
import { Main } from "../components"

export const TestPage = () => {

    const editorRef = useRef(null)

    const [templateName, setTemplateName] = useState("")
    const [editFields, setEditFields] = useState([])
    const [field, setField] = useState("")
    const [content, setContent] = useState("")

    const selectedFile = useSelector(SelectSelectedFile)

    const TemplateData = {
        name: templateName,
        contents: content,
        editFields: editFields.join(", ")
    }

    const handleAddNewField = () => {
        setEditFields(current => [...current, field])
    }

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor
    }

    const handleReadFile = async () => {
        let fileContents = await invoke("read_file", {path: selectedFile.path})
        editorRef.current.setValue(fileContents)
    }

    const handleSaveTemplate = async () => {
        let contents = await invoke("save_new_template", TemplateData)
    }

    
    return (
        <Main $overflowY={"scroll"}>
            <FileExplorer/>
            {selectedFile.path ? <StyledButton onClick={handleReadFile}>Load file</StyledButton> : null}

            <h1>test page</h1>
            <Editor
             height={"30rem"}
             theme="vs-dark"
             defaultLanguage="javascript"
             language="rust"
             onMount={handleEditorDidMount}
             onChange={(value, event) => setContent(value)}
             
             /> 

             {editFields.map(field => <h5>{field}</h5>)}
            <h5>template name</h5>
            <input type="text" value={templateName} onChange={(e)=> setTemplateName(e.target.value)}/>

            <h5>Add edit field</h5>
            <input type="text" value={field} onChange={(e) => setField(e.target.value)} />
            <StyledButton onClick={handleAddNewField}>Add new field</StyledButton>

            <br />
            <StyledButton onClick={handleSaveTemplate}> Test template </StyledButton>
            
        </Main>
    )
}

const StyledButton = styled.button`
    background-color: grey;
    min-height: 3rem;
    padding: 0.5rem 2rem;
    border-radius: 20vw;

`