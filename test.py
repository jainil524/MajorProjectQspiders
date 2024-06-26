import io

# get all file name in specified directory and print that one by one
def get_all_file_name():
    import os
    index = 1
    for root, dirs, files in os.walk("D:/Students_Marksheet"):
        for file in files:
            print(f"{index}) {file.split(".")[0].lower()}")
            index += 1
            

get_all_file_name()