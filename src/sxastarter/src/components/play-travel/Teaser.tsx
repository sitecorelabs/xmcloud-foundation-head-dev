import { Box, Flex } from '@chakra-ui/react';
import {
  Field,
  ImageField,
  Image as JssImage,
  LinkField,
  RichText as JssRichText,
  ComponentRendering,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ButtonWithArrow } from './Link';

interface Fields {
  Icon: ImageField;
  Title: Field<string>;
  Text: Field<string>;
  Link: LinkField;
}

type TeaserProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
  isReversed: boolean;
};

const TeaserDefaultComponent = (): JSX.Element => (
  <div className="component play-promo">
    <div className="component-content">
      <span className="is-empty-hint">[Teaser]</span>
    </div>
  </div>
);

const CommonTeaserComponent = (props: TeaserProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;

  return !props.rendering.dataSource ? (
    <TeaserDefaultComponent />
  ) : (
    <Flex
      id={id}
      px="4"
      className={`component teaser max-w-6xl mx-auto py-6 md:py-15 flex-col md:flex-row items-center md:gap-x-8 lg:gap-x-16 ${props.params?.styles}`}
    >
      <Box
        className={`basis-full md:basis-1/2 ${props.isReversed ? 'md:order-2 justify-end' : ''}`}
      >
        <JssImage
          className="rounded-3xl"
          width="100%"
          alt={props.fields.Title.value}
          field={props?.fields?.Icon}
        />
      </Box>
      <Flex className="basis-full md:basis-1/2 flex-col pt-8 md:pt-0">
        <Box
          lineHeight="120%"
          color="white"
          className="text-2xl md:text-4xl lg:text-6xl font-extrabold font-inter teaser-title"
        >
          <JssRichText field={props.fields?.Title} />
        </Box>
        <Box
          color="gray.400"
          className="py-6 text-xs md:text-base md:leading-8 teaser-text font-mulish"
        >
          <JssRichText field={props.fields?.Text} />
        </Box>
        <ButtonWithArrow fields={props.fields} rendering={props.rendering} />
      </Flex>
    </Flex>
  );
};

export const ImageAndContent = (props: TeaserProps): JSX.Element => {
  return <CommonTeaserComponent {...props} />;
};

export const ContentAndImage = (props: TeaserProps): JSX.Element => {
  return <CommonTeaserComponent {...props} isReversed={true} />;
};
