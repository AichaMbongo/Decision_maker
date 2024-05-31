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
  

interface DecisionState {
    model: string;
    decision: string;
    criteria: Criterion[];

    options: string[];

  }


export default DecisionState