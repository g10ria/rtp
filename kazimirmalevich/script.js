paper.install(window);

const style_string = `
  .cls-1 {
    fill: #e4e3df;
  }

  .cls-2 {
    fill: #d29e91;
  }

  .cls-3 {
    stroke: #b5b4b9;
  }

  .cls-3, .cls-4, .cls-5, .cls-6, .cls-7 {
    fill: none;
    stroke-miterlimit: 10;
  }

  .cls-8 {
    fill: #cf968f;
  }

  .cls-9 {
    fill: #82aa87;
  }

  .cls-4 {
    stroke: #9f9e9c;
  }

  .cls-10 {
    fill: #e4d2a4;
  }

  .cls-11 {
    fill: #374757;
  }

  .cls-12 {
    fill: #ceb460;
  }

  .cls-13 {
    fill: #dccbb7;
  }

  .cls-14 {
    fill: #deca8d;
  }

  .cls-15 {
    fill: #325557;
  }

  .cls-16 {
    fill: #6a4a3f;
  }

  .cls-17 {
    fill: #313445;
  }

  .cls-18 {
    fill: #2f3943;
  }

  .cls-19 {
    fill: #d3c793;
  }

  .cls-20 {
    fill: #e4d8ca;
  }

  .cls-21 {
    fill: #dfd1b7;
  }

  .cls-22 {
    fill: #3b6ab0;
  }

  .cls-5 {
    stroke: #586f7d;
  }

  .cls-23 {
    fill: #456c40;
  }

  .cls-24 {
    fill: #373737;
  }

  .cls-6 {
    stroke: #c3beb8;
  }

  .cls-25 {
    fill: #d2b893;
  }

  .cls-26 {
    fill: #84a2c6;
  }

  .cls-27 {
    fill: #e3dac9;
  }

  .cls-28 {
    fill: #dfd4c2;
  }

  .cls-29 {
    fill: #613f35;
  }

  .cls-30 {
    fill: #495468;
  }

  .cls-31 {
    fill: #7a4639;
  }

  .cls-32 {
    fill: #cac8c9;
  }

  .cls-33 {
    fill: #d7bd9a;
  }

  .cls-7 {
    stroke: #c0beb2;
  }

  .cls-34 {
    fill: #d8d0c3;
  }

  .cls-35 {
    fill: #373739;
  }

  .cls-36 {
    fill: #ded5c4;
  }

  .cls-37 {
    fill: #824437;
  }

  .cls-38 {
    fill: #384766;
  }

  .cls-39 {
    fill: #343434;
  }

  .cls-40 {
    fill: #d4a093;
  }

  .cls-41 {
    fill: #956a37;
  }

  .cls-42 {
    fill: #b6b8c7;
  }`


const blend_modes = [
  'normal', 'multiply', 'screen', 'overlay', 'soft-light', 'hard- light', 'color-dodge', 'color-burn', 'darken', 'lighten', 'difference', 'exclusion', 'hue', 'saturation', 'luminosity', 'color', 'add', 'subtract', 'average', 'pin-light', 'negation', 'source-over', 'source-in', 'source-out', 'source-atop', 'destination-over', 'destination-in', 'destination-out', 'destination-atop', 'lighter', 'darker', 'copy', 'xor'
]

var config = {
    vibrate: false,
    rotate: false,
    anneal_speed: 0.2,
    current_blend_idx: 1,
    smooth: false
}

var right_polygons_c = [];
var left_polygons_c = [];
var top_polygons_c = [];
var all_polygons_c = [];

var right_polygons = [];
var left_polygons = [];
var top_polygons = [];
var all_polygons = [];

window.onload = function() {
    paper.setup('myCanvas');

    // bg triangle
    let p0 = ssvg(`<rect class="cls-1" y="2.94" width="800.32" height="802.1"/>`)
    let p1 = ssvg(`<polygon class="cls-32" points="309.72 22.63 130.23 710.56 685.36 577.97 309.72 22.63"/>`)

    // BOTTOM RIGHT
    let p2 = ssvg(`<polygon class="cls-24" points="508.77 600.12 503.18 664.37 607.81 674.02 615.18 612.31 508.77 600.12"/>`)
    let p20 = ssvg(`<polygon class="cls-12" points="500.04 443.61 515.27 481.45 660.8 421.01 644.54 384.94 500.04 443.61"/>`)
    let p21 = ssvg(`<polygon class="cls-16" points="572.16 470.79 574.45 494.15 618.13 489.58 614.58 464.94 572.16 470.79"/>`)
    let p22 = ssvg(`<polygon class="cls-28" points="469.75 593.14 467.46 625.39 500.35 627.29 503.18 596.69 469.75 593.14"/>`)
    let p23 = ssvg(`<polygon class="cls-21" points="451.02 509.9 441.31 590.09 681.11 618.28 691.02 540.75 451.02 509.9"/>`)
    let p24 = ssvg(`<path class="cls-18" d="M573.78,495.42l-83.05,4.86c30.48,25.66,58.92,24.75,83.05-4.86"/>`)
    let p25 = ssvg(`<polygon class="cls-25" points="578.74 526.32 578.74 515.61 684.26 527.14 684.26 539.88 578.74 526.32"/>`)
    let p26 = ssvg(`<polygon class="cls-10" points="643.21 505.61 641.3 522.44 659.4 524.42 660.07 506.85 643.21 505.61"/>`)
    let p27 = ssvg(`<polygon class="cls-26" points="399.62 721.74 400.89 729.48 691.02 676.91 689.27 668.91 399.62 721.74"/>`)
    let p28 = ssvg(`<polygon class="cls-9" points="485.32 714.19 486.42 720.53 590.61 702.25 589.42 695.32 485.32 714.19"/>`)
    let p29 = ssvg(`<polygon class="cls-23" points="634.99 745.48 643.94 758.06 696.32 720.53 687.18 707.93 634.99 745.48"/>`)
    let p30 = ssvg(`<polygon class="cls-37" points="637.46 629.29 682.61 760.53 689.84 758.06 645.08 626.44 637.46 629.29"/>`)
    let p31 = ssvg(`<polygon class="cls-42" points="521.4 684.02 520 689.23 533.34 691.64 534.48 685.29 521.4 684.02"/>`)
    let p34 = ssvg(`<polygon class="cls-13" points="550.48 735.33 549.34 739.01 567.62 742.31 568.89 737.99 550.48 735.33"/>`)
    let p35 = ssvg(`<polygon class="cls-13" points="533.84 749.29 533.84 754.12 585.27 763.14 585.27 758.44 533.84 749.29"/>`)
    let p36 = ssvg(`<polygon class="cls-13" points="550.48 760.88 549.88 764.63 557.43 766.21 558.64 761.52 550.48 760.88"/>`)
    let p37 = ssvg(`<polygon class="cls-13" points="549.88 770.79 549.34 774.28 554.77 775.17 554.77 771.67 549.88 770.79"/>`)
    right_polygons = [p2, p20, p21, p22, p23, p24, p25, p26, p27, p28, p29, p30, p31, p34, p35, p36, p37]

    // BOTTOM LEFT
    let p3 = ssvg(`<polygon class="cls-24" points="122.61 735.1 145.46 755.42 195.88 694.21 174.04 673.9 122.61 735.1"/>`)
    let p4 = ssvg(`<polygon class="cls-40" points="124.13 529.45 137.46 554.98 152.89 544.69 138.51 519.55 124.13 529.45"/>`)
    let p8 = ssvg(`<polygon class="cls-41" points="298.14 133.25 313.27 166.02 372.13 140.5 355.51 106.11 298.14 133.25"/>`)
    let p11 = ssvg(`<polygon class="cls-8" points="465 114.47 442.74 187.93 454.24 191.72 476.64 117.64 465 114.47"/>`)
    let p38 = ssvg(`<polygon class="cls-15" points="214.51 695.1 205.43 709.71 209.97 712.63 219.97 697.58 214.51 695.1"/>`)
    let p39 = ssvg(`<polygon class="cls-15" points="240.86 691.17 221.5 723.55 227.15 727.04 247.08 696.18 240.86 691.17"/>`)
    let p40 = ssvg(`<polygon class="cls-27" points="115.24 515.55 146.86 576.12 138.51 580.69 108.86 519.93 115.24 515.55"/>`)
    let p41 = ssvg(`<polygon class="cls-34" points="122 602.88 126.29 608.88 276.96 494.5 270.67 488.79 122 602.88"/>`)
    let p42 = ssvg(`<polygon class="cls-34" points="149.27 591.43 192.96 644.41 199.48 639.07 154.79 587.24 149.27 591.43"/>`)
    let p43 = ssvg(`<polygon class="cls-34" points="199.48 553.32 203.81 558.88 269.15 510.88 263.94 504.39 199.48 553.32"/>`)
    left_polygons = [p3, p4, p8, p11, p38, p39, p40, p41, p42, p43]

    // TOP
    let p5 = ssvg(`<polygon class="cls-39" points="291.75 186.6 310.8 251.93 401.84 222.21 382.04 157.64 291.75 186.6"/>`)
    let p6 = ssvg(`<polygon class="cls-20" points="224.13 125.07 240.51 160.5 391.94 88.88 372.13 50.02 224.13 125.07"/>`)
    let p7 = ssvg(`<polygon class="cls-38" points="247.37 71.36 267.94 101.26 297.65 80.5 277.46 50.02 247.37 71.36"/>`)
    let p9 = ssvg(`<polygon class="cls-30" points="349.3 150.4 352.13 159.36 363.56 154.88 360.55 145.52 349.3 150.4"/>`)
    let p10 = ssvg(`<polygon class="cls-14" points="464.83 86.21 420.26 229.64 429.4 231.93 472.64 89.26 464.83 86.21"/>`)
    let p12 = ssvg(`<polygon class="cls-33" points="336.22 243.63 340.92 255.93 373.97 245.55 369.16 232.88 336.22 243.63"/>`)
    let p13 = ssvg(`<polygon class="cls-36" points="349.02 264.02 350.35 267.17 400.32 249.17 399.46 246.01 349.02 264.02"/>`)
    let p14 = ssvg(`<circle class="cls-2" cx="390.97" cy="287.88" r="5.1"/>`)
    let p15 = ssvg(`<polygon class="cls-11" points="391.59 305.55 393.31 309.17 404.26 304.02 401.59 300.6 391.59 305.55"/>`)
    let p16 = ssvg(`<polygon class="cls-11" points="386.54 320.41 388.54 324.02 416.83 308.69 415.5 305.45 386.54 320.41"/>`)
    let p17 = ssvg(`<polygon class="cls-19" points="539.02 75.87 492.26 193.45 498.38 196.63 545.88 78.15 539.02 75.87"/>`)
    let p18 = ssvg(`<polygon class="cls-35" points="520.61 162.47 507.91 193.07 529.37 202.09 542.32 170.47 520.61 162.47"/>`)
    let p19 = ssvg(`<circle class="cls-17" cx="568.48" cy="193.45" r="22.6"/>`)
    let p50 = ssvg(`<polygon class="cls-31" points="357.5 258.69 367.69 291.45 373.31 289.74 362.35 257.45 357.5 258.69"/>`)
    let p51 = ssvg(`<polygon class="cls-31" points="342.54 282.79 343.69 286.5 383.5 272.69 381.59 268.31 342.54 282.79"/>`)
    let p52 = ssvg(`<polygon class="cls-22" points="413.27 93.83 399.18 202.09 492.26 158.66 413.27 93.83"/>`)
    let p53 = ssvg(`<polygon class="cls-29" points="317.84 126.05 322.67 135.31 468.7 60.85 464.27 52.36 317.84 126.05"/>`)
    top_polygons = [p5, p6, p7, p9, p10, p12, p13, p14, p15, p16, p17, p18, p19, p50, p51, p52, p53]
    
    all_polygons = right_polygons.concat(left_polygons).concat(top_polygons)

    // make deep copy
    for (let i=0;i<all_polygons.length;i++) {
        all_polygons_c.push(all_polygons[i].clone())
        all_polygons_c[i].opacity = 0
    }

    // ALL LINES
    // bottom crossed lines
    let p44 = ssvg(`<line class="cls-3" x1="370.48" y1="666.12" x2="379.05" y2="703.45"/>`)
    p44.strokeColor = "#b5b4b9"
    let p45 = ssvg(`<line class="cls-3" x1="360" y1="681.74" x2="382.1" y2="675.64"/>`)
    p45.strokeColor = "#b5b4b9"

    // bottom right lines
    let p32 = ssvg(`<line class="cls-4" x1="513.53" y1="758.44" x2="528.51" y2="679.83"/>`)
    p32.strokeColor = "#9f9e9c"
    let p33 = ssvg(`<line class="cls-7" x1="550.48" y1="783.07" x2="560.26" y2="723.01"/>`)
    p33.strokeColor = "#9f9e9c"

    // right side line + curve
    let p46 = ssvg(`<line class="cls-5" x1="616.13" y1="252.47" x2="633.15" y2="254.25"/>`)
    p46.strokeColor = "#90a4ad"
    let p47 = ssvg(`<path class="cls-5" d="M633.15,227.33c-13.58,23.03-14.39,52.08,12.83,94.35"/>`)
    p47.strokeColor = "#90a4ad"

    // top lines
    let p48 = ssvg(`<line class="cls-6" x1="233.72" y1="16.34" x2="258.48" y2="50.02"/>`)
    p48.strokeColor = "#c3beb8"
    let p49 = ssvg(`<line class="cls-6" x1="254.48" y1="23.58" x2="230.48" y2="42.82"/>`)
    p49.strokeColor = "#c3beb8"

    view.draw();
    view.onFrame = update

    var tool = new Tool();

    // Define a mousedown and mousedrag handler
    tool.onMouseDown = function(event) {
        // erm
    }

    tool.onMouseDrag = function(event) {
        // console.log(event.point)
        const THRESHOLD = 50
        let point = event.point
        for (let i=0;i<all_polygons.length;i++) {

            let p = all_polygons[i]
            if (p.segments) {
                let temp_p = new Path(p.segments)
                let nearest_point = temp_p.getNearestPoint(point)
                let dist = point.getDistance(nearest_point)
                if (dist < THRESHOLD) {
                    // console.log(p)
                    let dx = (nearest_point.x - point.x) * (THRESHOLD-dist)/THRESHOLD
                    let dy = (nearest_point.y - point.y )  * (THRESHOLD-dist)/THRESHOLD

                    p.position = p.position.add(new Point(-dx,-dy))
                }
            }
        }
    }
    
    tool.onKeyDown = function(event) {
        switch(event.key) {
            case 'v': // TOGGLE VIBRATE
                config.vibrate = !config.vibrate
                break 
            case 'r':
                config.rotate = !config.rotate
                break
            case 's':
                if (!config.smooth) {
                  config.smooth = true
                  for (let i=0;i<all_polygons.length;i++) {
                    all_polygons[i].smooth() // irreversible
                  }
                } else {
                  console.log("unsmooth")
                  for (let i=0;i<all_polygons.length;i++) {
                    all_polygons[i] = all_polygons_c[i].clone()
                  }
                }
                break
            case 'q': // RESET
                reset_polys();
                break
            case 'space':
                contract()
                break
            case 'b':
                blend()
                break
        }
    }
}

function contract() {
  for (let i=0;i<all_polygons.length;i++) {
      let p = all_polygons[i]
      p.position = new Point(400+(Math.random()-0.5)*100,400+(Math.random()-0.5)*100)
  }
}

function blend() {
  config.current_blend_idx = (config.current_blend_idx + 1) % blend_modes.length
  for (let i=0;i<all_polygons.length;i++) {
    let p = all_polygons[i]
    p.blendMode = blend_modes[config.current_blend_idx]
  }
}

function cop(c) {
    return JSON.parse(JSON.stringify(c))
}

function reset_polys() {
    for (let i=0;i<all_polygons.length;i++) {
        let p = all_polygons[i]
        p.position = all_polygons_c[i].clone().position
    }
}

function update(event) {
    // vibrate
    if (config.vibrate) {
        for (let i=0;i<all_polygons.length;i++) {
            let p = all_polygons[i]
            p.position = p.position.add(new Point(Math.random()-0.5, Math.random()-0.5))
        }
    }

    // rotate
    if (config.rotate) {
        for (let i=0;i<all_polygons.length;i++) {
            let p = all_polygons[i]
            p.rotate((Math.random())/20)
        }
    }

    // try to go back to home base
    for (let i=0;i<all_polygons.length;i++) {
        let p = all_polygons[i]
        if (Math.random() < config.anneal_speed/9) {
            let old_position = all_polygons_c[i].position

            dx = (old_position.x - p.position.x) * config.anneal_speed
            dy = (old_position.y - p.position.y) * config.anneal_speed
            if (dx < 1 && dx > -1) {
                dx = old_position.x - p.position.x
            } 
            if (dy < 1 && dy > -1) {
                dy = old_position.y - p.position.y
            }

            p.position = p.position.add(new Point(dx,dy))
        }
    }
}

function ssvg(svg) {
    let path = project.importSVG(svg)

    let cls_start = svg.indexOf("class") + 7 // start of class name
    let cls_end = svg.indexOf("\"", cls_start)
    let cls = svg.substring(cls_start, cls_end)

    let style_start = style_string.indexOf(cls)
    let style_end = style_string.indexOf("}", style_start)
    let style_substring = style_string.substring(style_start, style_end)

    let fill_start = style_substring.indexOf("fill")
    if (fill_start != -1) {
        fill_start = fill_start + 6
        let fill_end = style_substring.indexOf(";", fill_start)
        let color = style_substring.substring(fill_start, fill_end)
        if (color != "none") {
            path.fillColor = color
            path.strokeColor = null
        }
    }

    path.blendMode = "multiply"

    return path
}