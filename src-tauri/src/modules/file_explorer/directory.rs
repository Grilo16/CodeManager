use core::fmt;
use std::path::PathBuf;
use serde::Serialize;
use walkdir::WalkDir;

#[derive(Serialize)]    
pub struct Directory {
    path: PathBuf ,
    name: Option<String>,
    file_count: usize,
    directory_count: usize,
}

impl Directory {
    pub fn new(path: PathBuf) -> Directory {
        let mut directory: Directory = Directory {
            path,
            name: None,
            file_count: 0,
            directory_count: 0,
        };

        directory.set_name();
        directory.set_file_and_dir_count();

        directory
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

    fn set_file_and_dir_count(&mut self) {
        for entry in WalkDir::new(&self.path).min_depth(1).max_depth(1){
            match entry {
                Ok(entry) => {
                    if entry.file_type().is_file() {
                        self.file_count += 1;
                    }else if entry.file_type().is_dir(){
                        self.directory_count += 1;
                    }
                }
                Err(err) => {
                    print!("Error {}", err)
                }
            }
        }
    }

}


impl fmt::Display for Directory {
    fn fmt(&self, formater: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            formater,
            "File {{path: {}, name: {:?}, file_count: {:?}, directory_count: {:?} }}",
            self.path.display(),
            self.name,
            self.file_count,
            self.directory_count,
        )
    }
}

impl fmt::Debug for Directory {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "File {{path: {}, name: {:?}, file_count: {:?}, directory_count: {:?} }}",
            self.path.display(),            
            self.name,
            self.file_count,
            self.directory_count,
        )
    }
}