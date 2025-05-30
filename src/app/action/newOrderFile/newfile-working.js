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
  deliveryType,       // NEW PARAM
  customerNote,       // NEW PARAM
  couponCode,         // NEW PARAM
  couponDiscount      // NEW PARAM
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

  class OrderList {
    constructor() {
      this.Order = [];
      this.CreateDateTime = "";
    }
  }

  class EShopOrder {
    constructor() {
      this.OrderList = new OrderList();
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
      myOrder.ArticleList.Article.push(article);
    }

    const shopOrder = new EShopOrder();
    shopOrder.OrderList.Order.push(myOrder);
    shopOrder.OrderList.CreateDateTime = new Date().toISOString();

    let json = JSON.stringify(shopOrder, null, 2);
    fs.writeFile("temp/order_" + orderID + ".json", json, function (err) {
      if (err) throw err;
      console.log("Saved!");
    });

    return json;
  }

  let orderID = Date.now().toString();
  let json = createNewOrder(orderID);
  return "success";
}
