import { DictionaryPhrases, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { dictionaryServiceFactory } from 'lib/dictionary-service-factory';
import React, { useEffect, useState } from 'react';
import config from 'temp/config';

type ContactFormProps = {
  params: { [key: string]: string };
};

export const Default = (props: ContactFormProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const id = props.params.RenderingIdentifier;
  const [dictionary, setDictionary] = useState<DictionaryPhrases>({});

  useEffect(() => {
    dictionaryServiceFactory
      .create(config.jssAppName)
      .fetchDictionaryData(sitecoreContext.language || config.defaultLanguage)
      .then((data) => setDictionary(data));
  }, [sitecoreContext.language]);

  return (
    <div className={`component contact-form ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <p className="field-name text-sm leading-8 font-mulish">
          {dictionary['FORM_NAME']} <span className="text-xs">*</span>
        </p>
        <input type="text" className="input-field rounded-sm w-full px-4" />
        <p className="field-name text-sm leading-8 font-mulish pt-5">
          {dictionary['FORM_EMAIL']} <span className="text-xs">*</span>
        </p>
        <input type="text" className="input-field rounded-sm w-full px-4" />
        <p className="field-name text-sm leading-8 font-mulish pt-5">
          {dictionary['FORM_MESSAGE']} <span className="text-xs">*</span>
        </p>
        <textarea className="textarea-field rounded-sm w-full px-4 py-4"></textarea>
        <button className="submit-button text-sm rounded-full mt-6">
          {dictionary['FORM_SUBMIT']}
        </button>
      </div>
    </div>
  );
};
