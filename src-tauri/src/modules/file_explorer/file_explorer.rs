use core::fmt;
use std::path::PathBuf;

use serde::Serialize;
use walkdir::WalkDir;

use super::{Directory, File};

#[derive(Serialize)]    
pub struct FileExplorer {
    path: PathBuf,
    directories: Vec<Directory>,
    files: Vec<File>,
}

impl FileExplorer{
    pub fn new(path : PathBuf) -> FileExplorer {
        let mut file_explorer = FileExplorer {
            path,
            directories: Vec::new(),
            files: Vec::new(),
        };
        
        if file_explorer.path.is_dir() {
            file_explorer.set_files_and_directories();
        };

        file_explorer
    }
    
    pub fn set_files_and_directories(&mut self) {

        for entry in WalkDir::new(self.path.as_path()).min_depth(1).max_depth(1){
            if let Ok(entry) = entry {
                let path = entry.path().to_path_buf();
                if entry.file_type().is_dir() {
                    self.directories.push(Directory::new(path))
                }else if entry.file_type().is_file() {
                    self.files.push(File::new(path)) 
                }
            }
        }
    }

    
    pub fn serialize_output(&mut self) -> String{
        match serde_json::to_string(&self) {
            Ok(json_string) => json_string,
            Err(err) => format!("Failed to serialize with error {:?}", err),
        }
    }
  
}



impl fmt::Display for FileExplorer {
    fn fmt(&self, formater: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            formater,
            "FileExplorer {{ path: {}, directories: {:?}, files: {:?}}}",
            self.path.display(),
            self.directories,
            self.files,
        )
    }
}

impl fmt::Debug for FileExplorer {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "FileExplorer {{ path: {}, directories: {:?}, files: {:?}}}",
            self.path.display(),
            self.directories,
            self.files,
            )
    }
}