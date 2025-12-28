// import utils
import { getSettings } from '@packages/database';
import getKnex from '../utils/getKnex.util.js';

// import validators
import { SettingsValidator } from '@packages/validators';

// import types
import type { SettingsValidatorType } from '@packages/validators';

/**
 * Handler to get application settings.
 * @returns {Promise<SettingsValidatorType>} Application settings
 */
export const settingsGetHandler = async (): Promise<SettingsValidatorType> => {
  const knex = await getKnex();
  const settings = await getSettings(knex);
  return SettingsValidator.parse(settings);
};

export default settingsGetHandler;
