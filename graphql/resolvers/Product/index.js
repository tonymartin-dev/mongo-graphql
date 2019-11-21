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
    products: (root, args) => {
      console.log('[Query]: products', args)
      return new Promise((resolve, reject) => {
        Product.find({})
          .limit(args.limit)
          .skip(args.skip)
          .populate()
          .exec((err, res) => {
            console.log('[Response]: products.', res)
            err ? reject(err) : resolve(res);
          });
      });
    },
    productsByCategory: (root, args) => {
      console.log('[Query]: productsByCategory', args)
      return new Promise((resolve, reject) => {
        Product.find({category: args.category})
          .limit(args.limit)
          .skip(args.skip)
          .populate()
          .exec((err, res) => {
            console.log('[Response]: productsByCategory', res)
            err ? reject(err) : resolve(res);
          });
      });
    },
    productsByCategories: (root, args) => {
      let categories = [];
      args.categories.forEach(category=>categories.push({category}));
      const query = { $or: categories };
      
      console.log('[Query]: productsByCategories',{query});
      return new Promise((resolve, reject) => {
        Product.find(query)
          .limit(args.limit)
          .skip(args.skip)
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
        });
      
    },
    productsByCategoriesAndCount: (root, args) => {
      let categories = [];
      args.categories.forEach(category=>categories.push({category}));
      const query = { $or: categories };
      
      const countPromise = Product.countDocuments(query).exec();
      const productsPromise = Product.find(query)
        .limit(args.limit)
        .skip(args.skip)
        .populate()
        .exec();
      
      console.log('[Query]: productsByCategoriesAndCount',{query});
      return new Promise((resolve, reject)=>{
        Promise.all([productsPromise, countPromise]).then((res,err)=>{
          const formattedResponse = {
            products: res[0],
            count: res[1]
          }
          console.log('[Response]: productsByCategoriesCount', res)
          err ? reject(err) : resolve(formattedResponse);
        })
      });
    },
    productsByName: (root, {name}) => {
      const searchQuery =  RegExp(`.*${name}.*`, 'i');

      console.log('[Query]: productsByName', {searchQuery});
      return new Promise((resolve, reject) => {
        Product.find({name: searchQuery})
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    },
    productsCount: (root, args) => {
      console.log('[Query]: productsCount')
      return new Promise((resolve, reject) => {
        Product.countDocuments({})
          .exec((err, res) => {
            console.log('[Response]: productsCount', res)
            err ? reject(err) : resolve(res);
          });
      });
    },
    productsByCategoriesCount: (root, args) => {
      let categories = [];
      args.categories.forEach(category=>categories.push({category}));
      const query = { $or: categories };
      
      console.log('[Query]: productsByCategoriesCount',{query}); 
      return new Promise((resolve, reject) => {
        Product.countDocuments(query)
          .exec((err, res) => {
            console.log('[Response]: productsByCategoriesCount', res)
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