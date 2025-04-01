var capture;
var w = 600;
var h = 390;

var buffer;
var result;
var buffer_prev;

var letters = []
var curr_text_idx = 0
let text_size = 20;
var next_letter_time = 0;


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
    buffer = new jsfeat.matrix_t(w, h, jsfeat.U8C1_t);

    addLetter()
    letterTimer()

    textSize(text_size);
    fill(255);
    noStroke()
}

function letterTimer() {
    next_letter_time = (second() + random(2,5)) % 60
}

function windowed(val, low, high) {
    return min(max(val, low), high)
}

function buf(x,y) {
    return buffer.data[int(y*buffer.cols+x)]
}

function prox(x,y) {
    y = y-h
    // x and y are the bottom left edges of a 20pt letter

    // 200 pixels to the bottom
    let count_bottom = 0
    for(let i=x;i<x+20;i++) {
        for (let j=y-5;j<y+10;j++) {
            if (buf(i,j) == 255) {
                count_bottom++
            }
        }
    }

    let count_left = 0
    for(let i=x-10;i<x+5;i++) {
        for (let j=y-20;j<y;j++) {
            if (buf(i,j) == 255) {
                count_left++
            }
        }
    }

    let count_right = 0
    for(let i=x+15;i<x+30;i++) {
        for (let j=y-20;j<y;j++) {
            if (buf(i,j) == 255) {
                count_right++
            }
        }
    }

    return [count_bottom, count_left, count_right]
}

function applyPhysics() {
    let xx = 300
    let yy = 130
    // rect(xx,yy-20,20,20)
    for (let i=0;i<letters.length;i++) {
        let l = letters[i]

        let count = prox(l.xPos, l.yPos)

        // y acceleration
        if (count[0]>10) {
            l.yVel = -2
        } else if (count[0] > 3) {
            l.yVel = 0
        } else {
            l.yVel = 1
        }

        // x acceleration
        let count_xdiff = count[2]-count[1]
        if (count_xdiff > 3) {
            l.xVel = -1
        } else if (count_xdiff < -3) {
            l.xVel = 1
        } else {
            l.xVel = 0
        }

        l.xPos += l.xVel 
        l.yPos += l.yVel 
        l.xPos = windowed(l.xPos, 0, w)
        l.yPos = windowed(l.yPos, h, 2*h)
    }
}

function draw() {
    if (abs(next_letter_time-second()) < 1) {
        console.log("next letter")
        addLetter()
        letterTimer()
    }

    capture.loadPixels();
    if (capture.pixels.length > 0) {
        var blurSize = 6
        var lowThreshold = 60
        var highThreshold = 150

        jsfeat.imgproc.grayscale(capture.pixels, w, h, buffer);
        jsfeat.imgproc.gaussian_blur(buffer, buffer, blurSize, 0);
        jsfeat.imgproc.canny(buffer, buffer, lowThreshold, highThreshold);

        var n = buffer.rows * buffer.cols;
        if (buffer_prev) {
            low_pass(buffer, buffer_prev, n)
        }
        result = jsfeatToP5(buffer, result);

        buffer_prev = buffer;

        // var pixels = capture.pixels;
        // var thresholdAmount = 120

        // var total = 0;
        // var i = 0;
        // for (var y = 0; y < h; y++) {
        //     for (var x = 0; x < w; x++) {
        //         var redValue = pixels[i];
        //         var greenValue = pixels[i+1]
        //         var blueValue = pixels[i+2]
        //         var avg = (redValue + greenValue + blueValue)/3

        //         var outputValue = 0;
        //         if (avg >= thresholdAmount) {
        //             outputValue = 255;
        //             total++;
        //         }
        //         pixels[i++] = outputValue;
        //         pixels[i++] = outputValue;
        //         pixels[i++] = outputValue;
        //         i++;             
        //     }
        // }
    }
    image(result, w/2, h*1/2, w, h);
    capture.updatePixels();
    image(capture, w/2, h*3/2, w, h);

    applyPhysics()
    drawLetters()
}

function addLetter() {
    let c = full_text[curr_text_idx]

    letters.push({
        character: c, 
        xPos: random(0,w),
        yPos: h,
        xVel: 0,
        yVel: 0
    })

    curr_text_idx = (curr_text_idx+1) % full_text.length
}

function drawLetters() {
    for (let i=0;i<letters.length;i++) {
        let l = letters[i]
        text(l.character, l.xPos, l.yPos)
        text(l.character,l.xPos, l.yPos-h)
    }
}

function jsfeatToP5(src, dst) {
    if (!dst || dst.width != src.cols || dst.height != src.rows) {
        dst = createImage(src.cols, src.rows);
    }
    var n = src.data.length;
    dst.loadPixels();
    var srcData = src.data;
    var dstData = dst.pixels;
    for (var i = 0, j = 0; i < n; i++) {
        var cur = srcData[i];
        dstData[j++] = cur;
        dstData[j++] = cur;
        dstData[j++] = cur;
        dstData[j++] = 255;
    }
    dst.updatePixels();
    return dst;
}

function low_pass(buffer, buffer_prev, n) {
    let alpha = 0.5
    for (var i = 0; i < n; i++) {
        buffer.data[i] = alpha * buffer_prev.data[i] + (1-alpha) * buffer.data[i]
    }
}