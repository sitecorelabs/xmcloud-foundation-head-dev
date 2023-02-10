import { Box, Flex } from '@chakra-ui/react';
import {
  Field,
  ImageField,
  Image as JssImage,
  LinkField,
  RichText as JssRichText,
  useSitecoreContext,
  ComponentRendering,
  ComponentParams,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ButtonWithArrow } from './Link';

interface Fields {
  'Background Image': ImageField;
  Image: ImageField;
  Title: Field<string>;
  Description: Field<string>;
  Link: LinkField;
  Picture: ImageField;
}

type HeroProps = {
  params: { [key: string]: string };
  fields: Fields;
  rendering: ComponentRendering & { params: ComponentParams };
};

const HeroDefaultComponent = (props: HeroProps): JSX.Element => (
  <div className={`component hero ${props?.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Hero</span>
    </div>
  </div>
);

export const Default = (props: HeroProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  if (props) {
    const { sitecoreContext } = useSitecoreContext();

    return (
      <Box
        id={id ? id : undefined}
        minHeight={{ base: '325px', lg: '820px' }}
        className={`flex bg-no-repeat bg-center bg-cover md:items-center pb-6 md:pb-0 items-end w-full md:px-8 lg:px-20 lg:py-5 md:py-0 px-6 overflow-hidden relative ${props.params?.styles}`}
      >
        <div className="flex container mx-auto items-center z-10 justify-between flex-col md:flex-row">
          <Box
            maxWidth="600px"
            minWidth={{ md: '50%' }}
            className="order-2 m-w-full md:order-none flex-1 pt-7 md:pt-0 md:mr-2.5"
          >
            <Box
              fontFamily="Lora"
              lineHeight="120%"
              color="white"
              className="text-2xl md:text-4xl lg:text-6xl font-semibold"
            >
              <JssRichText field={props.fields?.Title} />
            </Box>
            <Box
              fontFamily="Mulish"
              lineHeight="200%"
              marginBottom="25px"
              color="white"
              className="text-xs sm:text-xs pt-4 md:text-base"
            >
              <JssRichText field={props.fields?.Description} />
            </Box>
            <ButtonWithArrow {...props} />
          </Box>
          {!sitecoreContext.pageEditing && props?.fields?.Image?.value?.class === 'scEmptyImage' ? (
            ''
          ) : (
            <Flex width={{ base: '295px', md: '330px', lg: '630px' }}>
              <JssImage
                className="rounded-3xl hero-component__primary-picture mt-20 md:mt-0"
                field={props?.fields?.Image}
              />
            </Flex>
          )}
        </div>
      </Box>
    );
  }

  return <HeroDefaultComponent {...(props as HeroProps)} />;
};
