'use client';

import React from 'react';
import { FormattedMessage } from 'react-intl';

export const I18nText = React.memo(({ path, values }) => (
  <FormattedMessage id={path} values={values} />
));

I18nText.displayName = 'I18nText';