import { invoke } from "@tauri-apps/api/tauri"
import { useState } from "react"
import { FileExplorer, Main } from "../components"
import { useSelector } from "react-redux"
import { SelectCurrentPath } from "../features"
import { ExplorerControls } from "../components/FileExplorer/ExplorerControls"

export const GenerateTemplatePage = () => {

    const [templates, setTemplates] = useState([])
    const {goToDirectory} = ExplorerControls()

    const handleGetAllTemplates = async () => {
        const templatesResult = await invoke("get_all_templates")
        setTemplates(JSON.parse(templatesResult))
        console.log(templatesResult)
    }

    const currentPath = useSelector(SelectCurrentPath)

    const generateParams = {
        outputDirPath: currentPath,
        templateId: templates.at(1)?.id,
        replacements: [
            "MY LOOOOOOOOOVE",
        ],
        fileName: "TemplatesReducer.js"
    }

    const handleGenerateFile = async () => {
        const result = await invoke("generate_file_from_template", generateParams)
        goToDirectory(currentPath)
        console.log(result)
    }

    const displayTemplates = templates.map((template, index) => <div key={index}>
        <h2>{template?.name}</h2>
        {template?.edit_fields?.split(", ")?.map((field, index)=> <h3 key={index}>{field}</h3>)}
    </div>)

    return (
        <Main $overflowY={"scroll"} >

            <div>
                <h1>gen template</h1>
                <button onClick={handleGetAllTemplates}>Load templates</button>
                {displayTemplates}
            </div>

            <h1>output </h1>
            <FileExplorer/>    
            <button onClick={handleGenerateFile}>Generate Template</button>
        </Main>

    )
}