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
  let stateAfterAction = {};

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        stateAfterAction = {};
        break;

      case 'addProperties':
        currentState = { ...(stateHistory.at(-1) || { ...state }) };
        stateAfterAction = Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        currentState = { ...(stateHistory.at(-1) || { ...state }) };

        for (const key of action.keysToRemove) {
          delete currentState[key];
        }

        stateAfterAction = currentState;
        break;
    }
    stateHistory.push(stateAfterAction);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
