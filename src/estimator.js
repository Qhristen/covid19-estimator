const convertToDays = (period, timeToElapse, currentlyInfected) => {
  let days = period;
  switch (period) {
    case 'week':
      days = (7 * timeToElapse);
      break;
    case 'months':
      days = (30 * 7 * timeToElapse);
      break;
    default:
      break;
  }
  const setThreeDays = Math.floor(days / 3);
  const infectionsByRequestedTime = currentlyInfected * (2 ** setThreeDays);
  return infectionsByRequestedTime;
};

const getImpact = (data) => {
  const
    {
      periodType, timeToElapse, reportedCases, totalHospitalBeds, region
    } = data;
  const currentlyInfected = reportedCases * 10;
  const timeInDays = convertToDays(periodType, timeToElapse, currentlyInfected);
  const infectionsByRequestedTime = currentlyInfected * (2 ** Math.floor(timeInDays / 3));
  const severeCasesByRequestedTime = Math.floor(infectionsByRequestedTime * 0.15);
  const hospitalBedsAvailabe = Math.floor(totalHospitalBeds * 0.35);
  const hospitalBedsRequestedTime = hospitalBedsAvailabe - severeCasesByRequestedTime;
  const caseForICUByRequestedTime = Math.floor(infectionsByRequestedTime * 0.5);
  const caseForVentilatorByRequestTime = Math.floor(infectionsByRequestedTime * 0.02);
  const dollarOut = region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD * timeInDays;
  const toTwoDecimal = dollarOut.toFixed(2);
  const dollarInFlight = Number(toTwoDecimal);
  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsRequestedTime,
    caseForICUByRequestedTime,
    caseForVentilatorByRequestTime,
    dollarInFlight
  };
};

const getSevereImpact = (data) => {
  const {
    periodType, timeToElapse, reportedCases, totalHospitalBeds, region
  } = data;
  const currentlyInfected = reportedCases * 50;
  const timeInDays = convertToDays(periodType, timeToElapse);
  const infectionsByRequestedTime = currentlyInfected * (2 ** Math.floor(timeInDays / 3));
  const severeCasesByRequestedTime = Math.floor(infectionsByRequestedTime * 0.15);
  const hospitalBedsAvailabe = Math.floor(totalHospitalBeds * 0.35);
  const hospitalBedsRequestedTime = hospitalBedsAvailabe - severeCasesByRequestedTime;
  const caseForICUByRequestedTime = Math.floor(infectionsByRequestedTime * 0.5);
  const caseForVentilatorByRequestTime = Math.floor(infectionsByRequestedTime * 0.02);
  const dollarOut = region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD * timeInDays;
  const toTwoDecimal = dollarOut.toFixed(2);
  const dollarInFlight = Number(toTwoDecimal);
  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsRequestedTime,
    caseForICUByRequestedTime,
    caseForVentilatorByRequestTime,
    dollarInFlight
  };
};

const covid19ImpactEstimator = (data) => {
  const input = data;
  return {
    data: input,
    impact: getImpact(input),
    severeImpact: getSevereImpact(input)
  };
};
export default covid19ImpactEstimator;
