
import { Box, Stack, VStack, Heading, HStack, Button, Input } from '@chakra-ui/react';
import React from 'react'
import {AiFillGoogleCircle,AiFillAmazonCircle,AiFillYoutube,AiFillInstagram, AiOutlineSend} from "react-icons/ai";
import Link from "next/link";


// bgColor={"blackAlpha.900"}
const Footer = () => {
    return (
        <Box className='bg-gradient-to-r from-[#84fab0] to-[#8fd3f4]' minH={'40'} p={'16'} color={"white"}>
            <Stack direction={['column', 'row']}>
                <VStack alignItems={"stretch"} w={'full'} px={'4'}>
                    <Heading size='md' textTransform={'uppercase'} textAlign={["center","left"]} textColor={"black"}>
                        for latest updates
                    </Heading>
                    <HStack
                        borderBottom={'2px solid black'}
                        py={'2'}
                    >
                        <Input
                            placeholder="Enter Email Here..."
                            border={"none"}
                            borderRadius={'none'}
                            outline={'none'}
                            focusBorderColor='none'
                        />

                        <Button
                            p={'0'}
                            color={'black'}
                            variant={'ghost'}
                            borderRadius={'0 20px 20px 0'}
                        >
                            <AiOutlineSend size={20}/>
                        </Button>
                    </HStack>
                </VStack >

                <VStack 
                w={'full'} 
                borderLeft={['none','1px solid white']}
                borderRight={['none','1px solid white']} 
                >
                    <Heading textTransform={'uppercase'} textAlign={'center'} color='#5853ff'>
                        Oxign
                    </Heading>
                    {/* <Text>All rights received</Text> */}
                    <div style={{textAlign:"center" }}>
                    <a href="mailto:oxignpathlab@gmail.com" >SEND MAIL TO-oxignpathlab@gmail.com <span style={{color: "#5853ff"
                    }}></span></a>
                    </div>
                </VStack>

                <VStack w={"full"} alignItems={"center"} justifyContent={"center"}>
               <div className=' p-2 flex items-center rounded-tl-[2rem] rounded-tr-[2rem] rounded-br-[2rem] rounded-bl-[2rem]'>
                
                <article className='flex mx-1 my-0 flex-wrap justify-center'>
                   

                    <Link href="https://www.google.com/" target="_blank">
                    <div className='m-2 h-14 w-14 bg-white rounded-[50%] flex flex-col items-center justify-center text-black cursor-pointer transition-all duration-500 hover:invert animate-waving-hand' style={{
                        animationDelay: "0.3s",
                        }}>
                        <AiFillGoogleCircle className='text-2xl'/>
                        <p className='text-[8px] font-black color-[#090c31]'>Google</p>
                    </div>
                    </Link>

                    <Link href="https://www.amazon.com" target="_blank">
                    <div className='m-2 h-14 w-14 bg-white rounded-[50%] flex flex-col items-center justify-center text-black cursor-pointer transition-all duration-500 hover:invert animate-waving-hand' style={{
                        animationDelay: "0.5s",
                        }}>
                        <AiFillAmazonCircle className='text-2xl'/>
                        <p className='text-[8px] font-black color-[#090c31]'>Amazon</p>
                    </div>
                    </Link>


                    <Link href="https://www.youtube.com/" target="_blank">

                    <div className='m-2 h-14 w-14 bg-white rounded-[50%] flex flex-col items-center justify-center text-black cursor-pointer transition-all duration-500 hover:invert animate-waving-hand' style={{
                        animationDelay: "0.7s",
                        }}>
                        <AiFillYoutube className='text-2xl'/>
                        <p className='text-[8px] font-black color-[#090c31]'>Youtube</p>
                    </div>
                    </Link>


                    <Link href="https://www.instagram.com/" target="_blank">

                    <div className='m-2 h-14 w-14 bg-white rounded-[50%] flex flex-col items-center justify-center text-black cursor-pointer transition-all duration-500 hover:invert animate-waving-hand' style={{
                        animationDelay: "1s",
                        }}>
                        <AiFillInstagram className='text-2xl'/>
                        <p className='text-[8px] font-black color-[#090c31]'>Instagram</p>
                    </div>
                    </Link>


             
                </article>
            </div>
               </VStack>

            </Stack>

        </Box>
    )
}

export default Footer;