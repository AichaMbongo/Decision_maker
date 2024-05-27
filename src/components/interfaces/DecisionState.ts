import React from 'react'

export interface Criterion{
  name: string,
  weight: number,
}
  

interface DecisionState {
    model: string;
    decision: string;
    criteria: Criterion[];
    criteriaComparisons: number[][];
    options: string[];
    optionComparisons: number[][];
  }


export default DecisionState