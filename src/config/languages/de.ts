export const TEXT = {
  home_page_offer: "", // fallback for DB-driven value
  offer_instruction: "", // fallback for DB-driven value
  delivery_note: "Lieferung ist ebenfalls verfügbar.",
  home_page_disclaimer: "Das Essen kann vom Bild abweichen",
  logo_alt: "Logo",
  brand: "Masala",
  tag_line: "Taste of India",
  brand_name: "Masala Taste of India",
  menu_list: [
    { name: "Heim", link: "/" },
    { name: "Über Uns", link: "/about" },
    { name: "Kontakt", link: "/contact" },
    { name: "Tisch reservation", link: "/reservation" },
  ],

 menu: [
    { name: "Heim", link: "/" },
    { name: "Über Uns", link: "/about" },
    { name: "Kontakt", link: "/contact" },
    { name: "Tisch reservation", link: "/reservation" },
  ],

  sections: {
    links: {
      title: "Links",
      items: [
        { name: "Home", href: "/" },
        { name: "Menü", href: "/" },
        { name: "Über Uns", href: "/about" },
        { name: "Kontakt", href: "/contact" },
        { name: "Tisch reservation", href: "/reservation" },
        { name: "Allergene", href: "/allergene" },
      ],
    },
    company: {
      title: "Company",
      items: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "#" },
      ],
    },
    social: {
      title: "Social media",
    },
  },
  footer_bottom: {
    poweredBy: "Powered by",
    poweredByUrl: "http://www.gstadeveloper.com",
    copyright: {
      prefix: "Copyright ©",
      suffix: "All Rights Reserved by",
      company: "Masala Taste of India",
    },
  },
};

// export const SEO = {
//   title: "Masala – Authentische indische Küche",
//   description: "Online bestellen oder einen Tisch reservieren bei Masala.",
//   ogImage: "/images/og.jpg",
// };

export const SEO = {
  title: "Masala – Indisches Restaurant in Gifhorn, Niedersachsen",
  description:
    "Genießen Sie authentische indische Küche bei Masala in Gifhorn. Jetzt online bestellen oder vor Ort besuchen.",
//  ogImage: "/images/og.jpg",
};
