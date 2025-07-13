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

  // Text from cart component
  cart_heading: "Warenkorb-Summe.",
  add_coupon_button: "Fügen Sie einen Gutschein hinzu",
  subtotal_label: "Zwischensumme",
  pickup_button: "Abholen",
  delivery_button: "Lieferung",
  total_label: "Gesamt",
  no_offers_checkbox: "Ich möchte keine E-Mails über neue Angebote und Rabatte erhalten.",
  no_offers_alert_line1:
    "Sie haben gewählt, keine E-Mails über neue Angebote und Rabatte zu erhalten. Wenn Sie E-Mails erhalten möchten, deaktivieren Sie das Kontrollkästchen.",
  no_offers_alert_line2:
    "You have selected not to receive emails about new offers and discounts. If you want to receive such emails, please uncheck the box.",
  place_order_button: "Place",
  order_button_suffix: "Order",
  placing_order_text: "Placing Order...",

  // Address form
  address_section_title: "Adresse",
  email_label: "Email",
  mobile_label: "Mob no.",
  first_name_label: "First name",
  last_name_label: "Last name",
  street_label: "Straße",
  street_number_label: "Straße Hausnr",
  postal_code_label: "Postleitzahl",
  use_address_button_prefix: "Use",
  use_address_button_suffix: "Address",

  // Payment method section
  payment_method_title: "Zahlungsart auswählen",
  payment_method_cod: "Barzahlung bei Lieferung",
  
  // Search section
  search_dish_or_category: "Gericht suchen oder Kategorie auswählen",

  // Mini cart sidebar
  cart_sidebar_title: "Dein Warenkorb",
  checkout_button: "Kasse",
  empty_cart_message: "Warenkorb ist leer",
  shop_more_button: "Mehr einkaufen",
  discount_hint_checkout: "Rabatt in der Kasse ansehen",

  // Order complete
  order_complete_heading: "Ihre Bestellung ist abgeschlossen",
  pickup_time: "Abholen: 20–25 Minuten",
  delivery_time: "Lieferzeit: 40–55 Minuten",
shop_more_button_order_complete: "Mehr einkaufen",
};

export const SEO = {
  title: "Masala – Indisches Restaurant in Gifhorn, Niedersachsen",
  description:
    "Genießen Sie authentische indische Küche bei Masala in Gifhorn. Jetzt online bestellen oder vor Ort besuchen.",
};
