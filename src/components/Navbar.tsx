import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
import Link  from "next/link"
import Image from "next/image"

  
export default function Navbar() {

    return (
    <NavigationMenu
    className="max-w-screen-xl mx-auto w-full flex my-4 shadow-md bg-white rounded-xl"
    >
  <NavigationMenuList
  className="flex justify-between items-center w-full sm:min-w-[600px] py-2"
  >
    <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <Image src={"/logo.png"} alt="logo" width={104} height={104}/>    
            </NavigationMenuLink>
          </Link>
    </NavigationMenuItem>
    <NavigationMenuItem className="!text-lg">
          <Link href="/" legacyBehavior passHref className="">
            <NavigationMenuLink className={`${navigationMenuTriggerStyle() + 'text-lg font-bold'}`}>
                Quizes
            </NavigationMenuLink>
          </Link>
    </NavigationMenuItem>


  </NavigationMenuList>
</NavigationMenu>

    )
}