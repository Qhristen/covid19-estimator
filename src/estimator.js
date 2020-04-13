import support from './support';

const {
  getImpactCurrentlyInfected,
  getSevereCurrentlyInfected,
  getNormalizedPeriod,
  getInfectionsByRequestedTime,
  getSevereCasesCount,
  getRemainingHospitalBedsCount,
  getCasesForICUCount,
  getCasesForVentilatorsCount,
  getDollarsInFlight
} = support;

const covid19ImpactEstimator = (data) => {
  const input = data;
  const OutPutResult = {
    impact: {},
    severeImpact: {}
  };

  const period = getNormalizedPeriod(data.timeToElapse, data.periodType);
  OutPutResult.data = input;
  OutPutResult.impact.currentlyInfected = getImpactCurrentlyInfected(data.reportedCases);
  OutPutResult.severeImpact.currentlyInfected = getSevereCurrentlyInfected(data.reportedCases);
  OutPutResult.impact.infectionsByRequestedTime = getInfectionsByRequestedTime(
    OutPutResult.impact.currentlyInfected,
    period
  );

  OutPutResult.severeImpact.infectionsByRequestedTime = getInfectionsByRequestedTime(
    OutPutResult.severeImpact.currentlyInfected,
    period
  );

  OutPutResult.impact.severeCasesByRequestedTime = getSevereCasesCount(
    OutPutResult.impact.infectionsByRequestedTime
  );

  OutPutResult.severeImpact.severeCasesByRequestedTime = getSevereCasesCount(
    OutPutResult.severeImpact.infectionsByRequestedTime
  );

  OutPutResult.impact.hospitalBedsByRequestedTime = getRemainingHospitalBedsCount(
    OutPutResult.impact.severeCasesByRequestedTime,
    data.totalHospitalBeds
  );

  OutPutResult.severeImpact.hospitalBedsByRequestedTime = getRemainingHospitalBedsCount(
    OutPutResult.severeImpact.severeCasesByRequestedTime,
    data.totalHospitalBeds
  );

  OutPutResult.impact.casesForICUByRequestedTime = getCasesForICUCount(
    OutPutResult.impact.infectionsByRequestedTime
  );

  OutPutResult.severeImpact.casesForICUByRequestedTime = getCasesForICUCount(
    OutPutResult.severeImpact.infectionsByRequestedTime
  );

  OutPutResult.impact.casesForVentilatorsByRequestedTime = getCasesForVentilatorsCount(
    OutPutResult.impact.infectionsByRequestedTime
  );

  OutPutResult.severeImpact.casesForVentilatorsByRequestedTime = getCasesForVentilatorsCount(
    OutPutResult.severeImpact.infectionsByRequestedTime
  );

  OutPutResult.impact.dollarsInFlight = getDollarsInFlight(
    OutPutResult.impact.infectionsByRequestedTime,
    input.region.avgDailyIncomePopulation,
    input.region.avgDailyIncomeInUSD,
    period
  );

  OutPutResult.severeImpact.dollarsInFlight = getDollarsInFlight(
    OutPutResult.severeImpact.infectionsByRequestedTime,
    input.region.avgDailyIncomePopulation,
    input.region.avgDailyIncomeInUSD,
    period
  );

  return OutPutResult;
};
export default covid19ImpactEstimator;
