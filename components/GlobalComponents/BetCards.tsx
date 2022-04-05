import React from 'react';
import { Card, Image, Text, Badge, Button, Group, useMantineTheme } from '@mantine/core';

const BetCard = (props) => {

  const theme = useMantineTheme();

  const secondaryColor = theme.colorScheme === 'dark'
    ? theme.colors.dark[1]
    : theme.colors.gray[7];

  return (
    <div style={{ width: 350, height: 200, margin: 'auto' }}>
      <Card shadow="sm" p="lg">
        <Card.Section>
          <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bitcoin_logo.svg/252px-Bitcoin_logo.svg.png" height={60} alt="Bitcoin" />
        </Card.Section>

        <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <Badge color="red" variant="light">
            CryptoCurrency
          </Badge>
          <Badge color="green" variant="outline">
            Pool Price: $
          </Badge>
        </Group>

        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          The price of Bitcoin on DATE will be greater than PROPPRICE.
        </Text>
        <br />
        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          Pool Size: POOLSIZE
        </Text>
        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          No Payout: NOPAYOUT
        </Text>
        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          Yes Payout: YESPAYOUT
        </Text>
        <br />
        <Group position="apart">
        <Button variant="light" color="red" onClick={() => console.log('Voting NO')}>
          Vote NO
        </Button>
        <Button variant="light" color="green" onClick={() => console.log('Voting YES')}>
          Vote YES
        </Button>
        </Group>
      </Card>
    </div>
  );
};

export default BetCard;