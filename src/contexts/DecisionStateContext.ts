import React, { createContext } from 'react';
import DecisionState from '../components/interfaces/DecisionState'; // Adjust the path as necessary

// Define the default state
const defaultDecisionState: DecisionState = {
  model: '',
  criteria: [],
  criteriaComparisons: [],
  options: [],
  optionComparisons: [],
};

// Define the interface for the context properties
interface DecisionStateContextProps {
  decisionState: DecisionState;
  setDecisionState: React.Dispatch<React.SetStateAction<DecisionState>>;
}

// Create the context with default values
export const DecisionStateContext = createContext<DecisionStateContextProps>({
  decisionState: defaultDecisionState,
  setDecisionState: () => {},
});
