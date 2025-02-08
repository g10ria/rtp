// CONSTANTS!!!
const canvas_sidelen = 1050
const padding = 50
const num_big_squares = 35

const min_stripeblocks_per_square = 2
const max_stripeblocks_per_square = 7

// using generator pattern :)
let stripeblock_masks = (idx) => { return masks[Object.keys(masks)[idx]]; }

const stripeblock_masks_probabilities = [1, 1, 1, 1, 0.2, 0.2, 0.2, 0.2] // corresponding to shape functions at the bottom
const stripeblock_densities_probabilities = [1.5, 1, 0.1, 0.1] // corresponding to per 1, 2, 3, 4
const stripeblock_colors_probabilities = [1,1.6,0.8,1.4,0.5,0.9] // corresponding to colors below
const num_stripeblock_probabilities = [0.2, 0.5, 0.5, 1, 1, 1, 1, 1] // corresponding to 2, 3, 4, 5, 6, 7

// tweak opacities
const stripeblock_colorslist = [
  "rgba(220,133,133,0.6)",
  "rgba(90, 211, 189, 0.4)",
  "rgba(64, 79, 139, 0.65)",
  "rgba(110,163,193,0.6)",
  "rgba(232, 65, 36, 0.4)",
 "rgba(238, 72, 21, 0.5)"]

const stripeblock_colors = () => {
  return stripeblock_colorslist[weighted_random(stripeblock_colors_probabilities)]
}

function setup() {
  createCanvas(canvas_sidelen+2*padding, canvas_sidelen+2*padding);
  randomSeed(0)
} // every 2x2 square is 40px x 40px

function drawBigSquare(x,y, sidelen) {
  // sample number of stripeblocks to draw
  let num_stripeblocks = weighted_random(num_stripeblock_probabilities) + 2

  drawn_idx_combos = []
  for(let i=0;i<num_stripeblocks;i++) {
    push(); // sample and apply a random clipping mask
    let mask_idx = weighted_random(stripeblock_masks_probabilities)
    clip(() => { stripeblock_masks(mask_idx)(x,y, sidelen) });

    let slope = random(sample_allowed_stripe_slope(mask_idx))
    stroke(stripeblock_colors())

    // some magic numbers to make the lines spaced evenly
    // and to draw enough lines to cover the whole square
    start_multiplier = 1
    increment = 2
    if (abs(slope) > 1) {
      start_multiplier = 1
      increment = 3
    } else if (abs(slope) < 1) {
      start_multiplier = 2
      increment = 4
    }

    density_constant = weighted_random(stripeblock_densities_probabilities) + 1

    // don't redraw the same exact things over each other
    for (const combo in drawn_idx_combos) {
      if (combo[0] == mask_idx && combo[1] == density_constant) continue
    }

    x_s = x-sidelen/2
    x_f = x+sidelen/2
    let idx = 1 // for density
    for(let x_i = x_s - start_multiplier * sidelen; x_i <= x_f; x_i+=increment) {
      y_start = slope < 0 ? y-sidelen/2 : y+sidelen/2
      if (idx % density_constant == 0) line(x_i, y_start, x_i + start_multiplier * sidelen, y_start - slope * start_multiplier * sidelen)
      idx++
    }

    pop(); // pops clipping mask
  }
}

function draw() {
  background(234,232,229);
  strokeWeight(1);
  rectMode(CENTER)

  let sidelen = canvas_sidelen/num_big_squares
  let draw_sidelen = sidelen + 1 // debug

  for(let i=0;i<num_big_squares;i++) {
    for(let j=0;j<num_big_squares;j++) {
      drawBigSquare(i*sidelen+sidelen/2 + padding,j*sidelen+sidelen/2 + padding, draw_sidelen);
    }
  }

  noLoop()
}

// weighted random func that returns index
function weighted_random(weights) {
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  const randomNum = Math.random() * totalWeight;
  let cumulativeWeight = 0;

  for (let i = 0; i < weights.length; i++) {
    cumulativeWeight += weights[i];
    if (randomNum < cumulativeWeight) {
      return i
    }
  }

  return null;
}

function sample_allowed_stripe_slope(mask_idx) {
  if (mask_idx >= 4) {
    return [-1, 1]
  }
  return [-0.5, 0.5, 2, -2]
}

// stripeblock mask functions
let masks = {
  bottom_half: (x,y,sidelen) => {
    rect(x, y+sidelen/4, sidelen, sidelen/2)
  },
  top_half: (x,y,sidelen) =>  {
    rect(x, y-sidelen/4, sidelen, sidelen/2)
  },
  left_half: (x,y,sidelen) =>  {
    rect(x-sidelen/4, y, sidelen/2, sidelen)
  },
  right_half: (x,y,sidelen) =>  {
    rect(x+sidelen/4, y, sidelen/2, sidelen)
  },
  bottom_quarter: (x,y,sidelen) =>  {
    triangle(x-sidelen/2, y+sidelen/2, x+sidelen/2, y+sidelen/2, x, y)
  },
  top_quarter: (x,y,sidelen) =>  {
    triangle(x-sidelen/2, y-sidelen/2, x+sidelen/2, y-sidelen/2, x, y)
  },
  left_quarter: (x,y,sidelen) =>  {
    triangle(x-sidelen/2, y-sidelen/2, x-sidelen/2, y+sidelen/2, x, y)
  },
  right_quarter: (x,y,sidelen) =>  {
    triangle(x+sidelen/2, y+sidelen/2, x+sidelen/2, y-sidelen/2, x, y)
  }
}