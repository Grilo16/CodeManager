use std::path::Path;

use serde_json::json;

use crate::modules::FileExplorer;


#[tauri::command]
pub fn go_to_directory(path: &str) -> String {
    let path_buf = Path::new(path).to_path_buf();
    
    if !path_buf.exists() {
        return json!({"error" : "Directory not found"}).to_string()
    }

    let mut file_explorer : FileExplorer = FileExplorer::new(path_buf);
    file_explorer.serialize_output()
}

#[tauri::command]
pub fn move_up_directory(path: &str) -> String {
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