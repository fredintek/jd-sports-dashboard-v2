"use client";
import {
  AlignVerticalSpaceBetween,
  ArrowLeftRight,
  BookImage,
  BrickWall,
  ChartBarStacked,
  ChevronDown,
  ContactRound,
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
  QrCode,
  ShoppingBag,
  ShoppingCart,
  Target,
  Transgender,
  WalletCards,
  Waypoints,
} from "lucide-react";
import React from "react";
import Link from "next/link";
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
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  useSidebar,
} from "./ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

type Props = {};

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard, group: "main menu" },
  { title: "Users", url: "/users", icon: ContactRound, group: "main menu" },
  {
    title: "Category",
    url: "/category",
    icon: ChartBarStacked,
    group: "main menu",
  },
  {
    title: "Products",
    url: "/products",
    icon: ShoppingBag,
    group: "main menu",
  },
  { title: "Orders", url: "/orders", icon: ShoppingCart, group: "main menu" },
  { title: "Customers", url: "/customers", icon: Eye, group: "main menu" },
  {
    title: "Report & Analytics",
    url: "/report-analytics",
    icon: Target,
    group: "main menu",
  },
  {
    title: "All Transactions",
    url: "/transactions",
    icon: ArrowLeftRight,
    group: "main menu",
  },

  {
    title: "Header",
    url: "#",
    icon: AlignVerticalSpaceBetween,
    children: [
      { title: "Logo", url: "/header/logo", icon: Frame },
      { title: "Navigation", url: "/header/navigation", icon: LocateFixed },
      { title: "Banner", url: "/header/banner", icon: Waypoints },
    ],
    group: "content systems",
  },
  { title: "Hero", url: "/hero", icon: Images, group: "content systems" },
  { title: "Brands", url: "/brands", icon: Target, group: "content systems" },
  {
    title: "Cards",
    url: "#",
    icon: WalletCards,
    children: [
      { title: "Gender", url: "/cards/gender", icon: Transgender },
      { title: "Shop Now", url: "/cards/shop-now", icon: ShoppingBag },
      // { title: "Looks", url: "/cards/look", icon: Eclipse },
    ],
    group: "content systems",
  },
  {
    title: "Gallery",
    url: "#",
    icon: BookImage,
    children: [
      { title: "Showcase", url: "/gallery/showcase", icon: Eye },
      { title: "Social Media", url: "/gallery/social-media", icon: QrCode },
    ],
    group: "content systems",
  },
  {
    title: "Footer",
    url: "#",
    icon: Footprints,
    children: [
      { title: "Icons", url: "/footer/icons", icon: BrickWall },
      { title: "Newsletter", url: "/footer/newsletter", icon: Newspaper },
      { title: "Privacy Info", url: "/footer/privacy-info", icon: HatGlasses },
      { title: "Links", url: "/footer/links", icon: Link2 },
      { title: "Advertisement", url: "/footer/advertisement", icon: Megaphone },
    ],
    group: "content systems",
  },
];

const AppSidebar = (props: Props) => {
  const { open } = useSidebar();

  // group items by "group"
  const groupedItems = items.reduce<Record<string, typeof items>>(
    (acc, item) => {
      if (!acc[item.group]) acc[item.group] = [];
      acc[item.group].push(item);
      return acc;
    },
    {}
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4 mt-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Link href="/">
                {open ? (
                  <div>
                    <img
                      src="https://www.jdsports.cy/themes/sleedex-jdsports/img/jd-desktop-logo.png"
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-[20px] h-[20px]">
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

      <SidebarContent className="mt-6">
        {Object.entries(groupedItems).map(([group, groupItems]) => (
          <SidebarGroup key={group}>
            <SidebarGroupLabel className="capitalize">
              {group}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {groupItems.map((item) =>
                  item.children ? (
                    <Collapsible key={item.title} className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton>
                            <item.icon className="w-4 h-4" />
                            <span>{item.title}</span>
                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.children.map((child) => (
                              <SidebarMenuSubItem key={child.title}>
                                <SidebarMenuSubButton asChild>
                                  <Link href={child.url}>
                                    <child.icon className="w-4 h-4" />
                                    <span>{child.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
