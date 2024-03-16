// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::path::Path;

use modules::{database::ProjectRepository, Project, FileExplorer};
use rusqlite::Error;
use serde_json::json;
mod modules;

fn initialize_database() -> Result<(), Error> {
    let project_repository = ProjectRepository::new()?;
    project_repository.create_projects_table()?;

    let name = String::from("ITS WORKING succesfull");
    let path = String::from("E:/my_projects/and/some/new/path");
    let project : Project = Project::new_with_id(9, name, path);
    project_repository.update_project(project)?;
    // project_repository.insert_project(project)?;

    // project_repository.delete_project_by_id(3);
    // let all_projects = project_repository.get_all_projects();
    let project_id_9 = project_repository.get_project_by_id(9);
    // println!("{:?}", all_projects);
    println!("{:?}", project_id_9);
    Ok(())
}

#[tauri::command]
fn go_to_directory(path: &str) -> String {
    let path_buf = Path::new(path).to_path_buf();
    
    if !path_buf.exists() {
        return json!({"error" : "Directory not found"}).to_string()
    }

    let mut file_explorer : FileExplorer = FileExplorer::new(path_buf);
    file_explorer.serialize_output()
}

#[tauri::command]
fn move_up_directory(path: &str) -> String {
    let parent_dir = match Path::new(path).parent() {
        Some(parent_dir) => parent_dir.to_path_buf(),
        None => return json!({"error": "Parent path not found"}).to_string(),
    };

    if !parent_dir.exists() {
        return json!({"error": "Parent path not found"}).to_string()
    }

    let mut file_explorer : FileExplorer = FileExplorer::new(parent_dir);
    file_explorer.serialize_output()
}

fn main() {
    if let Err(error) = initialize_database() {
        eprint!("failed initializing database with error : {}", error)
    };
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            go_to_directory,
            move_up_directory,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
