const MILLISECONDS_PER_HOUR = 1000 * 60 * 60;
const MILLISECONDS_PER_DAY = MILLISECONDS_PER_HOUR * 24;
const POWER_INDEX_GOOD = 1.4;
const POWER_INDEX_EASY = 1.6;

export const getMemoInfo = (difficulty, prevRepetitions) => {
    const currentDateStamp = Date.now();
    const result = {
        repetitions: prevRepetitions ? prevRepetitions + 1 : 1,
        prevRepetitionDate: currentDateStamp,
        nextRepetitionDate: currentDateStamp,
    };

    switch (difficulty) {
    case 2: {
        result.nextRepetitionDate = currentDateStamp + MILLISECONDS_PER_DAY;
        break;
    }
    case 1: {
        result.nextRepetitionDate = currentDateStamp
            + MILLISECONDS_PER_DAY * Math.ceil(result.repetitions ** POWER_INDEX_GOOD);
        break;
    }
    case 0: {
        result.nextRepetitionDate = currentDateStamp
            + MILLISECONDS_PER_DAY * Math.ceil(
                result.repetitions ** POWER_INDEX_EASY + result.repetitions,
            );
        break;
    }
    default: result.nextRepetitionDate = currentDateStamp;
    }

    if (result.repetitions === 1) {
        result.nextRepetitionDate = currentDateStamp + MILLISECONDS_PER_HOUR;
    }

    if (result.nextRepetitionDate > currentDateStamp + 90 * MILLISECONDS_PER_DAY) {
        result.nextRepetitionDate = currentDateStamp + 90 * MILLISECONDS_PER_DAY;
    }

    return result;
};

export const getMemoInfoMiniGames = (isCorrect, prevRepetitions, nextDate) => {
    const currentDateStamp = Date.now();
    const dateCheckpoint = nextDate > currentDateStamp ? nextDate : currentDateStamp;

    const resultedRepeats = prevRepetitions ? prevRepetitions + 1 : 1;
    const resultedNextDate = isCorrect
        ? dateCheckpoint + MILLISECONDS_PER_DAY * Math.ceil(resultedRepeats ** POWER_INDEX_GOOD)
        : currentDateStamp;

    const result = {
        repetitions: resultedRepeats,
        prevRepetitionDate: currentDateStamp,
        nextRepetitionDate: resultedNextDate,
    };

    if (result.nextRepetitionDate > currentDateStamp + 90 * MILLISECONDS_PER_DAY) {
        result.nextRepetitionDate = currentDateStamp + 90 * MILLISECONDS_PER_DAY;
    }

    return result;
};
