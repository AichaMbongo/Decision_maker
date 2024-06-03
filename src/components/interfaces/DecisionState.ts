import React from 'react'

interface Comparison {
  [option: string]: {
    [otherOption: string]: boolean;
  };
}
export interface Criterion{
  name: string,
  weight: number,
  comparisons: Comparison
}
interface AggregatedPreference {
  [option: string]: number;
}
  

interface DecisionState {
    model: string;
    decision: string;
    criteria: Criterion[];
    options: string[];
    aggregatedPreferences: { [criterion: string]: AggregatedPreference };
  }


export default DecisionState