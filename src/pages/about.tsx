import React, {useState} from 'react'
import { IRootContextType, RootContext } from '../../components/GlobalComponents/screenerLayoutWrapper'
import { Container } from '@mantine/core';

const About = (): React.ReactElement => {
  const rootContext: IRootContextType = React.useContext(RootContext)

  React.useEffect(() => {
    rootContext.setActivePage("about")
}, [])

  return (
    <Container size="md" px="md">
    Welcome to contraqtual!
    </Container>
  );
};

export default About;