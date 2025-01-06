import React, { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

import classNames from 'classnames';

import type { FooterProps } from '../Footer/Footer';
import Footer from '@/web/packages/stylos/Footer';
import type { HeaderProps } from '@/web/packages/stylos/Header';
import Header from '@/web/packages/stylos/Header';
import type { InnerPageProps } from '@/web/packages/stylos/InnerPage';
import InnerPage from '@/web/packages/stylos/InnerPage';
import type { SingleColumnPageLayoutProps } from '@/web/packages/stylos/SingleColumnPageLayout';
import SingleColumnPageLayout from '@/web/packages/stylos/SingleColumnPageLayout';

const scrollBehavior = 'instant' as ScrollBehavior;

export type PageProps = SingleColumnPageLayoutProps &
  Partial<
    Pick<
      InnerPageProps,
      | 'pageTitle'
      | 'pageTitleTypographyProps'
      | 'pageSubtitle'
      | 'pageSubtitleTypographyProps'
      | 'pageHeaderProps'
      | 'pageContentProps'
    >
  > & {
    pageHeader?: boolean;
    innerPageProps?: InnerPageProps;
    pageFooter?: React.ReactNode;
    pageFooterProps?: FooterProps;
    headerHeight?: HeaderProps['height'];
    allowBackButtonInNativeApp?: HeaderProps['allowBackButtonInNativeApp'];
    platformOS?: Platform['OS'];
    onBack?: HeaderProps['onBackClick'];
  };

const Page = React.forwardRef<HTMLDivElement, PageProps>(
  (
    {
      // inner-page level props
      pageTitle,
      pageTitleTypographyProps,
      pageSubtitle,
      pageSubtitleTypographyProps,
      pageHeaderProps,
      pageContentProps,
      innerPageProps,
      children,

      // page level props
      className,
      headerHeight = 72,
      allowBackButtonInNativeApp,
      pageHeader,
      pageFooter,
      pageFooterProps,
      platformOS = 'web',
      onBack,
      ...rest
    },
    ref
  ) => {
    const pageRef = useRef<HTMLDivElement>(null);

    const stickyFooterRef = useRef<HTMLDivElement>(null);
    const [stickyFooterHeight, setStickyFooterHeight] =
      useState(0);

    useEffect(() => {
      const stickyFooterEl = stickyFooterRef.current;
      const resizeObserver = new ResizeObserver(
        (entries) => {
          for (const entry of entries) {
            setStickyFooterHeight(
              entry.target.clientHeight || 0
            );
          }
        }
      );

      if (stickyFooterEl) {
        resizeObserver.observe(stickyFooterEl);
      }

      return () => {
        if (stickyFooterEl) {
          resizeObserver.unobserve(stickyFooterEl);
        }
      };
    }, []);

    useEffect(() => {
      if (pageRef.current?.scrollIntoView) {
        pageRef.current?.scrollIntoView({
          block: 'start',
          behavior: scrollBehavior,
        });
      }
    }, []);

    return (
      <SingleColumnPageLayout
        ref={pageRef}
        className={classNames('single-column-page', {
          [`${className}`]: typeof className === 'string',
        })}
        header={
          pageHeader !== false && (
            <Header
              height={headerHeight}
              platformOS={platformOS}
              allowBackButtonInNativeApp={
                allowBackButtonInNativeApp
              }
              onBackClick={onBack}
            />
          )
        }
        footer={
          !!pageFooter && (
            <Footer
              innerPagePadding={innerPageProps?.spacing}
              {...pageFooterProps}
              ref={stickyFooterRef}
            >
              {pageFooter}
            </Footer>
          )
        }
        {...rest}
      >
        <InnerPage
          ref={ref}
          pageTitle={pageTitle}
          pageTitleTypographyProps={
            pageTitleTypographyProps
          }
          pageSubtitle={pageSubtitle}
          pageSubtitleTypographyProps={
            pageSubtitleTypographyProps
          }
          pageHeaderProps={pageHeaderProps}
          pageContentProps={pageContentProps}
          pt={
            (platformOS === 'ios' ||
              platformOS === 'android') &&
            allowBackButtonInNativeApp
              ? 2
              : 5
          }
          {...innerPageProps}
          pb={
            pageFooterProps?.sticky === true
              ? `${stickyFooterHeight}px`
              : undefined
          }
        >
          {children}
        </InnerPage>
      </SingleColumnPageLayout>
    );
  }
);

export default Page;
