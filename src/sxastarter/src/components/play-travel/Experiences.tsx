import React from 'react';
import {
  ImageField,
  RichText as JssRichText,
  TextField,
  Field,
  Text as JssTextField,
  Image as JssImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';

type TargetItem = {
  text: { jsonValue: Field<string> };
  image: { jsonValue: ImageField };
  title: { jsonValue: TextField };
};

interface Fields {
  data: {
    datasource: TargetItem | null;
  };
}

export type ExperiencesProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const ExperiencesRender = (datasource: TargetItem): JSX.Element => {
  return (
    <>
      <div className="font-bold leading-tight text-2xl md:text-5xl md:leading-tight">
        <JssTextField field={datasource.title.jsonValue} />
      </div>
      <div className="flex-1 mt-5 mb-6 md:mt-6 text-sm md:text-xl">
        <JssRichText field={datasource.text.jsonValue} />
      </div>
      <JssImageField
        alt={datasource.text.jsonValue.value}
        field={datasource.image.jsonValue}
        height={330}
      />
    </>
  );
};

export const Default = (props: ExperiencesProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { datasource } = props.fields.data;
  const experiences = datasource ? (
    <ExperiencesRender {...datasource} />
  ) : (
    <span className="is-empty-hint">Experiences</span>
  );

  return (
    <div className={`experiences component ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">{experiences}</div>
    </div>
  );
};
