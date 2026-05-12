import {
  Tag,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  Scale,
  Group,
  LayoutDashboard,
  Settings,
  Workflow,
  User,
  LocateIcon,
  Store,
  LucideView,
  Calendar,
  ShieldCheck,
  ShoppingCart
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        // {
        //   href: "",
        //   label: "Staff",
        //   icon: User,
        //   submenus: [
        //     {
        //       href: "/staff",
        //       label: "Staff"
        //     },
        //     {
        //       href: "/staff/indent",
        //       label: "Indent Request"
        //     }
        //   ]
        // },
        {
          href: "/users",
          label: "Users",
          icon: User,
          submenus: []
        },
        {
          href: "/geofence",
          label: "Geofence",
          icon: LocateIcon,
          submenus: []
        },
        {
          href: "/stores",
          label: "Stores",
          icon: Store,
          submenus: []
        },
        {
          href: "/calendar",
          label: "Calendar",
          icon: Calendar,
          submenus: []
        },
        {
          href: "/tasks",
          label: "Task",
          icon: Workflow,
          submenus: []
        },
        {
          href: "/Attendance-policy",
          label: "Attendance Policy",
          icon: ShieldCheck,
          submenus: []
        },
        {
          href: "/livetracking",
          label: "Live Tracking",
          icon: LucideView,
          submenus: []
        },
        {
          href: "",
          icon: Workflow,
          label: "Project",
          submenus: [
            {
              href: "/item",
              label: "Item"
            },
            {
              href: "/project",
              label: "Project"
            }
          ]
        },
        {
          href: "",
          icon: ShoppingCart,
          label: "Purchase",
          submenus: [
            {
              href: "/indent",
              label: "Indent List"
            },
            {
              href: "/quotation",
              label: "Quotation Requests"
            },
            {
              href: "/purchase-order",
              label: "Purchase Orders"
            }
          ]
        },
        {
          href: "/vendor",
          label: "Vendor",
          icon: Scale,
          submenus: []
        },
        {
          href: "",
          icon: Settings,
          label: "Settings",
          submenus: [
            {
              href: "/unit",
              label: "Unit"
            },
            {
              href: "/group",
              label: "Group"
            },
            {
              href: "/sub-group",
              label: "Sub Group"
            },
            {
              href: "/category",
              label: "Category"
            }
          ]
        }
      ]
    }
  ];
}
