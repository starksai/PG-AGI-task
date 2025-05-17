import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        items: [
          {
            title: "Weather",
            url: "/weather",
          },
          {
            title: "Finance",
            url: "/finance",
          },
          {
            title: "News",
            url: "/news",
          }
        ],
      }
    ],
  },

];
