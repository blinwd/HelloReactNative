import React, { useCallback, useMemo } from 'react';

import Link from '@mui/material/Link';
import type { CardProps } from '@mui/material/Card';
import Card from '@mui/material/Card';
import type { TypographyProps } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';

export interface ContactSupportCardProps extends CardProps {
  /**
   * `supportDescription` prop takes priority over other props. When it's passed,
   * it will search for the support email and/or phone number in the description
   * and make them clickable links in the DOM. Otherwise, it will fallback to
   * rendering the default information where `supportEmail` and `supportNumber`
   * will be taken into account.
   */
  supportDescription?: string | null;

  supportEmail?: string | null;
  supportNumber?: string | null;
  prependContent?: string;
  appendContent?: string;
  isSupportNumberClickable?: boolean;
  typographyVariant?: TypographyProps['variant'];
}

const ContactSupportCard: React.FC<
  ContactSupportCardProps
> = ({
  supportEmail = 'support@vida.com',
  supportNumber = '1-855-442-5885',
  supportDescription,
  prependContent,
  appendContent,
  isSupportNumberClickable = true,
  typographyVariant = 'body1',
  sx,
  ...restProps
}) => {
  const supportInfo = useMemo(() => {
    if (
      typeof supportDescription === 'string' &&
      supportDescription !== ''
    ) {
      return supportDescription;
    }

    let info = '';

    if (prependContent) {
      info = prependContent;
    }

    info += ' Need more help? Please contact support';

    if (supportEmail || supportNumber) {
      info += ' at';

      if (supportEmail) {
        info += ` ${supportEmail}`;
      }

      if (supportEmail && supportNumber) {
        info += ' or call';
      }

      if (supportNumber) {
        info += ` ${supportNumber}`;
      }
    }

    info += '.';

    if (appendContent) {
      info += ` ${appendContent}`;
    }

    return info;
  }, [
    supportEmail,
    supportNumber,
    supportDescription,
    prependContent,
    appendContent,
  ]);

  // search for email and phone number in the description and return query results
  const regexQueries = useMemo(() => {
    const result = [];
    const target =
      typeof supportInfo === 'string' ? supportInfo : '';

    const supportEmailRegex = /\w+@vida.com/;
    const supportEmailQuery = target.match(
      supportEmailRegex
    );

    const phoneNumberRegex =
      /(?:1-)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4,6}/;
    const phoneNumberQuery = target.match(phoneNumberRegex);

    if (supportEmailQuery) {
      result.push({
        index: target.indexOf(supportEmailQuery[0]),
        value: supportEmailQuery[0],
        type: 'email',
      });
    }

    if (phoneNumberQuery && isSupportNumberClickable) {
      result.push({
        index: target.indexOf(phoneNumberQuery[0]),
        value: phoneNumberQuery[0],
        type: 'phoneNumber',
      });
    }

    return result.sort((item1, item2) => {
      return item1.index - item2.index;
    });
  }, [supportInfo, isSupportNumberClickable]);

  // take the query results and render the support description in the DOM
  const renderSupportDescription = useCallback(() => {
    const fragments: JSX.Element[] = [];
    const targetStr =
      typeof supportInfo === 'string' ? supportInfo : '';

    let ptr = 0;
    let fromIdx = 0;
    let endIdx = targetStr.length;

    while (fromIdx < targetStr.length) {
      const queryResult =
        ptr < regexQueries.length
          ? regexQueries[ptr]
          : null;

      endIdx = queryResult
        ? queryResult.index
        : targetStr.length;

      // collect the sub string prior to the email (or phone number)
      fragments.push(
        <span key={`fragment-span-${fromIdx}`}>
          {targetStr.slice(fromIdx, endIdx)}
        </span>
      );

      if (queryResult) {
        // collect the email (or phone number)
        fragments.push(
          <Link
            key={`fragment-link-${queryResult.index}`}
            href={
              queryResult.type === 'email'
                ? `mailto:${queryResult.value}`
                : `tel:${queryResult.value.replace(
                    /\D/g,
                    ''
                  )}`
            }
            color="primary"
            variant={typographyVariant}
            data-testid={`support-${queryResult.type}-link`}
            sx={{
              whiteSpace: 'nowrap',
            }}
          >
            {queryResult.value}
          </Link>
        );
      }

      fromIdx =
        endIdx +
        (queryResult ? queryResult.value.length : 0);

      ptr += 1;
    }

    return fragments;
  }, [regexQueries, supportInfo, typographyVariant]);

  return (
    <Card
      sx={{
        border: 0,
        p: 2,
        ...sx,
      }}
      variant="outlined"
      {...restProps}
    >
      <Typography
        display="inline-block"
        data-testid="contact-support-card-content"
        variant={typographyVariant}
      >
        {renderSupportDescription()}
      </Typography>
    </Card>
  );
};

export default ContactSupportCard;
