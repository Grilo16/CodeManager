use serde_json::json;

use crate::modules::{Project, ProjectRepository};


#[tauri::command]
pub fn get_all_projects() -> String {
    let project_repo = match ProjectRepository::new() {
        Ok(project_repo) => project_repo,
        Err(err) => {
            return json!({"error" :  format!("{}", err)}).to_string()
        }
    };

    let all_projects = match project_repo.get_all_projects() {
        Ok(projects) => projects,
        Err(err) => {
            return json!({"error" :  format!("{}", err)}).to_string()
        }
    };
    
    match serde_json::to_string(&all_projects) {
        Ok(result_json) => result_json ,
        Err(err) => json!({"error" :  format!("{}", err)}).to_string()
    } 
}

#[tauri::command]
pub fn delete_project(id: i64, name: String, path: String ) -> String {
    let project = Project::new_with_id(id, name, path);
    let project_repo = match ProjectRepository::new() {
        Ok(project_repo) => project_repo,
        Err(err) => {
            return json!({"error" :  format!("{}", err)}).to_string()
        }
    };

    let project_id = project.get_id();
    match project_repo.delete_project_by_id(project_id) {
        Ok(()) => json!({"success": "Successfully deleted project"}).to_string(),
        Err(err) => json!({"error" :  format!("{}", err)}).to_string()
    }
}

#[tauri::command]
pub fn create_new_project(name: String, path: String) -> String {
    let project = Project::new(name, path);
    let project_repo = match ProjectRepository::new() {
        Ok(project_repo) => project_repo,
        Err(err) => {
            return json!({"error" :  format!("{}", err)}).to_string()
        }
    };

    match project_repo.save_new_project(project) {
        Ok(()) => json!({"success": "project created successfuly"}).to_string(),
        Err(err) => {
            return json!({"error" :  format!("{}", err)}).to_string()
        }
    }
}

#[tauri::command]
pub fn update_project(id: i64, name: String, path: String) -> String {
    let project = Project::new_with_id(id, name, path);
    let project_repo = match ProjectRepository::new() {
        Ok(project_repo) => project_repo,
        Err(err) => {
            return json!({"error" :  format!("{}", err)}).to_string()
        }
    };

    match project_repo.update_project(project) {
        Ok(()) => json!({"success": "project updated successfuly"}).to_string(),
        Err(err) => {
            return json!({"error" :  format!("{}", err)}).to_string()
        }
    }

}