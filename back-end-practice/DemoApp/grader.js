function _average(testScores) {
    const totalScore = testScores.reduce((a, b) => a + b, 0);
    console.log(Math.round(totalScore / testScores.length));
}

let scores = [90, 98, 89, 100, 100, 86, 94];
_average(scores);
