const grid = document.getElementById("grid");
let cells = [];
let weights = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let bias = 0;
let learningRate = 1;

for (let i = 0; i < 9; i++) {
  let cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = i;

  cell.addEventListener("click", function () {
    cell.classList.toggle("on");
  });

  grid.appendChild(cell);
  cells.push(cell);
}

function getInputValues() {
  let values = [];
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].classList.contains("on")) {
      values.push(1);
    } else {
      values.push(0);
    }
  }
  return values;
}

function clearGrid() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove("on");
  }
  document.getElementById("result").textContent = "Results";
}

function activation(sum) {
  if (sum >= 0) {
    return 1;
  } else {
    return 0;
  }
}

function predict(inputs) {
  let sum = bias;
  for (let i = 0; i < inputs.length; i++) {
    sum += inputs[i] * weights[i];
  }
  return activation(sum);
}

function predictShape() {
  let input = getInputValues();
  let output = predict(input);

  if (output === 1) {
    document.getElementById("result").textContent = "Prediction is T";
  } else {
    document.getElementById("result").textContent = "Prediction is L";
  }
}

function trainModel() {
  let trainingData = [];

  for (let i = 0; i < 50; i++) {
    trainingData.push({
      input: makeNoisyT(),
      label: 1
    });
  }

  for (let i = 0; i < 50; i++) {
    trainingData.push({
      input: makeNoisyL(),
      label: 0
    });
  }

  weights = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  bias = 0;

  for (let epoch = 0; epoch < 20; epoch++) {
    for (let i = 0; i < trainingData.length; i++) {
      let x = trainingData[i].input;
      let target = trainingData[i].label;
      let guess = predict(x);
      let error = target - guess;

      for (let j = 0; j < weights.length; j++) {
        weights[j] = weights[j] + learningRate * error * x[j];
      }

      bias = bias + learningRate * error;
    }
  }

  document.getElementById("result").textContent = "Model trained with 100 samples";
  document.getElementById("weights").textContent =
    "Weights: " + JSON.stringify(weights) + "\nBias: " + bias;
}

function makeNoisyT() {
  let t = [
    1, 1, 1,
    0, 1, 0,
    0, 1, 0
  ];

  return addSmallNoise(t);
}

function makeNoisyL() {
  let l = [
    1, 0, 0,
    1, 0, 0,
    1, 1, 1
  ];

  return addSmallNoise(l);
}

function addSmallNoise(arr) {
  let copy = [...arr];
  let randomIndex = Math.floor(Math.random() * 9);

  if (Math.random() < 0.3) {
    if (copy[randomIndex] === 1) {
      copy[randomIndex] = 0;
    } else {
      copy[randomIndex] = 1;
    }
  }

  return copy;
}
