const io = require('console-read-write');

main().then();

async function main() {
    let firstRun = true;
    await greeting();

    while (firstRun || await isUserWantToContinue()) {
        firstRun = false;
        io.write(`
        Choose story that suitable for you and write it number:
        
        1 - I want to know if I am overweight or not, so I can be informed.
        2 - I want to know what my ideal weight is, so I have a target I can work towards.
        3 - I want to trying to lose weight and to know how many calories I should eat everyday, so I can make progress towards my weight goal.
        4 - I want to trying to lose weight and have a timeline in which I can reach my weight goal, so I can make a plan.`);

        await programChooser();
    }

    io.write('Hopefully see you soon!');
}

async function programChooser() {
    let correctProgramChosen = false;

    while (!correctProgramChosen) {
        let programNumber = await io.read();

        if (programNumber === '1') {
            await checkBMI();
            correctProgramChosen = true;
        } else if (programNumber === '2') {
            await checkIdealWeight();
            correctProgramChosen = true;
        } else if (programNumber === '3') {
            await checkNumberOfDailyCalories();
            correctProgramChosen = true;
        } else if (programNumber === '4') {
            await checkTimelineForWeightGoal();
            correctProgramChosen = true;
        } else {
            io.write('Please choose number 1..4');
        }
    }
}

async function greeting() {
    io.write('Hello! What is your name?');
    let userName = await io.read();
    io.write(`Welcome, ${userName}!`);
}

async function checkBMI() {
    const underweightValue = 18.5;
    const overweightValue = 25;

    let userWeight = await getWeight();
    let userHeight = await getHeight();
    let bmi = getBMI(userWeight, userHeight);

    io.write(`Your BMI is ${bmi}.`);

    if (bmi < underweightValue) {
        io.write(`A BMI under ${underweightValue} is considered underweight.`);
    } else if (bmi > overweightValue) {
        io.write(`A BMI above ${overweightValue} is considered overweight.`);
    } else {
        io.write('Congratulations! Your BMI is normal.')
    }
}

async function checkIdealWeight() {
    const perfectBMI = 22.5;

    let userHeight = await getHeight();
    let userIdealWeight = getUserIdealWeight(perfectBMI, userHeight);

    io.write(`On the assumption that perfect BMI is ${perfectBMI} the ideal weight for your height is  ${userIdealWeight}.`);
}

async function checkNumberOfDailyCalories() {
    let userWeight = await getWeight();
    let userHeight = await getHeight();
    let userAge = await getUserAge();

    let numberOfDailyCalories = getNumberOfDailyCalories(userWeight, userHeight, userAge);

    io.write(`With a normal lifestyle you burn ${numberOfDailyCalories} calories a day.`);
}

async function checkTimelineForWeightGoal() {
    const deltaForWeightLoosing = 500;
    let userWeight = await getWeight();
    let userHeight = await getHeight();
    let userAge = await getUserAge();
    let userPerfectWeight = await getUserPerfectWeight();

    let weightDelta = userWeight - userPerfectWeight;
    let numberOfDailyCaloriesToLooseWeight = getNumberOfDailyCalories(userWeight, userHeight, userAge) - deltaForWeightLoosing;

    let numbersOfWeeksToAchieveTheWeightGoal = getNumbersOfWeeks(weightDelta);

    io.write(`If you want to reach your ideal weight of ${userPerfectWeight} kg:`);
    io.write(`Eat ${numberOfDailyCaloriesToLooseWeight} calories a day`);
    io.write(`For ${numbersOfWeeksToAchieveTheWeightGoal} weeks.`);
}

async function isUserWantToContinue() {
    let isAnswerCorrect = false;
    io.write('Do you want to check another program? [y/n]');

    while (!isAnswerCorrect) {
        let answer = await io.read();

        if (answer === 'y' || answer === 'yes' || answer === 'ya' || answer === 'yep' || answer === 'Y' || answer === 'Yes') {
            isAnswerCorrect = true;
            return true;
        } else if (answer === 'n' || answer === 'no' || answer === 'nope' || answer === 'not' || answer === 'N' || answer === 'No') {
            isAnswerCorrect = true;
            return false;
        } else {
            io.write('Please answer if you would like to continue and choose another program [y/n]');
        }
    }
}

async function getWeight() {
    io.write('What is your weight in kilograms?');
    return parseFloat(await io.read());
}

async function getHeight() {
    io.write('What is your height in meters?');
    return parseFloat(await io.read());
}

async function getUserAge() {
    io.write('What is your age in years?');
    return parseInt(await io.read());
}

async function getUserPerfectWeight() {
    io.write('What is weight that you want to achieve in kilograms?');
    return parseFloat(await io.read());
}

function getBMI(userWeight, userHeight) {
    return (userWeight / (userHeight ** 2)).toFixed(2);
}

function getUserIdealWeight(perfectBMI, userHeight) {
    return (perfectBMI * userHeight * userHeight).toFixed(2);
}

function getNumberOfDailyCalories(userWeight, userHeight, userAge) {
    return 10 * userWeight + 6.25 * userHeight * 100 - 5 * userAge;
}

function getNumbersOfWeeks(weightDelta) {
    return weightDelta / 0.5;
}