// The Category schema.
import Category from "../../../models/Category";

export default {
	Query: {
		category: (root, {_id}) => {
			return new Promise((resolve, reject) => {
				Category.findById(_id).exec((err, res) => {
					err ? reject(err) : resolve(res);
				});
			});
		},
		categories: (root, args) => {
      console.log('Searching products.', {args})
      return new Promise((resolve, reject) => {
        Category.find({})
          .limit(args.limit)
          .skip(args.skip)
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    }
	},
	Mutation: {
		addCategory: (root, { _id, name }) => {
      const newCategory = new Category({ _id, name });

      return new Promise((resolve, reject) => {
        newCategory.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
		},
		editCategory: (root, { _id, name }) => {
      return new Promise((resolve, reject) => {
        Category.findByIdAndUpdate({ _id }, { $set: { name } }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
		},
		deleteCategory: (root, args) => {
      return new Promise((resolve, reject) => {
        Category.findOneAndRemove(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
	}
}