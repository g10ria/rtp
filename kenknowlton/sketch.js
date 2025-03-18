var capture;
var w = 600;
var h = 390;

var chunk_size = 10;
var icon_map = []

var buckets = 14 // set to -1 to disable buckets (have 256 unique icons)

// load icons here
function preload(){
    var icon_names = Object.keys(icons)
    for(let i=0;i<icon_names.length;i+=icon_names.length / 255) {
        let name = icon_names[int(i)]
        icon_svg = loadImage("svg/"+name.slice(0,-4)+".svg")
        // icon_svg.resize(chunk_size+chunk_size, chunk_size+chunk_size)
        icon_map.push(icon_svg)
    }
}

function setup() {
    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        },
        flipped: true
    }, function() {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
    capture.size(w, h);
    createCanvas(w, h*2);
    capture.hide();
    
    noStroke()
    imageMode(CENTER);
    frameRate(6)
}

function clip_x(x) {
    return min(max(x,0), w)
}

function clip_y(y) {
    return min(max(y,0), h)
}

function icon(ico_idx, x, y) {
    let r = random()
    if (r < 0.05) {
        // don't draw anything lol
    } else {
        // add random noise to x/y
        let x_noise = random(-1,1)
        let y_noise = random(-1,1)
        x = clip_x(x+x_noise)
        y = clip_y(y+y_noise)
        image(icon_map[ico_idx], x, y, chunk_size*1.7, chunk_size*1.7);
    }
    
}

function condense(pixels) {
    var i = 0
    var lowest = 256
    var highest = -1
    condensed_pixels = []
    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            r = pixels[i]
            g = pixels[i+1]
            b = pixels[i+2]
            avg = (r+g+b)/3

            i += 4;

            lowest = min(lowest, avg)
            highest = max(highest, avg)

            condensed_pixels.push(avg)
        }
    }
    for (var j = 0;j<condensed_pixels.length;j++) {
        condensed_pixels[j] = ((condensed_pixels[j] - lowest) / (highest-lowest)) * 255
    }
    return condensed_pixels
}

function draw() {
    // background("white")
    clear()
    var draw_queue = []

    capture.loadPixels();
    if (capture.pixels.length > 0) {
        var pixels = capture.pixels
        pixels = condense(pixels)

        chunked_avgs = []

        for (var x = 0; x < w/chunk_size; x++) {
            for (var y = 0; y < h/chunk_size; y++) {
                // x and y are the macro chunk indices

                // chunk_y and chunk_x are the top right pixel indices of the chunk
                chunk_y = y * chunk_size 
                chunk_x = x * chunk_size 
                chunk_avg = 0

                for(xx = 0; xx<chunk_size; xx++) {
                    for (yy=0; yy<chunk_size; yy++) {
                        pixel_idx = chunk_y * w + chunk_x
                        chunk_avg += pixels[pixel_idx]
                    }
                }
                chunk_avg = chunk_avg / (chunk_size * chunk_size)
                chunked_avgs.push(chunk_avg)

                if (buckets != -1) {
                    chunk_avg = int(chunk_avg / (255/buckets)) * (255/buckets)
                }

                if (chunk_avg < 20 + random(-5, 5)) {
                    fill("black")
                    rect(chunk_x, chunk_y, chunk_size, chunk_size)
                } else if (chunk_avg > 210) {
                    fill("white")
                    rect(chunk_x, chunk_y, chunk_size, chunk_size)
                } else {
                    icon(int(chunk_avg), chunk_x+chunk_size/2, chunk_y+chunk_size/2)
                }
            }
        }
    }

    image(capture, w/2, h*3/2, w, h);
}