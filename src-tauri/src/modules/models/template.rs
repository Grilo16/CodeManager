use rusqlite::ToSql;
use serde::Serialize;

#[derive(Debug)]
#[derive(Serialize)]    
pub struct Template {
    id: i64,
    name: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    contents: Option<String>,
    edit_fields: String,
}

impl Template {
    pub fn new(name: String, contents: Option<String>, edit_fields: String) -> Template {
        let template = Template {
            id: 0,
            name,
            contents,
            edit_fields,
        };
        
        template
    }
    pub fn new_with_id(id: i64, name: String, contents: Option<String>, edit_fields: String) -> Template {
        let template = Template {
            id,
            name,
            contents,
            edit_fields,
        };
        
        template
    }
    pub fn new_with_id_no_content(id: i64, name: String, edit_fields: String) -> Template {
        let template = Template {
            id,
            name,
            contents: None,
            edit_fields,
        };
        
        template
    }

    pub fn get_id(&self) -> i64 {
        self.id
    }

    pub fn get_contents(&self) -> &str {
        match &self.contents {
            Some(content) => content,
            None => "No content in template",
        }
    }

    pub fn get_edit_fields_as_vec(&self) -> Vec<&str> {
        let vec_edit_fields : Vec<&str> = self.edit_fields.split(", ").collect();
        vec_edit_fields
    }

    pub fn get_params(&self) -> Vec<&dyn ToSql> {
        vec! [
            &self.name,
            &self.contents,
            &self.edit_fields,
        ]
    }
}