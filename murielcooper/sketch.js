// constants
const canvas_width = 1400
const canvas_height = 3000

const start_x = 100
const start_y = 100
const end_x = canvas_width - start_x

// constants in pixels
const base_bar_width = 10

const top_bar_height = 30
const mid_bar_height = 90
const bot_bar_height = 30

const kerning = 6
const leading = 10
const line_height = mid_bar_height + top_bar_height + bot_bar_height + leading

var bar_width = 10
var input_box;
var slider_noise;

function setupUI() {
    textFont('Verdana');
    textSize(20);

    slider_noise = createSlider(0, 50, 0);
    slider_noise.position(200, 50);

    input_box = createInput("muriel cooper");
    input_box.position(200, 80);
}

function setup() {
    createCanvas(canvas_width, canvas_height);
    fill('black');
    noStroke()
    setupUI()
}

var coord_x = start_x
var coord_y = start_y

function draw() {
    randomSeed(input_box.value().charCodeAt(0))
    coord_x = start_x + 300
    coord_y = start_y
    background(234,232,229);

    draw_str("mitp")
    ln()

    draw_str(input_box.value())
    ln()

    alphabet = [a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z]
    draw_chars_with_spaces(alphabet)
    draw_str("  hello world")
}

function draw_str(str) {
    for (let idx = 0; idx < str.length; idx++) {
        if (str[idx] == ' ') {
            step()
            step()
            step()
        } else {
            try {
                evalstr = str[idx]+"()"
                eval(evalstr)
            } catch (error) {
                console.log("unknown char", error);
            }
        }

        if (coord_x >= end_x - 3*bar_width) {
            ln()
        }
    }
}

function draw_chars_with_spaces(cs) {
    for (const fn of cs) {
        fn()
        if (fn != ln) {
            step()
        }
        if (coord_x >= end_x - 3*bar_width) {
            ln()
        }
    }
}

// should handle offsets
function step() {
    coord_x += bar_width + kerning

    if (slider_noise.value() > 0) {
        bar_width = base_bar_width/2 + random(slider_noise.value())
    } else {
        bar_width = base_bar_width
    }
}

function ln() {
    coord_y += line_height
    coord_x = start_x
}

// x is the leftmost coord, y is the vertically middle coord
function bar_mid() {
    top_left_x = coord_x
    top_left_y = coord_y - mid_bar_height/2
    rect(top_left_x, top_left_y, bar_width, mid_bar_height)
}

function bar_top() {
    top_left_x = coord_x
    top_left_y = coord_y - mid_bar_height/2 - top_bar_height
    rect(top_left_x, top_left_y, bar_width, top_bar_height)
}

function bar_bot() {
    top_left_x = coord_x
    top_left_y = coord_y + mid_bar_height/2
    rect(top_left_x, top_left_y, bar_width, bot_bar_height)
}

function dot_mid() {
    top_left_x = coord_x
    top_left_y = coord_y - mid_bar_height/2
    rect(top_left_x, top_left_y, bar_width, bar_width)
}

function dot_bot() {
    top_left_x = coord_x
    top_left_y = coord_y + mid_bar_height/2 - bar_width
    rect(top_left_x, top_left_y, bar_width, bar_width)
}