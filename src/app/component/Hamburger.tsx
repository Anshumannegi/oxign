"use client";

import Link from "next/link";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  VStack,
  HStack,
  Image,
} from "@chakra-ui/react";
import { BiMenuAltLeft } from "react-icons/bi";

export default function Hamburger() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    // <div className="w-full h-[100vh] flex ">
    //   {/* <Navbar /> */}
    //   {/* <h1>admin</h1> */}
    //   <div className="w-3/12 flex flex-col">
    //   <h1>Links</h1>
    //     <Link href="/addLab" className="capitalize" >Add lab</Link>
    //     <Link href="/allAppointments" className="capitalize" >All Appointments</Link>

    //   </div>
    //   <div className="border"></div>
    //   <div className="w-9/12">Main</div>
    // </div>

    <>
    <div>
      <Button
        pos={"fixed"}
        top={"20"}
        left={"4"}
        // colorScheme="purple"
        p={"0"}
        w={"10"}
        h={"10"}
        borderRadius={"full"}
        onClick={onOpen}
        className="z-10 bg-purple-600 hover:bg-purple-500"
      >
        <BiMenuAltLeft size={"20"} />
      </Button>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />

        <DrawerContent>
          <DrawerCloseButton />

          {/* <HStack>
            <DrawerHeader whiteSpace={'nowrap'}>UR-GURUKUL</DrawerHeader>
            <Image src={img6} h={['10', '16']} w={['10', '16']} objectFit={'cover'} style={{ borderRadius: "50%" }} />
        </HStack> */}

          <DrawerBody>
            <VStack alignItems={"flex-start"}>
              <Button
                onClick={onClose}
                variant={"ghost"}
                colorScheme={"purple"}
              >
                <Link href="/allAppointments">All Appointments</Link>
              </Button>

              <Button
                onClick={onClose}
                variant={"ghost"}
                colorScheme={"purple"}
              >
                <Link href="/addAppointment">Add Appointment</Link>
              </Button>

              <Button
                onClick={onClose}
                variant={"ghost"}
                colorScheme={"purple"}
              >
                <Link href="/allTests">All Lab Tests</Link>
              </Button>

              <Button
                onClick={onClose}
                variant={"ghost"}
                colorScheme={"purple"}
              >
                <Link href="/addLab">Add Lab Test</Link>
              </Button>
            </VStack>

            {/* <HStack
                pos={'absolute'}
                bottom={'10'}
                left={'0'}
                // bgColor={'red'}
                w={'full'}
                justifyContent={'space-evenly'}>
                <Button onClick={onClose} colorScheme={'purple'}>
                    <Link to={'/login'}>Log In</Link>
                </Button>

                <Button onClick={onClose} colorScheme={'purple'} variant={'outline'}>
                    <Link to={'/signup'}>Sign Up</Link>
                </Button>
            </HStack> */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      </div>
      <div>
        
      </div>
    </>
  );
}
