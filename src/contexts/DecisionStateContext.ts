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
    setDecisionState: any;
}

export const DecisionStateContext = createContext({
    decisionState: defaultDecisionState,
    setDecisionState: (property: any) => {}
});

// export default DecisionStateContext;

