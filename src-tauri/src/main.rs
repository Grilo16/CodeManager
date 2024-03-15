// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::path::Path;

use modules::file_explorer::FileExplorer;
use serde_json::json;
mod modules;

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
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            go_to_directory,
            move_up_directory,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
