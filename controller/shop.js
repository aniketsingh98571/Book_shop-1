const moment = require("moment");
const Product = require("../models/product");

exports.homePage = (req, res, next) => {
  res.render("home_page.ejs");
};

exports.productPage = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      console.log("Displaying all the products");
      console.log(products);
      res.render("products.ejs", { product_list: products });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addProducts = (req, res, next) => {
  res.render("addProducts.ejs");
};

//module for add product logic for post request

exports.postAddProducts = (req, res, next) => {
  console.log("displaying the client req");
  console.log(req.body);
  let DescriptionBuffer = [];

  //Adding the dynamic date
  const date = moment(new Date()).format("YYYY/MM/DD");
  const price = req.body.bookCost;
  const imagesrc = req.body.bookImage;
  const name = req.body.bookName;
  const bookAuthors = req.body.bookAuthors;
  const bookDescription = req.body.bookDescription;
  const bookTotalPages = req.body.bookTotalPages;
  const bookReviews = {
    authorReview: req.body.bookReviews
  }
  //creating the blue print to store as object
  const genre = {
    genreHorror: 0,
    genreTechnology: 0,
    genreRomance: 0,
    genreThriller: 0,
    genreComedy: 0,
    genreSciFi: 0,
    genreEncyclopedia: 0,
    genreMotivation: 0,
  };
  //as iterator
  let hold_left;
  //logic to make all the present key as 1 and absent key as 0
  for (hold_left in genre) {
    if (hold_left in req.body) {
      genre[hold_left] = 1;
    } else {
      genre[hold_left] = 0;
    }
  }
  product = new Product(
    name,
    imagesrc,
    bookDescription,
    bookAuthors,
    genre,
    bookTotalPages,
    price,
    date,
    bookReviews
  );
  product
    .save()
    .then((result) => {
      console.log("Product have been created successfully");
      res.redirect("../");
    })
    .catch((err) => {
      console.log(err);
    });
};
