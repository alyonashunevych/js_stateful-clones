'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = {};

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        stateHistory.push({});
        break;

      case 'addProperties':
        currentState = { ...(stateHistory.at(-1) || { ...state }) };

        stateHistory.push(Object.assign(currentState, action.extraData));
        break;

      case 'removeProperties':
        currentState = { ...(stateHistory.at(-1) || { ...state }) };

        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        stateHistory.push(currentState);
        break;
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
