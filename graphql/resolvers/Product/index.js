// The Product schema.
import Product from "../../../models/Product";
import * as auth from '../../../auth/auth'

//UTILS
const productsAndCountPromise = (_promisesArray)=>{
  return new Promise((resolve, reject)=>{
    Promise.all(_promisesArray)
      .then(([products, count],err)=>{
        const formattedResponse = { products, count }
        console.log('[Response]: productsAndCount', { products, count })
        err ? reject(err) : resolve(formattedResponse);
      })
  });
}

const countByQuery = (_query, context)=>{
  console.log('[Query]: countByQuery')
    auth.validateAuthorization(context.headers);
    return new Promise((resolve, reject) => {
    Product.countDocuments(_query)
      .exec((err, res) => {
        console.log('[Response]: productsCount', res)
        err ? reject(err) : resolve(res);
      });
  });
}

//QUERIES
const product = (root, args, context) => {
  auth.validateAuthorization(context.headers);
  return new Promise((resolve, reject) => {
    Product.findById(args._id).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
}

const products = (root, args, context) => {
  console.log('[Query]: products', args);
  auth.validateAuthorization(context.headers);
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
}

const productsAndCount = (root, args, context) => {
  console.log('[Query]: productsAndCount');
  return productsAndCountPromise([products(root, args, context), productsCount(root, args, context)])
}

const productsByCategory = (root, args, context) => {
  console.log('[Query]: productsByCategory', args)
  auth.validateAuthorization(context.headers);
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
}

const productsByCategories = (root, args, context) => {
  let categories = [];
  args.categories.forEach(category=>categories.push({category}));
  const query = { $or: categories };
  
  console.log('[Query]: productsByCategories',{query});
  auth.validateAuthorization(context.headers);
  return new Promise((resolve, reject) => {
    Product.find(query)
      .limit(args.limit)
      .skip(args.skip)
      .populate()
      .exec((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  
}

const productsByCategoriesAndCount = (root, args) => {
  console.log('[Query]: productsByCategoriesAndCount');
  return productsAndCountPromise([productsByCategories(root, args), productsByCategoriesCount(root, args)])
}

const productsByName = (root, args) => {
  const searchQuery =  RegExp(`.*${args.name}.*`, 'i');

  console.log('[Query]: productsByName', {searchQuery}, context);
  auth.validateAuthorization(context.headers);
  return new Promise((resolve, reject) => {
    Product.find({name: searchQuery})
      .limit(args.limit)
      .skip(args.skip)
      .populate()
      .exec((err, res) => {
        err ? reject(err) : resolve(res);
      });
  });
}

const productsByNameAndCount = (root, args, context) => {
  const searchQuery =  RegExp(`.*${args.name}.*`, 'i');

  console.log('[Query]: productsByNameAndCount', {searchQuery});
  return productsAndCountPromise([productsByName(root, args), countByQuery({name: searchQuery}, context)])
  
}

const productsCount = (root, args, context) => {
  console.log('[Query]: productsCount');
  return countByQuery({}, context)
}

const productsByCategoriesCount = (root, args, context) => {
  let categories = [];
  args.categories.forEach(category=>categories.push({category}));
  const query = { $or: categories };
  
  console.log('[Query]: productsByCategoriesCount',{query}); 
  return countByQuery(query, context);
}

//MUTATIONS

const addProduct= (root, { _id, name, description, price, category }, context) => {
  const newProduct = new Product({ _id, name, description, price, category });
  console.log('[Query]: addProduct');
  auth.validateAuthorization(context.headers);
  return new Promise((resolve, reject) => {
    newProduct.save((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
}

const editProduct= (root, { _id, name, description, price, category }) => {
  return new Promise((resolve, reject) => {
    Product.findByIdAndUpdate({ _id }, { $set: { name, description, price, category } }).exec(
      (err, res) => {
        err ? reject(err) : resolve(res);
      }
    );
  });
}

const deleteProduct= (root, args) => {
  return new Promise((resolve, reject) => {
    Product.findOneAndRemove(args).exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
}

export default {
  Query: {
    product,
    products,
    productsAndCount,
    productsByCategory,
    productsByCategories,
    productsByCategoriesAndCount,
    productsByName,
    productsByNameAndCount,
    productsCount,
    productsByCategoriesCount
  },
  Mutation: {
    addProduct,
    editProduct,
    deleteProduct
  }
};

