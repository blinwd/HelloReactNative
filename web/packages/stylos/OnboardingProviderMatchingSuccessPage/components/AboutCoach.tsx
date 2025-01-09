import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MuiMarkdown, getOverrides } from 'mui-markdown';

import { ListItemOverride } from './ListItemOverride';

export type AboutCoachProps = {
  providerDisplayName?: string;
  providerDescription?: string;
  providerDetails?: string;
};

export const AboutCoach: React.FC<AboutCoachProps> = ({
  providerDisplayName,
  providerDescription,
  providerDetails,
}) => {
  return (
    <Card
      sx={{
        bgcolor: (theme) => theme.palette.grey[100],
        borderRadius: 4,
        border: 0,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="column" spacing={3}>
          {providerDisplayName && (
            <Typography variant="body1Bold">
              About {providerDisplayName}
            </Typography>
          )}

          {providerDescription && (
            <Typography>{providerDescription}</Typography>
          )}

          {providerDetails && (
            <MuiMarkdown
              overrides={{
                ...getOverrides(),
                ul: {
                  component: List,
                  props: {
                    sx: {
                      listStyleType: 'disc',
                      pl: 2,
                    },
                  },
                },
                li: {
                  component: ListItemOverride,
                  props: {
                    sx: {
                      display: 'list-item',
                      p: 0,
                    },
                  },
                },
                p: {
                  component: Typography,
                },
              }}
            >
              {providerDetails}
            </MuiMarkdown>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};
