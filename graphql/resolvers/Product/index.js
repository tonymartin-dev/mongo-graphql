// The Product schema.
import Product from "../../../models/Product";

export default {
  Query: {
    product: (root, args) => {
      return new Promise((resolve, reject) => {
        Product.findById(args._id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    products: () => {
      return new Promise((resolve, reject) => {
        Product.find({})
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    },
    productsByCategory: (root, args) => {
      return new Promise((resolve, reject) => {
        Product.find(args)
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    },
    productsByName: (root, args) => {
      return new Promise((resolve, reject) => {
        Product.find(args)
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    }
  },
  Mutation: {
    addProduct: (root, { _id, name, description, price, category }) => {
      const newProduct = new Product({ _id, name, description, price, category });

      return new Promise((resolve, reject) => {
        newProduct.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    editProduct: (root, { _id, name, description, price, category }) => {
      return new Promise((resolve, reject) => {
        Product.findByIdAndUpdate({ _id }, { $set: { name, description, price, category } }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    deleteProduct: (root, args) => {
      return new Promise((resolve, reject) => {
        Product.findOneAndRemove(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};