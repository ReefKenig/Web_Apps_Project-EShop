const cars = {
  manufacturer: { type: String, required: true },
  brand: { type: String, required: true },
  color: { type: String, required: true },
  yearOfManufacture: {
    type: Number,
    required: true,
    max: new Date().getFullYear(),
  },
  unitsInStock: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 },
  media: {
    pictures: {
      type: [String],
      validate: {
        validator: (v) =>
          v.every((url) =>
            /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp)$/i.test(url)
          ),
        message: "Invalid picture URL format",
      },
    },
    videos: {
      type: [String],
      validate: {
        validator: (v) =>
          v.every((url) => /^https?:\/\/.+\.(mp4|avi|mkv|mov)$/i.test(url)),
        message: "Invalid video URL format",
      },
    },
  },
};

const users = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  orderHistory: [
    {
      orderId: { type: Schema.Types.ObjectId, ref: "orders" },
    },
  ],
  shoppingCart: [
    {
      carId: {
        type: Schema.Types.ObjectId,
        ref: "cars",
        required: true,
      },
      quantity: { type: Number, required: true, default: 1 },
      addedeAt: { type: Date, default: Date.now },
      expiresAt: { type: Date, required: true },
    },
  ],
};

const orders = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  items: [
    {
      carId: {
        type: Schema.Types.ObjectId,
        ref: "cars",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  orderStatus: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  totalCost: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentInfo: {
    paymentMethod: {
      type: String,
      enum: ["Credit Card", "PayPal", "Bank Transfer"],
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
  },
};

const store_info = {
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumbers: [
    {
      type: String,
      required: true,
    },
  ],
  departments: [
    {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
  ],
  openingHours: {
    Sunday: {
      open: { type: String, required: true },
      close: { type: String, required: true },
    },
    Monday: {
      open: { type: String, required: true },
      close: { type: String, required: true },
    },
    Tuesday: {
      open: { type: String, required: true },
      close: { type: String, required: true },
    },
    Wednesday: {
      open: { type: String, required: true },
      close: { type: String, required: true },
    },
    Thursday: {
      open: { type: String, required: true },
      close: { type: String, required: true },
    },
    Friday: {
      open: { type: String, required: true },
      close: { type: String, required: true },
    },
    Saturday: {
      open: { type: String, required: true },
      close: { type: String, required: true },
    },
  },
  additionalInfo: {
    type: String,
  },
};
