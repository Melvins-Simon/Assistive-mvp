export const products = [
  {
    id: 1,
    name: "Manual Wheelchair",
    category: "mobility",
    price: 12500,
    image:
      "https://www.esleh.com/wp-content/uploads/2023/03/132A9892-scaled.jpg",
    shortDescription: "Lightweight manual wheelchair for daily use",
    description:
      "This manual wheelchair features a lightweight aluminum frame, comfortable padded seat, and adjustable armrests. Suitable for both indoor and outdoor use.",
    specifications: {
      weight: "12 kg",
      maxCapacity: "100 kg",
      material: "Aluminum",
      color: "Blue",
    },
    sellerId: 1,
    reviews: [
      { id: 1, userId: 101, rating: 4, comment: "Good quality for the price" },
      {
        id: 2,
        userId: 102,
        rating: 5,
        comment: "Very comfortable and easy to maneuver",
      },
    ],
  },
  {
    id: 2,
    name: "Hearing Aid Amplifier",
    category: "hearing",
    price: 8500,
    image:
      "https://rukminim2.flixcart.com/image/850/1000/xif0q/hearing-aid/5/d/p/ear-machine-booster-ultra-superior-sound-ear-machine-for-hearing-original-imagwxehqrpeytcv.jpeg?q=90&crop=false",
    shortDescription: "Digital hearing amplifier with noise reduction",
    description:
      "This digital hearing amplifier features advanced noise reduction technology and adjustable volume control. Comes with rechargeable batteries and carrying case.",
    specifications: {
      batteryLife: "30 hours",
      chargingTime: "3 hours",
      weight: "15 g",
      color: "Beige",
    },
    sellerId: 2,
    reviews: [
      { id: 3, userId: 103, rating: 3, comment: "Works well but a bit bulky" },
    ],
  },
  {
    id: 3,
    name: "Talking Calculator",
    category: "vision",
    price: 3200,
    image:
      "https://disabilityconnect.co.za/wp-content/uploads/2020/07/image-1-6.png",
    shortDescription: "Audio output calculator for visually impaired",
    description:
      "This talking calculator announces each button pressed and the calculation results. Features large buttons and adjustable volume.",
    specifications: {
      power: "2x AAA batteries",
      dimensions: "15 x 10 x 2 cm",
      weight: "200 g",
      color: "Black",
    },
    sellerId: 3,
    reviews: [
      { id: 4, userId: 104, rating: 5, comment: "Very helpful for my studies" },
    ],
  },
  {
    id: 4,
    name: "Walking Cane",
    category: "mobility",
    price: 2500,
    image:
      "https://lhblind.org/wp-content/uploads/2021/10/AdobeStock_231187109-web_835x555_opt.jpg",
    shortDescription: "Adjustable aluminum walking cane",
    description:
      "Lightweight yet sturdy walking cane with adjustable height from 85cm to 95cm. Features ergonomic handle and anti-slip rubber tip.",
    specifications: {
      material: "Aluminum",
      adjustable: "Yes",
      maxWeight: "120 kg",
      color: "Silver",
    },
    sellerId: 1,
    reviews: [
      {
        id: 5,
        userId: 105,
        rating: 4,
        comment: "Good support and easy to adjust",
      },
    ],
  },
  {
    id: 5,
    name: "Braille Writing Slate",
    category: "vision",
    price: 1800,
    image:
      "https://ae01.alicdn.com/kf/S7f0fa8796d804ba1bc7e9f952c0a964ea.jpg_640x640q90.jpg",
    shortDescription: "4-line braille writing slate with stylus",
    description:
      "Classic braille writing tool made of durable plastic. Includes stylus and can produce up to 4 lines of braille text at once.",
    specifications: {
      lines: 4,
      cellsPerLine: 28,
      material: "Plastic",
      included: "Stylus",
    },
    sellerId: 2,
    reviews: [
      {
        id: 6,
        userId: 106,
        rating: 5,
        comment: "Perfect for beginners learning braille",
      },
    ],
  },
  {
    id: 6,
    name: "Grip Utensil Set",
    category: "daily-living",
    price: 3500,
    image:
      "https://media.post.rvohealth.io/wp-content/uploads/2024/01/cutlery-utensils-grip-disability-732x549-thumbnail.jpg",
    shortDescription: "Ergonomic eating utensils for limited hand mobility",
    description:
      "Set of 3 utensils (fork, knife, spoon) with easy-grip handles designed for people with limited hand strength or dexterity.",
    specifications: {
      pieces: 3,
      material: "Stainless steel heads, rubber handles",
      dishwasherSafe: "Yes",
      colors: "Assorted",
    },
    sellerId: 3,
    reviews: [
      {
        id: 7,
        userId: 107,
        rating: 4,
        comment: "Made eating much easier for my father",
      },
    ],
  },
];
