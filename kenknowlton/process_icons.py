import os
import json
from PIL import Image

# higher = brighter; computed out of 1
def average_pixel_percentage(image_path):
    avg = 0
    with Image.open(image_path) as img:
        img = img.convert("RGB")
        width, height = img.size
        pixel_data = img.load()
        px_count = 0

        for y in range(height):
            for x in range(width):
                r, g, b = pixel_data[x, y]
                avg += (r+g+b) / 3
                px_count += 1

        return avg / px_count

# todo when i'm back: write this function
def create_image_map(directory):
    image_map = {}
    icon_names = os.listdir(os.getcwd() + directory)
    image_files = ["/" + f for f in icon_names if f[-4:] == ".png"]

    for image_file in image_files:
        image_path = os.getcwd() + directory + image_file
        count = average_pixel_percentage(image_path)
        image_map[image_file] = count
    
    
    sorted_map = {k : v for k, v in sorted(image_map.items(), key=lambda item: item[1])}
    print(len(sorted_map))
    return sorted_map

# 2122 icons total
directory = '/svg'
sorted_map = create_image_map(directory)

with open('icons.json', 'w') as f:
    json.dump(sorted_map, f)

for image_filename, count in sorted_map.items():
    print(f"{image_filename}: {count} ")