const fs = require('fs');

export function createNewOrderFile(){

class AddInfo {}

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
    this.StoreName = "";
  }
}

class ServerData {
  constructor() {
    this.Agent = "";
    this.CreateDateTime = "";
    this.Referer = "";
    this.IpAddress = "";
  }
}

class DeliveryAddress {
  constructor() {
    this.LastName = "";
    this.AddAddress = "";
    this.Company = "";
    this.Zip = "";
    this.Street = "";
    this.Latitude = "";
    this.Country = "";
    this.Longitude = "";
    this.HouseNo = "";
    this.Title = "";
    this.PhoneNo = "";
    this.City = "";
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

  myOrder.AddInfo.PaymentType = 'Barzahlung'; 
  myOrder.AddInfo.DiscountPercent = 10;
  myOrder.AddInfo.Total = 9.18;

  myOrder.ServerData.CreateDateTime = new Date().toISOString();
  myOrder.ServerData.IpAddress = "127.0.0.1";
  myOrder.ServerData.Agent = "Mozilla/5.0";

  myOrder.StoreData.StoreName = 'My online-shop';

  myOrder.Customer.DeliveryAddress.LastName = 'Doe';
  myOrder.Customer.DeliveryAddress.FirstName = 'John';
  myOrder.Customer.DeliveryAddress.Street = 'Hoyaer Straße';
  myOrder.Customer.DeliveryAddress.HouseNo = '13';
  myOrder.Customer.DeliveryAddress.Zip = '28205';
  myOrder.Customer.DeliveryAddress.City = 'Bremen';
  myOrder.Customer.DeliveryAddress.EMail = 'support@winorder.de';
  myOrder.Customer.DeliveryAddress.PhoneNo = '0421-2477828';

  let article = new Article();
  article.Count = 1;
  article.ArticleName = 'Pizza Hawaii';
  article.ArticleSize = 'Mittel (ca. 32cm)';
  article.ArticleNo = 'P22';
  article.Price = 7.8;

  let subArticle1 = new SubArticle();
  subArticle1.ArticleName = 'Schinken';
  subArticle1.Count = 1;
  subArticle1.Price = 0.9;

  let subArticle2 = new SubArticle();
  subArticle2.ArticleName = 'Putenbruststreifen';
  subArticle2.Count = 1;
  subArticle2.Price = 1.5;

  let subArticle3 = new SubArticle();
  subArticle3.Comment = 'hot!';
  subArticle3.Count = 1;

  let comment = new Article();
  comment.Count = 1;
  comment.Comment = 'Testbestellung: Pronto Pronto!';

  article.SubArticleList.SubArticle.push(subArticle1, subArticle2, subArticle3);
  myOrder.ArticleList.Article.push(article, comment);

  let json = JSON.stringify(myOrder, null, 2);
  fs.writeFileSync(`order_${orderID}.json`, json);
  return json;
}

let orderID = Date.now().toString();
let json = createNewOrder(orderID);
//console.log(json);

// fs.open('temp/'+orderID+'.json', 'w', function (err, json) {
//   if (err) throw err;
//   console.log('Saved!');
// });

fs.writeFile('temp/order_'+orderID+'.json', json, function (err) {
  if (err) throw err;
  console.log('Saved!');
});

}