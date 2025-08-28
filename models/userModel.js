// import { Model, DataTypes } from "sequelize";
// import { sequelize } from "../config/db.config.js";

// export class User extends Model {}

// User.init(
//   {
//     username: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING
//   },
//   {
//     sequelize,
//     modelName: "User",
//   }
// );



// import { Model, DataTypes } from "sequelize";
// import { sequelize } from "../config/db.config.js";
// import Product from "./product.js"; // import product

// export class User extends Model {}

// User.init(
//   {
//     username: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//   },
//   {
//     sequelize,
//     modelName: "User",
//     tableName: "users", // 👈 force lowercase
//   }
// );

// // Association
// User.hasMany(Product, { foreignKey: "userId" });



// import { Model, DataTypes } from "sequelize";
// import { sequelize } from "../config/db.config.js";

// class User extends Model {}

// User.init(
//   {
//     username: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//   },
//   {
//     sequelize,
//     modelName: "User",
//   }
// );

// export default User;



import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Username is required" },
        len: { args: [3, 20], msg: "Username must be 3-20 characters" }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "Invalid email format" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { args: [6], msg: "Password must be at least 6 characters" }
      }
    }
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
