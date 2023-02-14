import React from 'react';
import { ImageField, Image as JssImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { Flex, HStack } from '@chakra-ui/react';

type Logo = {
  image: { jsonValue: ImageField };
};

type Logos = {
  children: {
    results: Logo[];
  };
};

interface Fields {
  data: {
    logos: Logos | null;
  };
}

export type LogosProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const LogosRender = (logos: Logos): JSX.Element => {
  return (
    <HStack className="justify-center flex-wrap content-center max-w-full py-4 gap-3 md:gap-10">
      {logos.children.results.map((listItem, idx) => (
        <Flex
          _hover={{ filter: 'grayscale(0)', boxShadow: '0 45px 35px rgba(0, 0, 0, 0.05)' }}
          filter={{ base: '', lg: 'grayscale(1)' }}
          className="px-4 transition rounded-lg"
          h={{ base: '80px', lg: '100px' }}
          height={100}
          key={idx}
        >
          <JssImageField
            alt={listItem.image.jsonValue.value?.alt}
            field={listItem.image.jsonValue}
            style={{ height: '100%' }}
          />
        </Flex>
      ))}
    </HStack>
  );
};

export const Default = (props: LogosProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { logos } = props.fields.data;
  const logosComponentBody = (
    <>
      {logos && logos.children.results.length > 0 ? (
        <LogosRender {...logos} />
      ) : (
        <span className="is-empty-hint">Logos</span>
      )}
    </>
  );

  return (
    <div className={`logos component ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">{logosComponentBody}</div>
    </div>
  );
};
