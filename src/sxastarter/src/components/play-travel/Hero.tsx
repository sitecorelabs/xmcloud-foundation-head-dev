import { Button, Box, Flex } from '@chakra-ui/react';
import {
  Field,
  ImageField,
  Image as JssImage,
  LinkField,
  RichText as JssRichText,
  Link as JssLink,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'next/future/image';
import Arrow from '../../assets/images/arrow.svg';

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
};

type ButtonProps = {
  field: LinkField;
  showArrow?: boolean | string;
};

const ButtonComponent = (props: ButtonProps): JSX.Element => (
  <Button
    fontFamily="Inter"
    background={'linear-gradient(135deg, #F9EC7D 0%, #F5B100 100%)'}
    transition={'0.25s all'}
    _hover={{
      background: 'linear-gradient(135deg, #F9EC7D 0%, #F5B100 100%)',
    }}
    color={'#0C111F'}
    borderRadius={'999px'}
    height={{base: '32px', lg: '64px'}}
    padding={'0 16px 0 24px'}
    fontSize={{base: '14px', lg: '18px'}}
    className="font-semibold md:text-lg"
  >
    <JssLink field={props.field} />
    <Flex
      backgroundColor="#0C111F"
      className="h-6 w-6 lg:h-8 lg:w-8 justify-center rounded-full align-center ml-3.5"
    >
      <Image className="inline" alt={props.field.value.text || ''} src={Arrow} />
    </Flex>
  </Button>
);

const HeroDefaultComponent = (props: HeroProps): JSX.Element => (
  <div className={`component hero ${props?.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Hero</span>
    </div>
  </div>
);

export const Default = (props: HeroProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;

  if (props) {
    const { sitecoreContext } = useSitecoreContext();
    const backgroundImageProps = props?.fields['Background Image'];

    return (
      <Box
        id={id}
        backgroundImage={
          backgroundImageProps?.value?.class !== 'scEmptyImage'
            ? `url('${backgroundImageProps?.value?.src}')`
            : ''
        }
        minHeight={{ base: '325px', lg: '820px' }}
        className={`flex bg-no-repeat bg-center bg-cover md:items-center pb-6 md:pb-0 items-end w-full md:px-8 lg:px-20 lg:py-5 md:py-0 px-6 overflow-hidden relative ${props.params?.styles}`}
      >
        {sitecoreContext.pageEditing ? (
          <JssImage
            style={{ backgroundColor: 'white' }}
            className="absolute top-0 left-0 h-full !min-h-full !min-w-full !max-h-full !max-w-full"
            field={props?.fields['Background Image']}
          />
        ) : (
          ''
        )}
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
            <ButtonComponent field={props.fields?.Link} />
          </Box>
          {!sitecoreContext.pageEditing &&
          props?.fields?.Image?.value?.class === 'scEmptyImage' ? (
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
