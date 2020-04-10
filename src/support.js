import fs from 'fs';

const days = 'days';
const weeks = 'weeks';
const months = 'months';

const getLogDate = () => {
  const date = new Date();
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
};
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
  const factor = Math.floor(period / 3);
  return currentlyInfected * (2 ** factor);
};

const getSevereCasesCount = (numberOfInfections) => Math.floor(numberOfInfections * 0.15);
const getRemainingHospitalBedsCount = (
  numberOfSevereCases,
  totalBeds
) => {
  const availableBeds = totalBeds * 0.35;
  return Math.floor(availableBeds - numberOfSevereCases);
};

const getCasesForICUCount = (numberOfInfections) => Math.floor(numberOfInfections * 0.05);
const getCasesForVentilatorsCount = (numberOfInfections) => Math.floor(numberOfInfections * 0.02);
const getDollarsInFlight = (
  numberOfInfections,
  avgIncomePopulationPercentage,
  avgDailyIncome,
  period
) => {
  const result = numberOfInfections * avgIncomePopulationPercentage * avgDailyIncome * period;
  return Number(result.toFixed(2));
};


const toServerLog = (logInput) => {
  const Table = `${logInput}
  `;
  fs.appendFile(`./logs/request-response/${getLogDate()}.txt`, Table, (err) => {
    if (err) throw err;
  });
};

const getDuration = (start) => {
  const duration = process.hrtime(start);
  return (duration[0] * 1e9 + duration[1]) / 1e6;
};
const support = {
  getLogDate,
  getImpactCurrentlyInfected,
  getSevereCurrentlyInfected,
  getNormalizedPeriod,
  getInfectionsByRequestedTime,
  getSevereCasesCount,
  getRemainingHospitalBedsCount,
  getCasesForICUCount,
  getCasesForVentilatorsCount,
  getDollarsInFlight,
  toServerLog,
  getDuration
};

export default support;
