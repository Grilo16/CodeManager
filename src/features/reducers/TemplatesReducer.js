import { createSlice } from "@reduxjs/toolkit";

const TemplatesReducer = createSlice({
    name: "templates",

    initialState: {
        outputFileName: "",
        selectedTemplate: {
            id: null,
            name: "",
            editFields: []
        },
        fieldValues: {},
        templates: []
    },

    reducers: {

        setOutputFileName: (state, action) => {
            state.outputFileName = action.payload
        },

        clearOutputFileName: (state, action) => {
            state.outputFileName = ""
        },

        setSelectedTemplate: (state, action) => {
            const {id, name, edit_fields} = action.payload
            state.selectedTemplate.id = id
            state.selectedTemplate.name = name
            state.selectedTemplate.editFields = edit_fields.split(", ")
        },
        
        initiateFieldValues: (state, action) => {
            state.selectedTemplate.editFields.forEach((field, index) => state.fieldValues[index] = field)
        },

        setFieldValue: (state, action) => {
            const {index, value} = action.payload
            state.fieldValues[index] = value
        },

        clearFieldValues: (state, action) => {
            state.fieldValues = {}    
        },

        setTemplates : (state, action) => {
            state.templates = action.payload
        }

    }

})

export const {
  setTemplates,
  setSelectedTemplate,
  setFieldValue,
  initiateFieldValues,
  clearFieldValues,
  setOutputFileName,
  clearOutputFileName,
} = TemplatesReducer.actions;
export default TemplatesReducer.reducer

export const SelectTemplates = (state) => state.templates.templates
export const SelectSelectedTemplate = (state) => state.templates.selectedTemplate
export const SelectFieldValues = (state) => state.templates.fieldValues
export const SelectOutputFileName = (state) => state.templates.outputFileName