use rusqlite::{ params, Connection, Result, Statement, ToSql};

pub struct ConnectionHandler {
    connection: Connection
}

impl ConnectionHandler {
    pub fn new() -> Result<ConnectionHandler> {
        let connection : Connection  = Connection::open("../CodeManager.db")?;
        Ok(ConnectionHandler {connection})
    }

    pub fn create_table(&self, table_name: &str, table_columns: &Vec<String>) -> Result<()> {
        let formated_params = table_columns.join(",\n");
        let query_string = format!("
            CREATE TABLE IF NOT EXISTS {} ({})
        ", table_name, formated_params);

        self.connection.execute(&query_string, [])?;
        Ok(())
    }

    pub fn save(&self, table_name: &str, table_columns: &[String], params: &[&dyn ToSql]) -> Result<()> {
        
        let mut param_positions = String::new();

        let column_names: String = table_columns
            .iter()
            .skip(1)
            .enumerate()
            .map(|(index, data)| {
                
                let separator = if index == 0 {""} else {", "};
                param_positions += &format!("{}?{}", separator, index + 1);
                
                data.split_whitespace().next().unwrap_or("")
            })
            .collect::<Vec<_>>()
            .join(", ");    
        
        let query_string = format!(
            "INSERT INTO {} ({}) VALUES ({})",
            table_name, column_names, param_positions,   
        );
        
        self.connection.execute(&query_string, params)?;
        
        Ok(())
    }

    pub fn update(&self, id: i64, table_name: &String, table_columns: &[String], params: &[&dyn ToSql]) -> Result<()> {
       
        let mut params_with_id = Vec::from(params);
        params_with_id.push(&id);

        let update_params: String = table_columns
        .iter()
        .skip(1)
        .enumerate()
        .map(|(index, data)| {
            let name = data.split_whitespace().next().unwrap_or("");
            format!("{}=?{}",  name, index + 1)
        })
        .collect::<Vec<_>>()
        .join(", ");    

        let query_string = format!(
            "UPDATE {} SET {} WHERE id=?{} ",
            table_name, update_params, table_columns.len(),
        );

        self.connection.execute(&query_string, &params_with_id[..])?;

        Ok(())
    }

    pub fn get_by(&self, table_name: &String, field: &str) -> Result<Statement> {
        let query_string = format!(
            "SELECT * FROM {} WHERE {}=?1", 
            table_name, field
        );
        let stmt = self.connection.prepare(&query_string)?;
        Ok(stmt)
    }

    pub fn get_all(&self, table_name: &String) -> Result<Statement> {
        let query_string = format!(
            "SELECT * FROM {}", 
            table_name
        );
        let stmt = self.connection.prepare(&query_string)?;
        Ok(stmt)
    }
  
    pub fn get_all_selected_columns(&self, table_name: &String, selected_columns: &str) -> Result<Statement> {
        let query_string = format!(
            "SELECT {} FROM {}", 
            selected_columns, table_name
        );
        let stmt = self.connection.prepare(&query_string)?;
        Ok(stmt)
    }


    pub fn delete_by_id(&self, table_name: &str, id: i64) -> Result<()> {
        let query_string = format!(
            "DELETE FROM {} WHERE id=?1",
             table_name,   
            );
            self.connection.execute(&query_string, params![id])?;
            
            Ok(())
    }

}
