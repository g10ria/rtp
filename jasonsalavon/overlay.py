from PIL import Image
import numpy
from blend_modes import hard_light, soft_light, grain_merge, grain_extract, overlay, darken_only, lighten_only, divide

def multiply_blend(background, foreground):
    if background.size != foreground.size or background.mode != 'RGBA' or foreground.mode != 'RGBA':
        raise ValueError("Images must have the same size and be in RGBA mode")

    result = Image.new('RGBA', background.size)
    for x in range(background.width):
        for y in range(background.height):
            r1, g1, b1, a1 = background.getpixel((x, y))
            r2, g2, b2, a2 = foreground.getpixel((x, y))

            # Normalize pixel values to the range 0-1
            r1_norm, g1_norm, b1_norm = r1 / 255, g1 / 255, b1 / 255
            r2_norm, g2_norm, b2_norm = r2 / 255, g2 / 255, b2 / 255

            # Apply multiply blend mode
            r_result = int((r1_norm * r2_norm) * 255)
            g_result = int((g1_norm * g2_norm) * 255)
            b_result = int((b1_norm * b2_norm) * 255)
            a_result = max(a1, a2)

            result.putpixel((x, y), (r_result, g_result, b_result, a_result))
    return result

def overlay_images():

    alpha = 0.5# 241 images
    # background = Image.open("./stardew/frame0.jpg").convert("RGBA")
    background = Image.new("RGBA", (1920, 1080), (120, 120, 120, 255))
    background_np = numpy.array(background).astype(float)
    for i in range(1,150):
        overlayimg = Image.open("./stardew/frame%d.jpg" % i).convert("RGBA")
        overlayimg = overlayimg.resize((overlayimg.width, overlayimg.height), Image.LANCZOS)
        overlay_np = numpy.array(overlayimg).astype(float)

        # decreasing_alpha = alpha - i/600
        # overlay.putalpha(int(255 * decreasing_alpha))
        # background.paste(overlay, (0,0), overlay) # alpha
        # background = multiply_blend(background, overlay)

        # decreasing_alpha = alpha - i/100
        # overlay.putalpha(int(255 * decreasing_alpha))
        # background.paste(overlay, (0,0), overlay) # alpha

        # background = multiply_blend(background, overlay)

        opacity = 0.000000000001
        blended_img = soft_light(background_np, overlay_np, opacity)
        blended_img = numpy.uint8(blended_img)
        background = Image.fromarray(blended_img)
        background_np = numpy.array(background).astype(float)
        # background.save("temp/%d.png" % i)
    
    background.save("out/stardew-softlight8.png")

if __name__ == '__main__':
    overlay_images()