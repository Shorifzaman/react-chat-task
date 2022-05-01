const { model, Schema } = require('mongoose');

const registerSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      // required : true,
      // select : false
    },
    image: {
      type: String,
      default:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgnq9pVEA16U0vH0nT0UeFY9vrTn99Za2a7QWub_dBpXSYTCZtBQULWaaRJ4ENFreEmPc&usqp=CAU',
    },
  },
  { timestamps: true }
);

module.exports = model('user', registerSchema);
