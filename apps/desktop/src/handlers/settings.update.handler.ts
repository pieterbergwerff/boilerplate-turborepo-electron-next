// import utils
const { updateSettings } = require('@packages/database');
import getKnex from '../utils/getKnex.util.js';

// import validators
import {
  SettingsValidator,
  SettingsUpdateInputValidator,
} from '@packages/validators';

// import types
import type {
  SettingsValidatorType,
  SettingsUpdateInputValidatorType,
} from '@packages/validators';

export const settingsUpdateHandler = async (
  _evt,
  payload: unknown
): Promise<SettingsValidatorType> => {
  const knex = await getKnex();
  const input: SettingsUpdateInputValidatorType =
    SettingsUpdateInputValidator.parse(payload);
  console.log('Updating settings with input:', input);
  const updated = await updateSettings(knex, input);
  return SettingsValidator.parse(updated);
};

export default settingsUpdateHandler;
