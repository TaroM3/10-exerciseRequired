const express = require("express");
const chatRouter = require("./router/chat.router");
const productRouter = require("./router/products.router");
const cartRouter = require("./router/carts.router");
const homeRouter = require("./router/home.router");
const realTimeProductsRouter = require("./router/realTimeProducts.router");
const productForm = require("./router/productForm.router");
const handlebars = require("express-handlebars");
const { Server, Socket } = require("socket.io");
const server = express();
const ProductManager = require("./Dao/helpers/ProductManager");
// import mongoose from 'mongoose'
const mongoose = require("mongoose");
const productModel = require("./Dao/models/product.model");
const messageModel = require("./Dao/models/message.model");
/*server.use((req, res, next) => {
    console.log('Time: ', new Date().toLocaleString())
    next()
})*/

//   await productModel.create(
//     {
//       title: "Indonesian Book",
//       description: "Learn Indonesian Language",
//       code: "1574IN",
//       price: 129,
//       status: true,
//       stock: 12456,
//       category: "Books",
//       thumbnails: ["http://dummyimage.com/209x100.png/ff4444/ffffff"],
//     }
//   );

///////////////////////////////////////////////////////////////////
//   let productsCollection = [];
//   productsCollection = await productModel.find();
//   console.log(JSON.stringify(productsCollection, null, "\t"));
//   console.log(productsCollection[0]._id.toString());
///////////////////////////////////////////////////////////////////

// console.log(productsCollection.)
// console.log(JSON.stringify(productsCollection.title , null , '\t'))

const httpServer = server.listen(8080, () => console.log("Server Up"));
const io = new Server(httpServer);
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.engine("handlebars", handlebars.engine());
server.set("views", "src/views");
server.set("view engine", "handlebars");

server.use("/home", homeRouter);

server.use(express.static("src/views"));
server.use("/", productForm);

server.use("/realTimeProducts", realTimeProductsRouter);

//server.use('')
server.use("/api/products", productRouter);

//server.use('/products/:pid', productRouter)

server.use("/api/carts", cartRouter);

server.use("/chat", chatRouter);

const uri =
  "mongodb+srv://taromelillo:Hw8C2a43e6CXWHK6@cluster0.4lcw6qm.mongodb.net/";

const main = async () => {
  await mongoose.connect(uri, {
    dbName: "ecommerce",
  });
  console.log("-----DB connected----");

  const products = new ProductManager();
  let messages = [];

  io.on("connection", (socket) => {
    console.log(
      "Time: ",
      new Date().toLocaleString() + " Client socket " + socket.id + " connected"
    );
    socket.on("productAdded", async (data) => {
      let product = await productModel.create({
        title: data.product.title,
        description: data.product.description,
        code: data.product.code,
        price: data.product.price,
        status: data.product.status,
        stock: data.product.stock,
        category: data.product.category,
        thumbnails: data.product.thumbnails,
      });
      //   products.addProduct(data.product);
      io.emit("logs", product);
    });
    socket.on("delete", async(id) => {
      console.log(id.id);
     await productModel.findByIdAndDelete(id.id)
      //products.deleteProductById(id.id);
      console.log("Deleting Product...");
      io.emit("productDeleted", id);
    });
    socket.on("message", async (data) => {
      await messageModel.create({
        user: data.user,
        message: data.message,
      });
      console.log(data);
      messages.push(data);
      //console.log(messages)
      io.emit("conversations", data);
    });
  });
};

main();
/*socket.on('message', data => {
            io.emit('logs', data) 
        })*/
