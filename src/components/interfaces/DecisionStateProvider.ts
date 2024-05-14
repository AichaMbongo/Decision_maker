import React, { createContext, useState, FC, ReactNode, useContext } from 'react';
import DecisionState from './DecisionState';
import { DecisionStateContext } from '../../contexts/DecisionStateContext';

// const DecisionStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
//   const [decisionState, setDecisionState] = useState<DecisionState>(defaultDecisionState);

//   const updateDecisionState = (updatedProperties: Partial<DecisionState>) => {
//     setDecisionState(prevState => ({
//       ...prevState,
//       ...updatedProperties,
//     }));
//   };

//   return (
//     <DecisionStateContext.Provider value={{ decisionState, updateDecisionState }}>
//       {children}
//     </DecisionStateContext.Provider>
//   );
// };

// const useDecisionContext = () => useContext(DecisionStateContext);

// export { DecisionStateProvider, useDecisionContext };


 interface DecisionStateProviderProps {
    children: ReactNode;
 }
 const defaultDecisionState: DecisionState = {
  model: '',
  criteria: [],
  criteriaComparisons: [],
  options: [],
  optionComparisons: [],
};

const DecisionStateProvider  = ({ children }: DecisionStateProviderProps) => {
  const [decisionState, setDecisionState] = useState<DecisionState>({
    model: '',
    criteria: [],
    criteriaComparisons: [],
    options: [],
    optionComparisons: [],
});

  const updateDecisionState = (updatedProperties: Partial<DecisionState>) => {
    setDecisionState(prevState => ({
      ...prevState,
      ...updatedProperties,
    }));
  };

  return (
    <DecisionStateContext.Provider value={{{ decisionState, setDecisionState }}}>
      {children}
    </DecisionStateContext.Provider>
    
  );
}

export default DecisionStateProvider;
