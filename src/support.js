const days = 'days';
const weeks = 'weeks';
const months = 'months';

const getLogDate = () => {
  const date = new Date();
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
};
const nanosecondsInASecond = 1e9;
const nanosecondsInAMillisecond = 1e6;
const monthInDays = 30;
const weekInDays = 7;
const bestCaseInfectionsMultiplier = 10;
const worstCaseInfectionsMultiplier = 50;

const getImpactCurrentlyInfected = (reportedCases) => reportedCases * bestCaseInfectionsMultiplier;
const getSevereCurrentlyInfected = (reportedCases) => reportedCases * worstCaseInfectionsMultiplier;
const getNormalizedPeriod = (timeToElapse, periodType = days) => {
  switch (periodType) {
    case months:
      return timeToElapse * monthInDays;
    case weeks:
      return timeToElapse * weekInDays;
    default:
      return timeToElapse;
  }
};

const getInfectionsByRequestedTime = (currentlyInfected, period) => {
  const factor = Math.trunc(period / 3);
  return currentlyInfected * (2 ** factor);
};

const getSevereCasesCount = (numberOfInfections) => Math.trunc(numberOfInfections * 0.15);
const getRemainingHospitalBedsCount = (
  numberOfSevereCases,
  totalBeds
) => {
  const availableBeds = totalBeds * 0.35;
  return Math.trunc(availableBeds - numberOfSevereCases);
};

const getCasesForICUCount = (numberOfInfections) => Math.trunc(numberOfInfections * 0.05);
const getCasesForVentilatorsCount = (numberOfInfections) => Math.trunc(numberOfInfections * 0.02);
const getDollarsInFlight = (
  numberOfInfections,
  avgIncomePopulationPercentage,
  avgDailyIncome,
  period
) => {
  const result = (numberOfInfections * avgIncomePopulationPercentage * avgDailyIncome) / period;
  return Math.trunc(result);
};

const support = {
  nanosecondsInASecond,
  nanosecondsInAMillisecond,
  getLogDate,
  getImpactCurrentlyInfected,
  getSevereCurrentlyInfected,
  getNormalizedPeriod,
  getInfectionsByRequestedTime,
  getSevereCasesCount,
  getRemainingHospitalBedsCount,
  getCasesForICUCount,
  getCasesForVentilatorsCount,
  getDollarsInFlight
};

export default support;
