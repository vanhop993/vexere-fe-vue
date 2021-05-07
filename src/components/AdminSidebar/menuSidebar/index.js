export const menuSidebar = [
  {
    title: { name: "Dashboard", icon: "fas fa-tachometer-alt" },
    items: [
      { name: "Dashboard", link: "/admin/dashboard", icon: "bi bi-card-list" },
    ],
  },
  {
    title: { name: "Company", icon: "bi bi-building" },
    items: [
      {
        name: "List Company",
        link: "/admin/listcompany",
        icon: "bi bi-card-list",
      },
      { name: "List Bus", link: "/admin/listbus", icon: "fas fa-bus" },
    ],
  },
  {
    title: { name: "Place", icon: "fas fa-map-marked-alt" },
    items: [
      { name: "List Place", link: "/admin/listplace", icon: "bi bi-card-list" },
    ],
  },
  {
    title: { name: "Utility", icon: "fab fa-servicestack" },
    items: [
      {
        name: "List Utility",
        link: "/admin/listplace",
        icon: "bi bi-card-list",
      },
    ],
  },
  {
    title: { name: "Trip", icon: "fas fa-plane-departure" },
    items: [
      { name: "List Trip", link: "/admin/listtrip", icon: "bi bi-card-list" },
    ],
  },
  {
    title: { name: "User", icon: "fas fa-users" },
    items: [
      { name: "List User", link: "/admin/listuser", icon: "bi bi-card-list" },
    ],
  },
];
