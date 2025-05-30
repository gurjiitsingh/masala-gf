"use server";
import fs from "fs";

export async function createNewOrderFile(
  cartData,
  address,
  endTotalG,
  productTotalCost,
  totalDiscountG,
  PaymentType,
  deliveryCost,
  deliveryType,
  customerNote,
  couponCode,
  couponDiscount,
  tableNumber = "",
  waiterName = "",
  customerId = "",
  orderSource = "",
  deliveryTime = "",
  pickupTime = "",
  loyaltyPointsUsed = 0,
  loyaltyPointsEarned = 0
) {
  const customAddress = JSON.parse(address);

  class AddInfo {
    constructor() {
      this.PaymentType = PaymentType;
      this.DiscountPercent = totalDiscountG;
      this.Total = endTotalG;
      this.DeliveryType = deliveryType || "";
      this.CustomerNote = customerNote || "";
      this.CouponCode = couponCode || "";
      this.CouponDiscount = couponDiscount || 0;
      this.TableNumber = tableNumber;
      this.WaiterName = waiterName;
      this.CustomerID = customerId;
      this.OrderSource = orderSource;
      this.DeliveryTime = deliveryTime;
      this.PickupTime = pickupTime;
      this.LoyaltyPointsUsed = loyaltyPointsUsed;
      this.LoyaltyPointsEarned = loyaltyPointsEarned;
    }
  }

  class SubArticle {
    constructor() {
      this.Comment = "";
      this.Price = "";
      this.Count = "";
    }
  }

  class SubArticleList {
    constructor() {
      this.SubArticle = [];
    }
  }

  class Article {
    constructor() {
      this.Price = "";
      this.ArticleSize = "";
      this.ArticleName = "";
      this.ArticleNo = "";
      this.SubArticleList = new SubArticleList();
      this.Count = "";
    }
  }

  class ArticleList {
    constructor() {
      this.Article = [];
    }
  }

  class StoreData {
    constructor() {
      this.StoreId = "";
      this.StoreName = "Masala app";
    }
  }

  class ServerData {
    constructor() {
      this.Agent = "Mozilla/5.0";
      this.CreateDateTime = new Date().toISOString();
      this.Referer = "";
      this.IpAddress = "127.0.0.1";
    }
  }

  class DeliveryAddress {
    constructor() {
      this.LastName = customAddress.lastName;
      this.AddAddress = "";
      this.Company = "";
      this.Zip = customAddress.zipCode;
      this.Street = customAddress.addressLine1;
      this.Latitude = "";
      this.Country = "Germany";
      this.Longitude = "";
      this.HouseNo = customAddress.addressLine2;
      this.Title = "";
      this.PhoneNo = customAddress.mobNo;
      this.City = customAddress.city;
      this.FirstName = customAddress.firstName;
      this.EMail = customAddress.email;
    }
  }

  class Customer {
    constructor() {
      this.DeliveryAddress = new DeliveryAddress();
    }
  }

  class Order {
    constructor(orderID) {
      this.AddInfo = new AddInfo();
      this.OrderID = orderID;
      this.ArticleList = new ArticleList();
      this.StoreData = new StoreData();
      this.ServerData = new ServerData();
      this.Customer = new Customer();
    }
  }

  function createNewOrder(orderID) {
    let myOrder = new Order(orderID);

    cartData.map((item, i) => {
      let article = new Article();
      article.Count = item.quantity;
      article.ArticleName = item.name;
      article.ArticleSize = item.productDesc;
      article.ArticleNo = i + 1;
      article.Price = item.price;
      myOrder.ArticleList.Article.push(article);
    });

    if (deliveryCost !== 0) {
      let article = new Article();
      article.ArticleName = "Lieferpauschale";
      article.Price = deliveryCost;
      article.ArticleNo = cartData.length + 1;
      article.Count = 1;
      myOrder.ArticleList.Article.push(article);
    }

    const json = JSON.stringify(myOrder, null, 2);
    fs.writeFile("temp/order_" + orderID + ".json", json, function (err) {
      if (err) throw err;
      console.log("Saved!");
    });

    return json;
  }

  const orderID = Date.now().toString();
  const json = createNewOrder(orderID);
  return "success";
}
