var capture;
var w = 600;
var h = 390;

dy = 1;
dx = 3;
amplitude = 60

scroll_offset = 0
scroll_speed = 1

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
    createCanvas(w*2, h*3);
    capture.hide();
    
    stroke('white')
    fill('black');
    imageMode(CENTER);
}

function draw() {
    rect(0, 0, 2*w, h*2);

    averaged_pixels = []
    scroll_offset = (scroll_offset+scroll_speed)%w

    capture.loadPixels();
    if (capture.pixels.length > 0) {
        var pixels = capture.pixels;
        var i = 0;

        // Computes average pixel values for the whole image
        for (var y = 0; y < h; y++) {
            averaged_pixels.push([])
            for (var x = 0; x < w; x++) {
                var redValue = pixels[i];
                var greenValue = pixels[i+1]
                var blueValue = pixels[i+2]
                var avg = (redValue+greenValue+blueValue)/3
                averaged_pixels[averaged_pixels.length-1].push(avg)
                i+=4      
            }
        }

        X_OFFSET = w/2
        Y_OFFSET = h/2

        prev_y = 0 
        prev_x = scroll_offset

        dy_temp = dy
        for (var y = 0; y < h; y+=dy_temp) {
            prev_y = y
            prev_x = scroll_offset
            for (var x = 0; x < w; x+=dx) {
                let brightness = average_window(y,x,averaged_pixels)
                mapped_y = y-brightness/255 * (amplitude + y/10)
                mapped_x = (x+scroll_offset) % w

                mapped_y = mapped_y * 0.9 + 0.1 * prev_y // low pass filter

                // fill(brightness)
                stroke(brightness)
                strokeWeight(0.5 + brightness/255 * 1)

                SHEAR_OFFSET = y/3

                PERSPECTIVE_OFFSET = x/10

                var start_x = 0
                var start_y = 0
                var end_x = 0
                var end_y = 0
                if (mapped_x > prev_x) {
                    start_x = prev_x
                    start_y = prev_y
                    end_x = mapped_x
                    end_y = mapped_y

                    line(
                        start_x + X_OFFSET + SHEAR_OFFSET, start_y + Y_OFFSET,
                        end_x + X_OFFSET + SHEAR_OFFSET, end_y + Y_OFFSET,
                    )
                } else if (mapped_x < prev_x) {
                    // at the start..?
                    line(X_OFFSET+SHEAR_OFFSET-dx, y+2*dy+Y_OFFSET, X_OFFSET+SHEAR_OFFSET, mapped_y+Y_OFFSET)                    
                    line(X_OFFSET+SHEAR_OFFSET, mapped_y+Y_OFFSET, mapped_x+X_OFFSET+SHEAR_OFFSET, mapped_y+Y_OFFSET)
                }

                prev_y = mapped_y 
                prev_x = mapped_x
            }

            if (y % (6*dy) == 0) { 
                dy_temp += 1
            }
        }
    }
    capture.updatePixels();
    image(capture, w, h*5/2, w, h);
}

function average_window(y,x,averaged_pixels) {
    sum = 0
    num_values = 0
    for(var yy=int(y-dy/2);yy<y+dy/2;yy++) {
        for(var xx=int(x-dx/2);xx<x+dx/2;xx++) {
            if (yy>=0 && xx>=0 && yy<averaged_pixels.length && xx<averaged_pixels[0].length) {
                sum += averaged_pixels[yy][xx]
                num_values++
            }
        }
    }
    return sum/num_values
}

// TODO: write averaged window function