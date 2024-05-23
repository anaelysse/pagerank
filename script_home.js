// Define the initial PageRank vector with equal probabilities for each page
let pageRankVector = [1/3, 1/3, 1/3]; // Initial probability vector

// Define the Markov chain transition matrix
const markovMatrix = 
[
    [0.2, 0.4, 0.9],  // Transition probabilities from page 1
    [0.1, 0.3, 0.6],  // Transition probabilities from page 2
    [0.7, 0.8, 0.5]   // Transition probabilities from page 3
];

// Function to perform matrix multiplication
function multiplyMatrix(matrixA, matrixB) {
    let result = [];
    for (let row = 0; row < matrixA.length; row++) {
        result[row] = [];
        for (let column = 0; column < matrixB[0].length; column++) {
            let sum = 0;
            for (let k = 0; k < matrixA[0].length; k++) {
                sum += matrixA[row][k] * matrixB[k][column];
            }
            result[row][column] = sum;
        }
    }
    return result;
}

// Function to perform matrix multiplication n times
function multiplyMatrixNTimes(matrix, n) {
    let result = matrix;
    const matrices = [result]; // Array to store all matrices
    for (let i = 0; i < n - 1; i++) {
        result = multiplyMatrix(result, matrix);
        matrices.push(result); // Save the intermediate matrix
    }
    return matrices;
}

// Define the number of times to multiply the transition matrix
const numSteps = 3;

// Perform matrix multiplication numSteps times and save all matrices
const resultMatrices = multiplyMatrixNTimes(markovMatrix, numSteps);

// Multiply the PageRank vector by each resulting matrix to get the final PageRank for each step
const pageRankVectors = resultMatrices.map(matrix =>
    pageRankVector.map((value, index) => {
        let sum = 0;
        for (let i = 0; i < matrix[index].length; i++) {
            sum += value * matrix[index][i];
        }
        return sum;
    })
);

// Print all the resulting matrices and P
console.log("PageRank vector after", numSteps, "steps:");
console.log(pageRankVectors);