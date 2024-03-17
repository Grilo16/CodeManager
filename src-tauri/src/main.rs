// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::path::Path;

use modules::{ProjectRepository, go_to_directory, move_up_directory, create_new_project, update_project, get_all_projects, delete_project};
use rusqlite::Error;
mod modules;

fn initialize_database() -> Result<(), Error> {
    let project_repository = ProjectRepository::new()?;
    project_repository.create_projects_table()?;
    Ok(())
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
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
