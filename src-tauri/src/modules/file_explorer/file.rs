use core::fmt;
use std::{fs, path::PathBuf};

use serde::Serialize;


#[derive(Serialize)]    
pub struct File {
    path: PathBuf,
    name: Option<String>,
    extension: Option<String>,
    size_in_bytes: Option<u64>
}

impl File {
    pub fn new(path:PathBuf) -> File {
        let mut file: File = File { 
            path,
            name: None,
            extension: None,
            size_in_bytes: None,
         };
         
         file.set_name();
         file.set_extension();
         file.set_size_in_bytes();

         file
    }

    pub fn set_name (&mut self) {
        let name = self.path.file_name().map_or_else(|| {
            "No file name found".to_string()
            },
             |file_name| {
                file_name.to_string_lossy().to_string().to_owned()
            }
        );
        self.name = Some(name);
    }

    pub fn set_extension(&mut self) {
        let extension = self.path.extension().map_or_else(|| {
                "No File Extension".to_string()
            }, |file_extension| {
                file_extension.to_string_lossy().to_string().to_owned()
            });

            self.extension = Some(extension)
    }

    pub fn set_size_in_bytes(&mut self) {
        let size_in_bytes = fs::metadata(&self.path)
                                                    .map(|metadata| metadata.len())
                                                    .unwrap_or(0);
        self.size_in_bytes = Some(size_in_bytes)
    }
}




impl fmt::Display for File {
    fn fmt(&self, formater: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            formater,
            "File {{ path: {}, name: {:?}, file_type: {:?}, size: {:?}bytes }}",
            self.path.display(),
            self.name,
            self.extension,
            self.size_in_bytes
        )
    }
}

impl fmt::Debug for File {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "File {{ path: {:?}, name: {:?}, file_type: {:?}, size: {:?}bytes }}",
            self.path,
            self.name,
            self.extension,
            self.size_in_bytes
        )
    }
}