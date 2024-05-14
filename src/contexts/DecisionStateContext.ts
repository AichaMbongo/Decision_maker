import React from 'react'
import DecisionState from '../components/interfaces/DecisionState'
import { createContext } from 'react';

const defaultDecisionState: DecisionState = {
    model: '',
    criteria: [],
    criteriaComparisons: [],
    options: [],
    optionComparisons: [],
  };

interface DecisionStateContextProps{
    decisionState: DecisionState;
    updateDecisionState: any;
}

export const DecisionStateContext = createContext({
    decisionState: defaultDecisionState,
    updateDecisionState: () => {}
});

// export default DecisionStateContext;

