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
    const nameInputRef = useRef(null)
    
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
    setTemplateName("")
    setNewPlaceholder("")

}
const handleSaveNewTemplate = async () => {
    await invoke("save_new_template", TemplateData)
    handleGetAllTemplates()
}
const handleDeleteTemplate = async () => {
    const confirmation = await confirm(
        'Are you sure?',
        { title: 'Tauri', type: 'warning' }
      );
    if (confirmation){
        await invoke("delete_template_by_id", {id: selectedTemplate.id})
        handleGetAllTemplates()
    }
}

const handleSaveEditedTemplate = async () => {
    await invoke("edit_template_by_id", {id: selectedTemplate.id ,...TemplateData})
    handleGetAllTemplates()
}

    const handleAddNewField = () => {
        setEditFields(current => [...current, newPlaceholder])
        setNewPlaceholder("")

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
        setTemplateName("")
        nameInputRef.current.focus()

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
        <Wrapper layout={"manual-grid"} templateColumns={"1fr 2fr 1fr"}>

            <Wrapper theme={"dark"} layout={"manual-grid"} templateRows={"20vh auto"} maxHeight={"93vh"}>
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
            <Wrapper theme={"light"} layout={"manual-grid"} placeItems={"center"} templateRows={"5rem 5rem 10rem min-content auto"} maxHeight={"93vh"}>

                {
                    selectedTemplate.id
                    ? <Wrapper layout={"flex"} gap={"1rem"}>
                    <Button onClick={handleSaveEditedTemplate}>Save Edits</Button>
                        <Button onClick={handleDeleteTemplate}>Delete template</Button>
                </Wrapper>
                    : selectedFile.path 
                    ? <Button onClick={handleSaveNewTemplate}>Save New Template</Button>
                    : <h1>Select a template or file</h1>
                }

                <Wrapper layout={"flex-column"} alignItems={"center"} gap={"1rem"}>

                    <h4>Template name</h4>
                    <StyledInput ref={nameInputRef} autoFocus value={templateName} onChange={(e) => setTemplateName(e.target.value)}/>
                </Wrapper>

                    
                <Wrapper layout={"flex-column"} alignItems={"center"} gap={"1rem"}>
                    <h4>new placeholder</h4>
                    <StyledInput value={newPlaceholder} onChange={(e) => setNewPlaceholder(e.target.value)}/>
                    <Button onClick={handleAddNewField}>add placeholder</Button>
                </Wrapper>

                <h2>PlaceHolders</h2>
                <Wrapper layout={"manual-grid"} templateColumns={"20rem 2rem"} autoRows={"min-content"} alignSelf={"start"} overflowY={"scroll"} height={"100%"} maxHeight={"100%"}>

                {
                    editFields.map((field, index) => field ?
                      <StyledDiv key={index}>
                            <StyledH1 >{field}</StyledH1>
                            <h1 onClick={() => handleRemoveField(field)}>✘</h1>
                      </StyledDiv>
                      : null
                    )
                    
                }
                </Wrapper>

               
                
            </Wrapper>
        </Wrapper>

        </Main>
    )
};

const StyledDiv = styled.div`
    display: contents;

`

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