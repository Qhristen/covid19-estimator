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
    data: input,
    impact: {},
    severeImpact: {}
  };
  const { impact, severeImpact } = OutPutResult;
  const period = getNormalizedPeriod(input.timeToElapse, input.periodType);


  impact.currentlyInfected = getImpactCurrentlyInfected(input.reportedCases);
  severeImpact.currentlyInfected = getSevereCurrentlyInfected(input.reportedCases);
  impact.infectionsByRequestedTime = getInfectionsByRequestedTime(
    impact.currentlyInfected,
    period
  );

  severeImpact.infectionsByRequestedTime = getInfectionsByRequestedTime(
    severeImpact.currentlyInfected,
    period
  );

  impact.severeCasesByRequestedTime = getSevereCasesCount(
    impact.infectionsByRequestedTime
  );

  severeImpact.severeCasesByRequestedTime = getSevereCasesCount(
    severeImpact.infectionsByRequestedTime
  );

  impact.hospitalBedsByRequestedTime = getRemainingHospitalBedsCount(
    impact.severeCasesByRequestedTime,
    input.totalHospitalBeds
  );

  severeImpact.hospitalBedsByRequestedTime = getRemainingHospitalBedsCount(
    severeImpact.severeCasesByRequestedTime,
    input.totalHospitalBeds
  );

  impact.casesForICUByRequestedTime = getCasesForICUCount(
    impact.infectionsByRequestedTime
  );

  severeImpact.casesForICUByRequestedTime = getCasesForICUCount(
    severeImpact.infectionsByRequestedTime
  );

  impact.casesForVentilatorsByRequestedTime = getCasesForVentilatorsCount(
    impact.infectionsByRequestedTime
  );

  severeImpact.casesForVentilatorsByRequestedTime = getCasesForVentilatorsCount(
    severeImpact.infectionsByRequestedTime
  );

  impact.dollarsInFlight = getDollarsInFlight(
    impact.infectionsByRequestedTime,
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
