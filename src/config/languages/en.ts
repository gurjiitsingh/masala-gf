export const TEXT = {
  home_page_offer: "", // fallback for DB-driven value
  offer_instruction: "", // fallback for DB-driven value
  delivery_note: "Delivery is also available.",
  home_page_disclaimer: "Food may differ from image.",
  logo_alt: "Logo",
  brand: "Masala",
  tag_line: "Taste of India",
  brand_name: "Masala Taste of India",

  menu_list: [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "Table Reservation", link: "/reservation" },
  ],

  menu: [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "Table Reservation", link: "/reservation" },
  ],

  sections: {
    links: {
      title: "Links",
      items: [
        { name: "Home", href: "/" },
        { name: "Menu", href: "/" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Reservation", href: "/reservation" },
        { name: "Allergens", href: "/allergene" },
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
  cart_heading: "Cart Total",
  add_coupon_button: "Add a coupon",
  subtotal_label: "Subtotal",
  pickup_button: "Pickup",
  delivery_button: "Delivery",
  total_label: "Total",
  no_offers_checkbox:
    "I do not want to receive emails about new offers and discounts.",
  no_offers_alert_line1:
    "You have chosen not to receive emails about new offers and discounts. If you wish to receive emails, please uncheck the box.",
  no_offers_alert_line2:
    "You have selected not to receive emails about new offers and discounts. If you want to receive such emails, please uncheck the box.",
  place_order_button: "Place",
  order_button_suffix: "Order",
  placing_order_text: "Placing Order...",

  // Text from address form component
  address_section_title: "Address",
  email_label: "Email",
  mobile_label: "Mob no.",
  first_name_label: "First name",
  last_name_label: "Last name",
  street_label: "Street",
  street_number_label: "Street + House No.",
  postal_code_label: "Postal Code",
  use_address_button_prefix: "Use",
  use_address_button_suffix: "Address",

  // Payment method section
  payment_method_title: "Select Payment Method",
  payment_method_cod: "Cash on Delivery",

  // Search section
  search_dish_or_category: "Search dish or select category",

  // Mini cart sidebar
  cart_sidebar_title: "Your Cart",
  checkout_button: "Checkout",
  empty_cart_message: "Cart is empty",
  shop_more_button: "Shop More",
  discount_hint_checkout: "See discount at checkout",

  // Order complete

  order_complete_heading: "Your order is complete",
  pickup_time: "Pickup: 20–25 minutes",
  delivery_time: "Delivery time: 40–55 minutes",

  // toast error message
  error_select_payment_type: "Select payment type",
  error_select_address: "Select address",
  error_address_not_deliverable: "We cannot deliver to this address. Please choose pickup.",
  error_min_purchase_coupon: "Minimum purchase amount to get the discount is",
  error_min_purchase_suffix: ", remove the coupon or add more items to the cart",
  error_min_order_delivery: "Minimum order amount for delivery is",
  error_unexpected_total: "Unexpected error calculating order total. Please refresh or try again.",
  error_empty_cart: "The cart is empty, please add some items",

  // Add aleart confirm products
  confirm_delete_product: "Do you want to delete this product?\nIf yes, click OK.\nIf not, click Cancel.",
error_delete_failed: "Error: ",
error_unexpected_delete: "An unexpected error occurred while deleting.",
status_featured: "Featured",
button_variants: "Variants",

category_delete_with_products_alert: "This category still contains products ({count}).\nPlease delete all products first before deleting the category.",
confirm_delete_category: "Are you sure you want to delete the category?\nIf yes, click OK.\nIf not, click Cancel.",
featured_label: "Featured",
view_products_button: "View Products", 

// Coupon Table UI - English
confirm_delete_coupon: "Are you sure you want to delete the coupon?\nIf yes, click OK.\nIf not, click Cancel.",
discount_type_flat: "Flat",
discount_type_percent: "Percent",
fallback_dash: "—",  

confirm_delete_delivery: "Do you want to delete this delivery?\nIf yes, click OK.\nIf not, click Cancel.",

confirm_delete_flavor: "Do you want to delete this flavor?\nIf yes, click OK.\nIf not, click Cancel.",

confirm_delete_order: "Do you want to delete this order?",

confirm_delete_addon: "Do you want to delete this add-on?\nIf yes, click OK.\nIf not, click Cancel.",

confirm_delete_reservation: "Do you want to delete this reservation?",
delete_reservation: "Delete Reservation",
loading: "Loading...",
no_reservations: "No reservations found.",
pagination_newer: "Newer",
pagination_older: "Older",
name: "Name",
email: "Email",
phone: "Phone",
date: "Date",
time: "Time",
guests: "Guests",
message: "Message",
created: "Created",
action: "Action",


confirm_delete_user: "Do you want to delete this user?\nIf yes, click OK.\nIf not, click Cancel.",
alert_failed_delete: "Failed to delete user.",
aria_delete_user: "Delete User",


};

export const SEO = {
  title: "Masala – Indian Restaurant in Gifhorn, Lower Saxony",
  description:
    "Authentic Indian food at Masala Gifhorn. Order online for delivery or visit us in Lower Saxony.",
};
