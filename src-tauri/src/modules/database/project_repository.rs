use rusqlite::{params, Result};

use crate::modules::Project;

use super::ConnectionHandler;

pub struct ProjectRepository {
    connection_handler: ConnectionHandler,
    table_name: String,
    table_columns: Vec<String>,
}

impl ProjectRepository {
    pub fn new() -> Result<ProjectRepository> {
        let connection_handler = ConnectionHandler::new()?;
        Ok(ProjectRepository {
            connection_handler,
            table_name: "projects".to_string(),
            table_columns: vec![
                "id INTEGER PRIMARY KEY".to_string(),
                "name TEXT".to_string(),
                "path TEXT".to_string(),
            ],
        })
    }

    pub fn create_projects_table(&self) -> Result<()> {
        self.connection_handler
            .create_table(&self.table_name, &self.table_columns)?;
        Ok(())
    }

    pub fn save_new_project(&self, project: Project) -> Result<()> {
        let params = project.get_params();
        self.connection_handler
            .save(&self.table_name, &self.table_columns, &params)
    }

    pub fn update_project(&self, project: Project) -> Result<()> {
        self.connection_handler.update(
            project.get_id(),
            &self.table_name,
            &self.table_columns,
            &project.get_params(),
        )
    }

    pub fn get_project_by_id(&self, id: i64) -> Result<Project> {
        let mut stmt = self.connection_handler.get_by(&self.table_name, "id")?;

        let project: Project = stmt.query_row(params![id], |row| {
            let id = row.get(0)?;
            let name = row.get(1)?;
            let path = row.get(2)?;
            Ok(Project::new_with_id(id, name, path))
        })?;

        Ok(project)
    }

    pub fn get_all_projects(&self) -> Result<Vec<Project>> {
        let mut stmt = self.connection_handler.get_all(&self.table_name)?;

        let projects = stmt
            .query_map([], |row| {
                let id = row.get(0)?;
                let name = row.get(1)?;
                let path = row.get(2)?;
                Ok(Project::new_with_id(id, name, path))
            })?
            .collect();

        projects
    }

    pub fn delete_project_by_id(&self, id: i64) -> Result<()> {
        self.connection_handler.delete_by_id(&self.table_name, id)
    }
}
