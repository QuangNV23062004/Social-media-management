const { default: mongoose } = require("mongoose");
const baseEntitySchema = require("./BaseEntity");

const reportEntitySchema = new mongoose.Schema({
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reportedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
  resolved: {
    type: Boolean,
    default: false,
  },
  ...baseEntitySchema.obj,
});

const Report = mongoose.model("Report", reportEntitySchema);

module.exports = Report;
