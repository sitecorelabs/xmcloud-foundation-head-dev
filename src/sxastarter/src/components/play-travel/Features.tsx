import React from 'react';
import {
  ImageField,
  RichText as JssRichText,
  TextField,
  Field,
  Text as JssTextField,
  Image as JssImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Box, Flex } from '@chakra-ui/react';

type Feature = {
  text: { jsonValue: Field<string> };
  image: { jsonValue: ImageField };
  title: { jsonValue: TextField };
};

type Features = {
  children: {
    results: Feature[];
  };
};

interface Fields {
  data: {
    features: Features | null;
  };
}

export type FeaturesProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const FeatureRender = (features: Features): JSX.Element => {
  return (
    <>
      {features.children.results.map((linkedListItem, idx) => (
        <Flex key={idx} className="feature-item py-6 md:py-9">
          <Box className="flex-shrink-0" w={{ base: '55px', md: '90px' }}>
            <JssImageField
              alt={linkedListItem.title.jsonValue}
              field={linkedListItem.image.jsonValue}
            />
          </Box>
          <Box className="pl-6 grow">
            <Box className="font-bold text-xl md:text-2xl">
              <JssTextField field={linkedListItem.title.jsonValue} />
            </Box>
            <Box className="flex-1 mt-0 text-sm md:text-xl md:mt-5" color="gray.500">
              <JssRichText field={linkedListItem.text.jsonValue} />
            </Box>
          </Box>
        </Flex>
      ))}
    </>
  );
};

export const Default = (props: FeaturesProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { features } = props.fields.data;
  const featureComponentBody =
    features && features.children.results.length > 0 ? (
      <FeatureRender {...features} />
    ) : (
      <span className="is-empty-hint">[Features]</span>
    );

  return (
    <div className={`features component ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">{featureComponentBody}</div>
    </div>
  );
};
