export const allText = {
  title: "",
   offer: "Abhol Rabatt 10%",
  offer_instruction:"",
  deliveryNote: "Lieferung ist ebenfalls verfügbar.",
  disclaimer: "Das Essen kann vom Bild abweichen",
  logoAlt: "Logo",
  brand: "Masala",
  tagline: "Taste of India",
  brandName: "Masala Taste of India",
  menuList: [
    { name: "Heim", link: "/" },
    { name: "Über Uns", link: "/about" },
    { name: "Kontakt", link: "/contact" },
    { name: "Tisch reservation", link: "/reservation" },
  ], // ✅ this is correct — comma here is fine
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
  footerBottom: {
    poweredBy: "Powered by",
    poweredByUrl: "http://www.gstadeveloper.com",
    copyright: {
      prefix: "Copyright ©",
      suffix: "All Rights Reserved by",
      company: "Masala Taste of India",
    },
  },
};
