// constants
const canvas_sidelen = 800
const center_x = canvas_sidelen / 2 + 40
const center_y = canvas_sidelen / 2 + 150
const num_points = 24

// input elements
let checkbox_ab;
let checkbox_manualtime;
let slider_a;
let slider_b;
let input_a;
let input_b;
let slider_t;

// state variables
var playing_animation = false
var points = []; // what "time" each point is at
var noise_magnitude = 2/450
var animation_time = 0
var add_noise = true

function setupUI() {
    textFont('Verdana');
    textSize(20);
    slider_a = createSlider(0, 5, 3, 0);
    slider_a.position(70, 75);
    slider_b = createSlider(0, 5, 2, 0);
    slider_b.position(70, 115);

    slider_t = createSlider(1, 15, 2, 1);
    slider_t.position(115, 275);

    checkbox_ab = createCheckbox();
    checkbox_ab.position(45, 34);

    input_a = createInput('');
    input_a.position(70, 155);
    input_b = createInput('');
    input_b.position(70, 195);

    let button = createButton('whitney');
    button.position(45, 315);

    button.mouseReleased(() => {
        if (!playing_animation) {
            animation_time = 0
            playing_animation = true
        }
    })
}

function setup() {
    createCanvas(canvas_sidelen, canvas_sidelen);
    fill(255);
    noStroke()
    setupUI();
    filter(ERODE);

    // start the points off evenly spaced
    resetPoints()
}

function drawUI() {
    text("use a/b text boxes", 75, 50);
    text("a", 50, 90);
    text("b", 50, 130);
    text("a", 50, 170);
    text("b", 50, 210);
    var a = slider_a.value();
    var b = slider_b.value();
    text(Math.round(a * 1000) / 1000, 220, 90);
    text(Math.round(b * 1000) / 1000, 220, 130);

    text("speed", 50, 290);
    let d_t = slider_t.value()
    text(d_t, 255, 290);

    if (checkbox_ab.checked()) {
        a = input_a.value()
        b = input_b.value()
    }

    if (playing_animation) {
        text("playing...", 140, 342);
    } else {
        text("not playing", 140, 342);
    }

    return [a, b, d_t]
}

// the max and min speeds we're ramping between
max_speed_delta = 10 / 450
min_speed_delta = .00005
middle_speed_delta = 2/450
growth_rate = 1.5

// stages
let stages = [0, 12, 24, 36, 44]

// add random noise to the point's speeds?
// (time, time_midpoint, growth_rate, min_value, max_value)
function logisticDecay(x, x0, k, min_value, L) {
    return L - L / (1 + Math.exp(-k * (x - x0))) + min_value;
}

function logisticGrowth(x, x0, k, min_value, L) {
    return L / (1 + Math.exp(-k * (x - x0))) + min_value;
}

function resetPoints() {
    points[0] = 0
    for (let i = 1; i < num_points; i++) {
        points[i] = points[i - 1] + (2 * PI) / num_points
    }
}

// a logistic "dip" (like a bowl) between startTime and endTime. 0 everywhere else
function logisticDip(t, startTime, endTime, k, min_value, max_value) {
    let totalTime = endTime - startTime;
    let midpoint_time = startTime + totalTime / 2
    if (t >= startTime && t <= midpoint_time) {
        return logisticDecay(t - startTime, totalTime / 4, k, min_value, max_value)
    } else if (t > midpoint_time && t <= endTime) {
        return logisticGrowth(t - midpoint_time, totalTime / 4, k, min_value, max_value)
    }
    return 0
}

function calculateIndividualDTime(idx, num_intervals) {
    let speed_delta_delta = middle_speed_delta - min_speed_delta
    mod_result = (idx+1) % num_intervals
    mod_fraction = (mod_result+1) / num_intervals // ranges from 1/num_intervals to 1
    return middle_speed_delta - mod_fraction * speed_delta_delta
}

function calculateDTimeArray() {

    deltas = new Array(num_points).fill(0)

    for(let i=0;i<num_points;i++) {
        min_speed_delta_2 = calculateIndividualDTime(i, 2)
        min_speed_delta_3 = calculateIndividualDTime(i, 3)
        min_speed_delta_4 = calculateIndividualDTime(i, 2)

        deltas[i] += logisticDip(animation_time, stages[0], stages[1], growth_rate + mod_fraction, min_speed_delta_2, max_speed_delta)
        deltas[i] += logisticDip(animation_time, stages[1], stages[2], growth_rate + mod_fraction, min_speed_delta_3, max_speed_delta)
        deltas[i] += logisticDip(animation_time, stages[2], stages[3], growth_rate + mod_fraction, min_speed_delta_4, max_speed_delta)
    }

    return deltas
}

function draw() {
    if (animation_time > stages[3]) {
        playing_animation = false
        animation_time = 0
        resetPoints()
    }

    if (playing_animation) {
        background(0)
    } else {
        background(34, 34, 34)
    }
    fill(255);

    if (playing_animation) animation_time += 1 / 60

    const [a, b, d_t] = drawUI()
    // groups of 2, 3, and 4
    // periodically increases then decreases members of each group
    // need to keep track of each of the 24 point's "time"
    // then apply a different amount of time differential to each of them
    // this amount depends on what mod group i'm currently in

    d_t_array = new Array(num_points).fill(d_t / 450)
    if (playing_animation) {
        d_t_array = calculateDTimeArray()
    }

    for (i = 0; i < num_points; i++) {
        x = 160 * sin(a * points[i] + PI / 2);
        y = 160 * sin(b * points[i]);

        fill(255);

        ellipse(center_x + x, center_y + y, 12, 12);
        points[i] += d_t_array[i];
        if (add_noise) {
            points[i] += Math.random() * 0.2 * d_t_array[i]
        }
    }
}