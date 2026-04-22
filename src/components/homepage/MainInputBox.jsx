import { Tab, TabIndicator,Box, TabList, TabPanel, TabPanels, Tabs, Center } from '@chakra-ui/react'
import { Stay } from '../../pages/stay/Stay';
import React from 'react'
import { InputBox } from '../../pages/thingsTodo/InputBox'
import { Flight } from '../../pages/flights/Flight'

const MainInputBox = () => {
  return (
    <Box width={'85%'}   m={'auto'} mt={10} border='1px solid #BDBDBD' borderRadius='7px' >
            <Tabs position="relative" variant="unstyled"  >
                <Center>
                    <TabList borderBottom='1px solid #BDBDBD' width={'80%'} justifyContent={'space-evenly'} pt={5} pb={3} >
                        <Tab _selected={{ color: 'blue.500'}} fontWeight='semibold' >Stays</Tab>
                        <Tab _selected={{ color: 'blue.500'}} fontWeight='semibold'>Flight</Tab>
                        <Tab _selected={{ color: 'blue.500'}} fontWeight='semibold'>Cars</Tab>
                        <Tab _selected={{ color: 'blue.500'}} fontWeight='semibold'>Things to do</Tab>
                        <Tab _selected={{ color: 'blue.500'}} fontWeight='semibold'>Packages</Tab>
                    </TabList>
                </Center>
                <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="blue.500"
                borderRadius="1px"
                />
                <TabPanels>
                    <TabPanel>
                    <Stay/>
                    </TabPanel>
                    <TabPanel>
                        <Flight/>
                    </TabPanel>
                    <TabPanel>
                        <p>Cars</p>
                    </TabPanel>
                    <TabPanel>
                        <InputBox/>
                    </TabPanel>
                    <TabPanel>
                        <p>Packages</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
    </Box>
  )
}

export default MainInputBox
