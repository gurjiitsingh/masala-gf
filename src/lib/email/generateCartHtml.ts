export function generateCartHtml(items: { name: string, quantity: number, price: number }[]) {
    let cartHtml = `<h1 style="color: #64870d; background-color: #fadb5e; padding: 15px; border-radius: 10px; text-align: center;">Thank you for your order!</h1>
    <h3 style="font-size: 20px; color: #333333; text-align: center;">Here are the items you ordered:</h3>
    <ul style="padding: 0; list-style-type: none;">`;

items.forEach((item, index) => {
// Alternate background colors for items
const backgroundColor = index % 2 === 0 ? '#f1f1f1' : '#fefefe'; // Change colors here

cartHtml += `
<li style="background-color: ${backgroundColor}; padding: 8px; margin: 1px 0; border-radius: 10px;">
<strong>${item.name}</strong><br>
Quantity: ${item.quantity}<br>
Price: $${item.price}
</li>
`;
});

cartHtml += '</ul>';
return cartHtml;
  }