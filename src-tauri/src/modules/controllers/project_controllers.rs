use serde_json::json;

use crate::modules::ProjectRepository;


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