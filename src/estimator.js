const convertToDays = (period, timeToElapse) => {
  switch (period) {
    case 'days':
      return timeToElapse;
    case 'week':
      return (7 * timeToElapse);
    case 'months':
      return (30 * timeToElapse);
    default:
      break;
  }
  return null;
};

const getImpact = (data) => {
  const
    {
      periodType, timeToElapse, reportedCases, totalHospitalBeds, region
    } = data;
  const currentlyInfected = reportedCases * 10;
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
