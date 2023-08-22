import os

def rename_files_in_folder(folder_path):
    for filename in os.listdir(folder_path):
        if ' ' in filename:
            new_filename = filename.replace(' ', '_')
            old_file_path = os.path.join(folder_path, filename)
            new_file_path = os.path.join(folder_path, new_filename)
            
            os.rename(old_file_path, new_file_path)
            print(f'Renamed: {old_file_path} -> {new_file_path}')

if __name__ == "__main__":
    folder_path = ''
    rename_files_in_folder(folder_path)