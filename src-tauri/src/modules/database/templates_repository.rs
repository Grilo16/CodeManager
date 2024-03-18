use rusqlite::{params, Result};

use crate::modules::Template;

use super::ConnectionHandler;

pub struct TemplatesRepository {
    connection_handler: ConnectionHandler,
    table_name: String,
    table_columns: Vec<String>,
}

impl TemplatesRepository {
    pub fn new() -> Result<TemplatesRepository> {
        let connection_handler = ConnectionHandler::new()?;
        Ok(TemplatesRepository {
            connection_handler,
            table_name: "templates".to_string(),
            table_columns: vec![
                "id INTEGER PRIMARY KEY".to_string(),
                "name TEXT".to_string(),
                "contents TEXT".to_string(),
                "edit_fields TEXT".to_string(),
            ],
        })
    }

    pub fn create_templates_table(&self) -> Result<()> {
        self.connection_handler
            .create_table(&self.table_name, &self.table_columns)?;
        Ok(())
    }

    pub fn save_new_template(&self, template: Template) -> Result<()> {
        let params = template.get_params();
        self.connection_handler
            .save(&self.table_name, &self.table_columns, &params)
    }

    pub fn update_template(&self, template: Template) -> Result<()> {
        self.connection_handler.update(
            template.get_id(),
            &self.table_name,
            &self.table_columns,
            &template.get_params(),
        )
    }

    pub fn get_template_by_id(&self, id: i64) -> Result<Template> {
        let mut stmt = self.connection_handler.get_by(&self.table_name, "id")?;

        let template: Template = stmt.query_row(params![id], |row| {
            let id = row.get(0)?;
            let name = row.get(1)?;
            let contents = row.get(2)?;
            let edit_fields = row.get(3)?;
            Ok(Template::new_with_id(id, name, contents, edit_fields))
        })?;

        Ok(template)
    }

    pub fn get_all_templates(&self) -> Result<Vec<Template>> {
        let mut stmt = self.connection_handler.get_all(&self.table_name)?;

        let templates = stmt
            .query_map([], |row| {
                let id = row.get(0)?;
                let name = row.get(1)?;
                let contents = row.get(2)?;
                let edit_fields = row.get(3)?;
                Ok(Template::new_with_id(id, name, contents, edit_fields))
            })?
            .collect();

        templates
    }

    pub fn get_all_templates_no_content(&self) -> Result<Vec<Template>> {
        let selected_columns = "id, name, edit_fields";
        let mut stmt = self.connection_handler.get_all_selected_columns(&self.table_name, selected_columns)?;

        let templates = stmt
            .query_map([], |row| {
                let id = row.get(0)?;
                let name = row.get(1)?;
                let edit_fields = row.get(2)?;
                Ok(Template::new_with_id_no_content(id, name, edit_fields))
            })?
            .collect();

        templates
    }

    pub fn delete_template_by_id(&self, id: i64) -> Result<()> {
        self.connection_handler.delete_by_id(&self.table_name, id)
    }
}
