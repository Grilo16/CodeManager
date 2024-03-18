use std::{fs::File, io::{Read, Result, Write}, path::PathBuf};

pub struct TemplateManager {
    output_path: PathBuf
}

impl TemplateManager {
    pub fn new(output_path: PathBuf) -> TemplateManager {
        let template_manager = TemplateManager {
            output_path
        };
        template_manager
    }

    pub fn generate_from_template(&self) -> Result<()> {
        let mut test_template = File::open(
            "E:\\My projects\\CodeManagerApp\\CodeManager\\src\\utils\\CodeManagerTemplates\\ReducerTemplate.js")?;
            
            let new_slice_name = "Te";
            let new_reducer_name = "thisName";

            let mut template_contents = String::new();
            test_template.read_to_string(&mut template_contents)?;

            let output_contents = template_contents.replace("_T_REDUCER_NAME_T_", new_reducer_name).replace("_T_SLICE_NAME_T_", new_slice_name);


            let mut output_file = File::create(&self.output_path)?;
            output_file.write_all(output_contents.as_bytes())?;

            Ok(())
    }
}