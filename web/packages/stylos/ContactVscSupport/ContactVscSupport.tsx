import React from 'react';
import { useT } from '@transifex/react';

import type { ContactSupportCardProps } from '@/stylos/ContactSupportCard';
import ContactSupportCard from '@/stylos/ContactSupportCard';

const ContactVscSupport: React.FC<
  ContactSupportCardProps
> = ({ sx, ...restProps }) => {
  const t = useT();

  return (
    <ContactSupportCard
      sx={{
        p: 0,
        mt: 2,
        bgcolor: 'transparent',
        '& a': {
          textDecoration: 'none',
        },
        ...sx,
      }}
      supportDescription={t(
        'Need help? Call us at (833) 670-5552.'
      )}
      {...restProps}
    />
  );
};

export default ContactVscSupport;
