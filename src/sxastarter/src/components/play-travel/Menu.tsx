import React from 'react';
import {
  Box,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  Link,
} from '@chakra-ui/react';
import { useState, useMemo } from 'react';
import {
  LinkField,
  TextField,
  Link as JSSLink,
  Text as JSSText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

type MenuProps = MenuFields & {
  params: { [key: string]: string };
};

type MenuFields = {
  fields: MenuItem[];
};

type MenuItem = {
  Id: string;
  DisplayName: string;
  Title: TextField;
  NavigationTitle: TextField;
  Href: string;
  Querystring: string;
  Children: Array<MenuItem>;
  Description: TextField;
};

type MobileNavItemProps = MenuItem & {
  onClick: (id: string, children: MenuItem[] | undefined) => void;
};

type MobileBackButtonProps = {
  onClick: () => void;
  children: JSX.Element | string;
};

class SubNavTitle {
  constructor(public label = '', public href = '', public isSelected = false) {}
}

const getLinkField = (props: MenuItem): LinkField => ({
  value: {
    href: props.Href,
    title: getLinkTitle(props),
    querystring: props.Querystring,
  },
});

const getLinkTitle = (props: MenuItem): string | undefined => {
  let title;
  if (props.NavigationTitle?.value) {
    title = props.NavigationTitle.value.toString();
  } else if (props.Title?.value) {
    title = props.Title.value.toString();
  } else {
    title = props.DisplayName;
  }

  return title;
};

const getNavigationText = (props: MenuItem): JSX.Element | string => {
  let text;

  if (props.NavigationTitle) {
    text = <JSSText field={props.NavigationTitle} />;
  } else if (props.Title) {
    text = <JSSText field={props.Title} />;
  } else {
    text = props.DisplayName;
  }

  return text;
};

const DesktopNav = (props: MenuFields) => {
  const { sitecoreContext } = useSitecoreContext();

  const handleNavClick = (event?: React.MouseEvent<HTMLElement>): void => {
    if (event && sitecoreContext?.pageEditing) {
      event.preventDefault();
    }
  };

  return (
    <Flex className="items-center sc-desktop-nav" h="90px">
      {props.fields.map((navItem: MenuItem, key: number) => (
        <div
          key={`${key}${navItem.DisplayName}`}
          className={`pr-6 lg:pr-12 ${navItem.Children ? 'sc-desktop-subnav' : ''}`}
        >
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Flex
                className={`items-center justify-between transition text-base ${
                  navItem.Children ? 'sc-menu-arrow' : ''
                }`}
                _hover={{ color: 'orange.300' }}
                color="white"
              >
                <JSSLink
                  onClick={handleNavClick}
                  field={getLinkField(navItem)}
                  className="leading-none"
                  editable={true}
                >
                  {getNavigationText(navItem)}
                </JSSLink>
              </Flex>
            </PopoverTrigger>
            {navItem.Children && (
              <PopoverContent
                boxSizing="border-box"
                borderRadius="0"
                boxShadow="none"
                cursor="default"
                maxW="100%"
                border="0"
                w="100vw"
                mt="6"
                p="7"
              >
                <DesktopSubNav key={navItem.Id} {...navItem} />
              </PopoverContent>
            )}
          </Popover>
        </div>
      ))}
    </Flex>
  );
};

const DesktopSubNav = (navItem: MenuItem) => {
  const [visibleSubnavItem, setVisibleSubnavItem] = useState(navItem?.Children[0]);
  const visibleSubnavChildren = useMemo(() => visibleSubnavItem?.Children, [visibleSubnavItem]);
  const subnavTitles = useMemo<SubNavTitle[]>(
    () =>
      navItem?.Children?.map(
        (child: MenuItem) =>
          new SubNavTitle(
            getLinkTitle(child),
            `${child.Href}?${child.Querystring}`,
            getLinkTitle(visibleSubnavItem) === getLinkTitle(child)
          )
      ),
    [navItem, visibleSubnavItem]
  );

  return (
    <Flex className="w-full p-8">
      <Box className="basis-52 shrink-0 border-r-2 border-solid" borderRightColor="gray.200">
        <Text className="text-base font-bold">{getLinkTitle(navItem)}</Text>
        <Stack className="flex-start items-baseline pt-6">
          {subnavTitles &&
            subnavTitles.map((subnavTitle, key: number) => (
              <Link
                onMouseEnter={() => setVisibleSubnavItem(navItem.Children[key])}
                className={`text-sm ${
                  subnavTitle.isSelected ? 'font-bold underline' : 'font-normal'
                }`}
                key={`${key}${subnavTitle.label}`}
                href={subnavTitle.href}
              >
                {subnavTitle.label}
              </Link>
            ))}
        </Stack>
      </Box>
      <Flex className="grow pl-8 justify-between flex-wrap">
        {visibleSubnavChildren?.map((child: MenuItem, index: number) => (
          <Box className="basis-1/3 pb-4 pr-6" key={child.Id + index}>
            <JSSLink editable={false} field={getLinkField(child)} className="sc-menu-link-details">
              <Text className="text-sm font-semibold">{getLinkTitle(child)}</Text>
              <JSSText
                className="pt-2 text-sm leading-7"
                field={child.Description}
                editable={false}
              />
            </JSSLink>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

const MobileNav = (props: MenuFields) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentItem, setCurrentItem] = useState<MenuItem[]>(props.fields);

  const handleGoDeep = (Id: string, Children: MenuItem[] | undefined) => {
    if (Children) {
      setSelectedIds(selectedIds.concat(Id));
      setCurrentItem(Children);
    }
  };

  const handlePopoverOpen = () => setSelectedIds([]);

  const handleBackButton = (currentItem: MenuItem[] | undefined) => {
    if (currentItem) {
      setSelectedIds(selectedIds.slice(0, -1));
      setCurrentItem(currentItem);
    }
  };

  const popoverContent = () => {
    const ancestor = props.fields.find((el) => el.Id === selectedIds[0]);

    switch (selectedIds.length) {
      case 1:
        return (
          <>
            <MobileBackButton onClick={() => handleBackButton(props.fields)}>
              {ancestor?.NavigationTitle.value?.toString() || ''}
            </MobileBackButton>
            {currentItem.map((navItem) => (
              <div className="sc-menu-level-item" key={navItem.Id}>
                <MobileNavItem {...navItem} onClick={handleGoDeep} />
              </div>
            ))}
          </>
        );

      case 2:
        return (
          <>
            <Flex className="items-baseline">
              <MobileBackButton onClick={() => handleBackButton(ancestor?.Children)}>
                <u>{getLinkTitle(ancestor || ({} as MenuItem))}</u>
              </MobileBackButton>{' '}
              <span className="text-sm font-medium ml-1">
                &gt;{' '}
                {getLinkTitle(
                  ancestor?.Children?.find((el) => el.Id === selectedIds[1]) || ({} as MenuItem)
                )}
              </span>
            </Flex>
            {currentItem.map((navItem, index) => (
              <JSSLink
                key={`${index}${navItem.Id}`}
                field={getLinkField(navItem)}
                editable={false}
                className="text-sm leading-7"
              >
                <Text className="font-semibold">{getLinkTitle(navItem)}</Text>
                <JSSText className="mb-2" field={navItem.Description} editable={false} />
              </JSSLink>
            ))}
          </>
        );

      case 0:
      default:
        return props.fields.map((navItem) => (
          <MobileNavItem key={navItem.Id} {...navItem} onClick={handleGoDeep} />
        ));
    }
  };

  return (
    <Popover
      onOpen={handlePopoverOpen}
      placement="bottom"
      autoFocus={false}
      trigger="hover"
      gutter={0}
    >
      <PopoverTrigger>
        <Flex className="items-center self-end" h="60px">
          <Flex className="sc-menu-humburger" />
        </Flex>
      </PopoverTrigger>
      <PopoverContent
        boxSizing="border-box"
        borderRadius="0"
        boxShadow="none"
        cursor="default"
        border="0"
        w="100%"
        h="100%"
        p="0"
      >
        <Box className="basis-full px-4 py-4">{popoverContent()}</Box>
      </PopoverContent>
    </Popover>
  );
};

const MobileNavItem = (props: MobileNavItemProps) => {
  return (
    <Stack onClick={() => props.onClick(props.Id, props.Children)}>
      <Flex
        field={props.Children ? undefined : getLinkField(props)}
        className="py-2 text-sm justify-between items-center"
        as={props.Children ? Flex : JSSLink}
        _hover={{ textDecoration: 'none' }}
        cursor="pointer"
        editable="false"
      >
        <Text className="font-semibold">{getLinkTitle(props)}</Text>
        {props.Children && <span className="sc-menu-chevron chevron-right"></span>}
      </Flex>
    </Stack>
  );
};

const MobileBackButton = ({ children, onClick }: MobileBackButtonProps) => {
  return (
    <Box
      className="py-2 mb-3 items-baseline inline-flex"
      _hover={{ textDecoration: 'none' }}
      onClick={onClick}
      as={Link}
    >
      <span className="sc-menu-chevron chevron-left"></span>
      <Text className="font-semibold ml-2">{children}</Text>
    </Box>
  );
};

export const Default = (props: MenuProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const fields = Object.values(props.fields);

  return (
    <div className={`menu ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <Box className="hidden md:flex">
          <DesktopNav fields={fields} />
        </Box>
        <Box className="flex md:hidden flex-col w-auto sc-mobile-nav">
          <MobileNav fields={fields} />
        </Box>
      </div>
    </div>
  );
};
