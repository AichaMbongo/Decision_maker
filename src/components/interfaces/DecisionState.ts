import React from 'react'

interface DecisionState {
    model: string;
    criteria: string[];
    criteriaComparisons: number[][];
    options: string[];
    optionComparisons: number[][];
  }
  

export default DecisionState