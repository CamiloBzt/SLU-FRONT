export const contacts = [
  {
    path: "/contacts",
    name: "contacts",
    component: () => import("../views/Contacts/Contacts.vue"),
    redirect: { name: "list-contacts" },
    meta: { requiresAuth: true },
    children: [
      {
        path: "list",
        name: "list-contacts",
        component: () => import("../components/Contacts/List.vue"),
      },
      {
        path: "create",
        name: "create-contact",
        component: () => import("../components/Contacts/CreateContact.vue"),
        props: (route) => ({ contactId: route.query.contactId }),
      },
    ],
  },
];
