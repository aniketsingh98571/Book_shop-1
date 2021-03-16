const getDb = require("../util/database").getDb;
class Product {
  constructor(bookName, bookImage, bookGenre, bookCost, bookDate) {
    this.bookName = bookName;
    this.bookImage = bookImage;
    this.bookGenre = bookGenre;
    this.bookCost = bookCost;
    this.bookDate = bookDate;
  }
  save() {
    const db = getDb();
    return db
      .collection("book")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();

    return db
      .collection("book")
      .find()
      .toArray()
      .then((products) => {
          console.log(products);
          return products;
      })
      .catch(err => {
          console.log(err);
      });
  }

}
module.exports = Product;