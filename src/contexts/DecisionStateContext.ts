import React from 'react'
import DecisionState from '../components/interfaces/DecisionState'
import { createContext } from 'react';

const defaultDecisionState: DecisionState = {
    model: 'AHP',
    decision: '',
    criteria: [],
    options: [],
    aggregatedPreferences: {}

}

  

interface DecisionStateContextProps{
    decisionState: DecisionState;
    setDecisionState: React.Dispatch<React.SetStateAction<DecisionState>>;
}

export const DecisionStateContext = createContext<DecisionStateContextProps>({
    decisionState: defaultDecisionState,
    setDecisionState: () => {}
});

// export default DecisionStateContext;

