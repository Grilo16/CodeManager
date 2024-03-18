import { Editor } from "@monaco-editor/react";
import { Button, FileExplorer, Main, MyTemplates, Wrapper } from "../components";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useRef, useState } from "react";
import { SelectSelectedFile, SelectSelectedProject, SelectSelectedTemplate, clearSelectedPath, clearSelectedTemplate, setTemplates } from "../features";
import { useDispatch, useSelector } from "react-redux";
import { handleInvoke } from "../utils";
import styled from "styled-components";
import { ExplorerControls } from "../components/FileExplorer/ExplorerControls";

export const TemplatesDashboard = () => {
    const dispatch = useDispatch()

    const editorRef = useRef(null)
    
    const {goToDirectory} = ExplorerControls()    
    const [templateName, setTemplateName] = useState("")
    const [content, setContent] = useState("")
    const [editFields, setEditFields] = useState([])
    const [newPlaceholder, setNewPlaceholder] = useState("")
    const {path} = useSelector(SelectSelectedProject)


  const selectedTemplate = useSelector(SelectSelectedTemplate);
  const selectedFile = useSelector(SelectSelectedFile)
    
  const TemplateData = {
    name: templateName,
    contents: content,
    editFields: editFields.join(", ")
}

const handleGetAllTemplates = async () => {
    const templatesResult = await invoke("get_all_templates")
    dispatch(setTemplates(JSON.parse(templatesResult)))
    dispatch(clearSelectedTemplate())
    editorRef.current.setValue("")
    setEditFields([])
}
const handleSaveNewTemplate = async () => {
    await invoke("save_new_template", TemplateData)
    handleGetAllTemplates()
}


const handleSaveEditedTemplate = async () => {
    await invoke("edit_template_by_id", {id: selectedTemplate.id ,...TemplateData})
    handleGetAllTemplates()
}

    const handleAddNewField = () => {
        setEditFields(current => [...current, newPlaceholder])
    }

    const handleRemoveField = (field) => {
        setEditFields(current => 
            current.filter(item => item !== field)
        )
    }


    const handleReadFile = async () => {
        let fileContents = await invoke("read_file", {path: selectedFile.path})
        editorRef.current.setValue(fileContents)
        dispatch(clearSelectedTemplate())
        setEditFields([])
    }

    const handleDisplayTemplateById = async () => {
        let fileContents = await handleInvoke("get_template_by_id", {id: selectedTemplate?.id})
        editorRef.current.setValue(fileContents.contents)
        dispatch(clearSelectedPath())
        setEditFields(fileContents.edit_fields.split(", "))
        setTemplateName(selectedTemplate.name)
    }

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor
    }
    useEffect(() => {
        !path ?  null : goToDirectory(path)
    }, [])

    useEffect(() => {
        selectedFile.path 
        ? handleReadFile() 
        : null
    }, [selectedFile ])

    useEffect(() => {
        selectedTemplate.id 
        ? handleDisplayTemplateById() 
        : null
    }, [selectedTemplate])




    return (
        <Main theme={"dark"} layout={"manual-grid"} >
        <h1>templates dashboard</h1>
        <Wrapper layout={"manual-grid"} templateColumns={"1fr 2fr 1fr"}>

            <Wrapper theme={"dark"} layout={"manual-grid"} templateRows={"20vh auto"} maxHeight={"88.5vh"}>
                <MyTemplates/>
                <FileExplorer/>
            </Wrapper>

            <Editor
            theme="vs-dark"
            defaultLanguage="javascript"
            language="rust"
            onMount={handleEditorDidMount}
            onChange={(value, event) => setContent(value)}
            />
            <Wrapper theme={"light"} layout={"manual-grid"} placeItems={"center"} templateRows={"5rem 10rem min-content auto"} maxHeight={"61rem"}>
                {
                    selectedTemplate.id
                    ? <Button onClick={handleSaveEditedTemplate}>Save Edits</Button>
                    : selectedFile.path 
                    ? <Button onClick={handleSaveNewTemplate}>Save New Template</Button>
                    : <h1>Select a template or file</h1>
                }

                 <Wrapper layout={"flex-column"} padding={"5rem"} gap={"1rem"} alignItems={"stretch"} textAlign={"center"}>
                    <h4>new placeholder</h4>
                    <StyledInput value={newPlaceholder} onChange={(e) => setNewPlaceholder(e.target.value)}/>
                    <Button onClick={handleAddNewField}>add placeholder</Button>
                </Wrapper>

                <h2>PlaceHolders</h2>
                <Wrapper layout={"manual-grid"} templateColumns={"20rem 2rem"} autoRows={"min-content"} alignSelf={"start"} overflowY={"scroll"} height={"100%"} maxHeight={"100%"}>

                {
                    editFields.map((field, index) => 
                      <>
                            <StyledH1>{field}</StyledH1>
                            <h1 onClick={() => handleRemoveField(field)}>✘</h1>
                      </>
                    )
                    
                }
                </Wrapper>

               
                
            </Wrapper>
        </Wrapper>

        </Main>
    )
};

const StyledH1 = styled.h1`
    overflow: hidden;
    text-overflow: ellipsis;

`

const StyledInput = styled.input`
padding: 0.2rem 1rem;
border-radius: 2rem;
border: 1px solid grey;
&:focus{
    outline: none;
}
`