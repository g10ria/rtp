// constants
const canvas_width = 600
const canvas_height = 900

const num_rows = 6
const num_cols = 12

// constants in pixels
const bar_width = canvas_width/num_cols
const bar_height = canvas_height/num_rows
const stroke_width = 1

// const black_color

const red = '#DE4521'
const black = '#120C0E'
const gray = '#786F62'
const white = '#DABE9E'

var x = 0
var y = 0

var red_parity = 1

function setup() {
    createCanvas(canvas_width, canvas_height);
    noStroke()

    fill(white)
    noLoop()
    // frameRate(1)
    // shuffle one row at a time?
}

row_defs = [cross_black, black_with_white_lines, cross_red, black_with_red_lines, cross_black, black_with_white_lines]

function draw() {
    background(white)
    let arr = [false]
    for (let r=0;r<num_rows;r++) {
        arr.push(gen_row(arr[r], red_stripes, red_stripes_on_gray, row_defs[r]))
        red_parity = (red_parity+1) % 2
    }

    draw_rows(arr)

    // let rotate_idx = 0
    setInterval(() => {
        let rotate_idx = int(random(6))+1
        rotate_row(arr, rotate_idx) 
        draw_rows(arr)
        // rotate_idx = (rotate_idx+1) % 6
    }, 250)
}

function draw_rows(arr) {
    background(white)
    for (let r=0;r<num_rows;r++) {
        for (let c=0;c<num_cols;c++) {
            x = c*bar_width 
            y = r*bar_height 
            arr[r+1][c]()
        }
    }
}

function rotate_row(arr, idx) {
    let prior = idx == 0 ? false : arr[idx-1] 
    let posterior = idx == num_rows-1 ? false : arr[idx+1]
    let row = shuffle(arr[idx])

    let cnt = 0
    while(!valid_row(row, prior, posterior)) {
        row = shuffle(row)
        cnt++
    }
    arr[idx] = row
}

function gen_row(prior, func1, func2, func3) {
    let row = [func1,func1,func1,func1,func2,func2,func2,func2,func3,func3,func3,func3]
    while(!valid_row(row, prior, false)) {
        row = shuffle(row)
    }
    return row
}

function valid_row(row, prior, posterior) {
    for (let i=0;i<11;i++) {
        if (row[i] == row[i+1]) return false
        if (prior) {
            if (row[i] == prior[i]) return false
        }
        if (posterior) {
            if (row[i] == posterior[i]) return false
        }
    }
    if (prior && row[11] == prior[11]) return false
    if (posterior && row[11] == posterior[11]) return false
    return true
}

function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}

function red_stripes() {
    fill(red)
    minibar_height = bar_height / 12

    for (let rr = 0;rr<12;rr++) {
        if (rr % 2 == red_parity) {
            rect(x,y+rr*minibar_height, bar_width, minibar_height)
        }
    }
}

function red_stripes_on_gray() {
    blendMode(MULTIPLY)

    fill(gray)
    rect(x,y, bar_width, bar_height)

    red_stripes()

    blendMode(BLEND)
}

function cross_black() {
    fill(black)
    rectMode(CENTER)
    rect(x+bar_width/2, y+bar_height/2, stroke_width, bar_height)
    rect(x+bar_width/2, y+bar_height/2, bar_width, stroke_width)
    rectMode(CORNER)
}

function cross_red() {
    fill(red)
    rectMode(CENTER)
    rect(x+bar_width/2, y+bar_height/2, stroke_width, bar_height)
    rect(x+bar_width/2, y+bar_height/2, bar_width, stroke_width)
    rectMode(CORNER)
}

function black_with_white_lines() {
    fill(black)
    rect(x,y, bar_width, bar_height)

    fill(white)
    rectMode(CENTER)
    rect(x+bar_width/2, y+bar_height/2, stroke_width, bar_height)
    rect(x+bar_width/2, y+bar_height/2, bar_width, stroke_width)
    rectMode(CORNER)
}

function black_with_red_lines() {
    fill(black)
    rect(x,y, bar_width, bar_height)

    fill(red)
    rectMode(CENTER)
    rect(x+bar_width/2, y+bar_height/2, stroke_width, bar_height)
    rect(x+bar_width/2, y+bar_height/2, bar_width, stroke_width)
    rectMode(CORNER)
}