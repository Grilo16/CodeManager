// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{fs::{self, File}, io::{Read, Write}, path::{Path, PathBuf}};

use modules::{create_new_project, database::templates_repository, delete_project, get_all_projects, go_to_directory, move_up_directory, update_project, ProjectRepository, Template, TemplateManager, TemplatesRepository};
use rusqlite::Error;
use serde_json::json;
mod modules;

fn initialize_database() -> Result<(), Error> {
    let project_repository = ProjectRepository::new()?;
    let templates_repository = TemplatesRepository::new()?;

    templates_repository.create_templates_table()?;
    project_repository.create_projects_table()?;
    Ok(())
}

#[tauri::command]
fn get_template_by_id(id: i64) -> String {
    let templates_repository = match TemplatesRepository::new() {
        Ok(template_repository) => template_repository,
        Err(err) => return format!("{:?}", err)
    };

    let template = match templates_repository.get_template_by_id(id) {
        Ok(templates) => templates,
        Err(err) => {
            return json!({"error" :  format!("{}", err)}).to_string()
        }
    };

    match serde_json::to_string(&template) {
        Ok(result_json) => result_json ,
        Err(err) => json!({"error" :  format!("{}", err)}).to_string()
    } 


}

#[tauri::command]
fn read_file(path:String) -> String {
    let file_contents = match fs::read_to_string(path) {
            Ok(contents) => contents,
            Err(err) => return format!("{:?}", err)
        };

        file_contents
}

#[tauri::command]
fn save_new_template(name: String, contents: String, edit_fields: String) {
    let templates_repository = match TemplatesRepository::new() {
        Ok(template_repository) => template_repository,
        Err(err) => return print!("{:?}", err)
    };

    let template = Template::new(name, Some(contents), edit_fields);

    match templates_repository.save_new_template(template) {
        Ok(()) => print!("Success"),
        Err(err) => print!("{:?}", err)
    }
}

#[tauri::command]
fn get_all_templates() -> String {
    let template_repo = match TemplatesRepository::new() {
        Ok(template_repo) => template_repo,
        Err(err) => {
            return json!({"error" :  format!("{}", err)}).to_string()
        }
    };

    let all_templates_no_content = match template_repo.get_all_templates_no_content() {
        Ok(templates) => templates,
        Err(err) => {
            return json!({"error" :  format!("{}", err)}).to_string()
        }
    };
    
    match serde_json::to_string(&all_templates_no_content) {
        Ok(result_json) => result_json ,
        Err(err) => json!({"error" :  format!("{}", err)}).to_string()
    } 
}


#[tauri::command]
fn generate_file_from_template(template_id : i64, output_dir_path: String, replacements: Vec<&str>, file_name: String) -> String {

    let template_repo = match TemplatesRepository::new() {
        Ok(template_repo) => template_repo,
        Err(err) => {
            return json!({"error" :  format!("{}", err)}).to_string()
        }
    };
    
    let template = match template_repo.get_template_by_id(template_id) {
        Ok(template) => template,
        Err(err) => {
            return json!({"error" :  format!("{}", err)}).to_string()
        }
    };

    let placeholders = template.get_edit_fields_as_vec();
    let contents = template.get_contents();

    let mut output = contents.to_owned();



    for (placeholder, value) in placeholders.iter().copied().zip(replacements.into_iter()) {
        output = output.replace(placeholder, value)
    }

    let _ = match File::create(PathBuf::from(output_dir_path).join(file_name)) {
        Ok(mut file) => file.write_all(output.as_bytes()),
        Err(err) => {
            return json!({"error" :  format!("{}", err)}).to_string()
        }
    };

    return String::from("success")

}

fn main() {
    if let Err(error) = initialize_database() {
        eprint!("failed initializing database with error : {}", error)
    };
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            go_to_directory,
            move_up_directory,
            create_new_project,
            update_project,
            get_all_projects,
            delete_project,
            read_file,
            save_new_template,
            get_all_templates,
            generate_file_from_template,
            get_template_by_id,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
