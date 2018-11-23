"use strict"

exports.DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://localhost/Mongoose-app-Challenge";
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || "mongodb://localhost/test-Mongoose-app-Challenge";
exports.PORT = process.env.PORT || 4747;
