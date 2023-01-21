import React from 'react';
import {
  ImageField,
  RichText as JssRichText,
  TextField,
  Field,
  Text as JssTextField,
  Image as JssImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Box } from '@chakra-ui/react';

type TargetItem = {
  content: { jsonValue: Field<string> };
  image: { jsonValue: ImageField };
  title: { jsonValue: TextField };
};

interface Fields {
  data: {
    datasource: TargetItem | null;
    contextItem: TargetItem;
  };
}

export type ExperiencesProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: ExperiencesProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { datasource, contextItem } = props.fields.data;
  const data = datasource || contextItem;
  const experiences = data ? (
    <>
      <div className="font-bold leading-tight text-2xl md:text-5xl pr-24 sm:pr-40 md:leading-tight">
        <JssTextField field={data.title.jsonValue} />
      </div>
      <div className="flex-1 mt-5 mb-6 md:mt-6 text-sm md:text-xl">
        <JssRichText field={data.content.jsonValue} />
      </div>
      <JssImageField alt={data.content.jsonValue.value} field={data.image.jsonValue} height={330} />
    </>
  ) : (
    <span className="is-empty-hint">Experiences</span>
  );

  return (
    <div className={`experiences component ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">{experiences}</div>
    </div>
  );
};
