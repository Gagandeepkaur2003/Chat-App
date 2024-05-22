import { Box,Container,Tab,TabList,TabPanel,TabPanels,Tabs,Text,} from '@chakra-ui/react'
import React from 'react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';

const HomePage = () => {
    const history = useHistory();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if(user)
        {
            history.push("/chats")
        }
    },[history]);



  return (
    <Container maxw="xl" centerContent>
        {/* Box tag Works same as the div */}
        <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        >

        <Text fontSize="4xl" fontFamily="Work sans" color="black" justifyContent="center">Talk-A-Tive</Text>
        </Box>

        <Box bg="white" w="100%" p={4} borderRadius="lg"  color="black" borderWidth="1px">
            <Tabs variant='soft-rounded'>
            <TabList mb="1em">
                <Tab width="50%">Login</Tab>
                <Tab width="50%">SignUp</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Login/>
                    </TabPanel>
                <TabPanel>
                    <Signup/>
                </TabPanel>
            </TabPanels>
            </Tabs>
        </Box>
    </Container>
  )
}

export default HomePage