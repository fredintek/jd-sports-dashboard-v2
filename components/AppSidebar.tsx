"use client";
import {
  AlignVerticalSpaceBetween,
  BookImage,
  BrickWall,
  ChevronDown,
  Eclipse,
  Eye,
  Footprints,
  Frame,
  HatGlasses,
  Images,
  LayoutDashboard,
  Link2,
  LocateFixed,
  Megaphone,
  Newspaper,
  NotepadTextDashed,
  QrCode,
  ShoppingBag,
  ShoppingCart,
  Target,
  Transgender,
  WalletCards,
  Waypoints,
} from "lucide-react";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "./ui/sidebar";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

type Props = {};

const items = [
  // {
  //   title: "Dashboard",
  //   url: "/",
  //   icon: LayoutDashboard,
  // },
  {
    title: "Header",
    url: "#",
    icon: AlignVerticalSpaceBetween,
    children: [
      {
        title: "Logo",
        url: "/header/logo",
        icon: Frame,
      },
      {
        title: "Navigation",
        url: "/header/navigation",
        icon: LocateFixed,
      },
      {
        title: "Banner",
        url: "/header/banner",
        icon: Waypoints,
      },
    ],
  },
  {
    title: "Hero",
    url: "/hero",
    icon: Images,
  },
  {
    title: "Brands",
    url: "/brands",
    icon: Target,
  },
  {
    title: "Cards",
    url: "#",
    icon: WalletCards,
    children: [
      {
        title: "Gender",
        url: "/cards/gender",
        icon: Transgender,
      },
      {
        title: "Shop Now",
        url: "/cards/shop-now",
        icon: ShoppingBag,
      },
      {
        title: "Looks",
        url: "/cards/look",
        icon: Eclipse,
      },
    ],
  },
  {
    title: "Gallery",
    url: "#",
    icon: BookImage,
    children: [
      {
        title: "Showcase",
        url: "#",
        icon: Eye,
      },
      {
        title: "Social Media",
        url: "#",
        icon: QrCode,
      },
    ],
  },
  {
    title: "Footer",
    url: "#",
    icon: Footprints,
    children: [
      {
        title: "Icons",
        url: "#",
        icon: BrickWall,
      },
      {
        title: "Newsletter",
        url: "#",
        icon: Newspaper,
      },
      {
        title: "Privacy Info",
        url: "#",
        icon: HatGlasses,
      },
      {
        title: "Links",
        url: "#",
        icon: Link2,
      },
      {
        title: "Advertisement",
        url: "#",
        icon: Megaphone,
      },
    ],
  },
];

const AppSidebar = (props: Props) => {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4 mt-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link href="/">
                {open ? (
                  <div className={``}>
                    <img
                      src="https://www.jdsports.cy/themes/sleedex-jdsports/img/jd-desktop-logo.png"
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className={`w-[20px] h-[20px]`}>
                    <img
                      src="https://www.jdsports.cy/themes/sleedex-jdsports/img/jd-mobile-logo.png"
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2 mt-6">
        <SidebarMenu className="gap-3">
          {items?.map((item) => {
            if (item.children) {
              return (
                <Collapsible key={item.title} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <item.icon />
                        <span>{item.title}</span>
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.children?.map((child) => (
                          <SidebarMenuSubItem key={child.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={child.url}>
                                <child.icon />
                                <span>{child.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            } else {
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            }
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
