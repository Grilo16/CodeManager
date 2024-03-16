use rusqlite::ToSql;

#[derive(Debug)]
pub struct Project {
    id: i64,
    name: String,
    path: String,
}

impl Project {
    pub fn new(name: String, path: String) -> Project {
        let project = Project {
            id: 0,
            name,
            path,
        };
        project
    }

    pub fn new_with_id(id: i64, name: String, path: String) -> Project {
        let project = Project {
            id, 
            name,
            path,
        };
        project
    }

    pub fn get_params(&self) -> Vec<&dyn ToSql>{
        vec! [
            &self.name,
            &self.path,
        ]
    }

    pub fn get_id(&self) -> i64 {
        self.id
    }
}