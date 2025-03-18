import os
import subprocess

def convert_svg_to_png(svg_filepath, png_filepath):
    try:
        subprocess.run(["magick", "-density", "128", svg_filepath, png_filepath])
    except Exception as e:
        print(f"Error converting '{svg_filepath}': {e}")

def batch_convert_svg_to_png(svg_folder):
    for filename in os.listdir(svg_folder):
        if filename.lower().endswith(".svg"):
            svg_filepath = os.path.join(svg_folder, filename)
            png_filepath = os.path.join(svg_folder, os.path.splitext(filename)[0] + ".png")
            convert_svg_to_png(svg_filepath, png_filepath)

if __name__ == "__main__":
    folder_path = "./svg"
    batch_convert_svg_to_png(folder_path)