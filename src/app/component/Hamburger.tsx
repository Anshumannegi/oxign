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
    <>
    <div>
      <Button
        // pos={"fixed"}
        // bottom={"20"}
        // left={"4"}
        // p={"0"}
        // w={"10"}
        // h={"10"}
        // borderRadius={"full"}
        onClick={onOpen}
        className={`z-10 bg-purple-600 hover:bg-purple-500 fixed bottom-0 left-2 p-0 w-10 h-10 rounded-full ${isOpen ? 'z-0' : 'z-10'}`}
      >
        <BiMenuAltLeft size={"20"} />
      </Button>

      {/* <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />

        <DrawerContent>
          <DrawerCloseButton />

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
                <Link href="/allTestForAdmin">All Lab Tests</Link>
              </Button>

              <Button
                onClick={onClose}
                variant={"ghost"}
                colorScheme={"purple"}
              >
                <Link href="/addLab">Add Lab Test</Link>
              </Button>
              <Button
                onClick={onClose}
                variant={"ghost"}
                colorScheme={"purple"}
              >
                <Link href="/subscribe">Suscribe</Link>
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer> */}

<div className={`fixed h-full w-64 bg-white border bottom-2 border-solid ${isOpen ? 'translate-x-0' : '-translate-x-full '} transition-transform duration-300 ease-in-out`}>
  <button
    onClick={onClose}
    className="absolute top-4 right-4 p-2 rounded-lg bg-purple-500 text-white"
  >
    Close
  </button>

  <div className="p-4">
    <h1 className="text-2xl font-semibold mb-4">Menu</h1>
    <ul>
      <li className="mb-2">
        <Link
          href="/allAppointments"
          onClick={onClose}
          className="block p-2 rounded-lg hover:bg-purple-100"
        >
          All Appointments
        </Link>
      </li>
      <li className="mb-2">
        <Link
          href="/addAppointment"
          onClick={onClose}
          className="block p-2 rounded-lg hover:bg-purple-100"
        >
          Add Appointment
        </Link>
      </li>
      <li className="mb-2">
        <Link
          href="/allTestForAdmin"
          onClick={onClose}
          className="block p-2 rounded-lg hover:bg-purple-100"
        >
          All Lab Tests
        </Link>
      </li>
      <li className="mb-2">
        <Link
          href="/addLab"
          onClick={onClose}
          className="block p-2 rounded-lg hover:bg-purple-100"
        >
          Add Lab Test
        </Link>
      </li>
      <li className="mb-2">
        <Link
          href="/subscribe"
          onClick={onClose}
          className="block p-2 rounded-lg hover:bg-purple-100"
        >
          Subscribe
        </Link>
      </li>
    </ul>
  </div>
</div>
{/* <div
  className={`fixed inset-0 opacity-50 ${isOpen ? 'block' : 'hidden'}`}
  onClick={onClose}
></div> */}

      </div>
    </>
  );
}
