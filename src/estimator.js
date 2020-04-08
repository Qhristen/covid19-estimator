const covid19ImpactEstimator = (data) => {
    const impact = {
        currentlyInfected: data.reportedCases * 10,
        infectionsByRequestedTime: currentlyInfected * 1024
    };

    const  severImpact = {
        currentlyInfected: data.reportedCases * 50,
        infectionsByRequestedTime: currentlyInfected * 1024
    };

  return {
    data: data,
    impact,
    severImpact
  };
};


export default covid19ImpactEstimator;
