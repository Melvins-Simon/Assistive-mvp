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
  // Added products
  {
    id: 7,
    name: "Commode Chair",
    category: "daily-living",
    price: 7800,
    image: "https://m.media-amazon.com/images/I/61NlH5+f0UL._AC_SL1500_.jpg",
    shortDescription: "Portable commode chair for bathroom assistance",
    description:
      "A sturdy and portable commode chair designed for individuals needing assistance with toileting. Features a durable frame, comfortable seat, and easy-to-clean bucket.",
    specifications: {
      material: "Steel frame, plastic seat",
      maxCapacity: "135 kg",
      dimensions: "50 x 55 x 80 cm",
      foldable: "Yes",
    },
    sellerId: 1,
    reviews: [
      {
        id: 8,
        userId: 108,
        rating: 5,
        comment: "Very helpful and discreet for home use.",
      },
    ],
  },
  {
    id: 8,
    name: "Large Print Keyboard",
    category: "vision",
    price: 4500,
    image: "https://m.media-amazon.com/images/I/71u9sW4j23L._AC_SL1500_.jpg",
    shortDescription: "High-contrast keyboard with oversized letters",
    description:
      "This keyboard features extra-large, high-contrast print on the keys, making it easier for individuals with low vision to see and type. Compatible with most computers.",
    specifications: {
      layout: "QWERTY",
      connectivity: "USB",
      color: "Black with white letters",
      keys: "104",
    },
    sellerId: 2,
    reviews: [
      {
        id: 9,
        userId: 109,
        rating: 4,
        comment: "Great for my elderly parents, they can finally see the keys!",
      },
    ],
  },
  {
    id: 9,
    name: "Automatic Pill Dispenser",
    category: "daily-living",
    price: 6500,
    image: "https://m.media-amazon.com/images/I/71239c0Z2BL._AC_SL1500_.jpg",
    shortDescription: "Timed pill dispenser with alarms",
    description:
      "An electronic pill dispenser with multiple compartments and programmable alarms to help manage medication schedules. Ensures correct dosage at the right time.",
    specifications: {
      compartments: 28,
      alarms: "Up to 6 daily",
      battery: "4x AA batteries",
      material: "Durable plastic",
    },
    sellerId: 3,
    reviews: [
      {
        id: 10,
        userId: 110,
        rating: 5,
        comment: "Essential for managing multiple medications, highly recommend.",
      },
    ],
  },
  {
    id: 10,
    name: "Adjustable Shower Chair",
    category: "daily-living",
    price: 5900,
    image: "https://m.media-amazon.com/images/I/611jE-Vd2KL._AC_SL1500_.jpg",
    shortDescription: "Non-slip shower chair with adjustable height",
    description:
      "Provides a safe and comfortable seating option in the shower for individuals with mobility challenges. Features non-slip rubber feet and adjustable height settings.",
    specifications: {
      material: "Aluminum frame, plastic seat",
      maxCapacity: "113 kg",
      heightAdjust: "35-50 cm",
      assembly: "Easy, tool-free",
    },
    sellerId: 1,
    reviews: [
      {
        id: 11,
        userId: 111,
        rating: 4,
        comment: "Improved my showering experience significantly.",
      },
    ],
  },
  {
    id: 11,
    name: "One-Handed Jar Opener",
    category: "daily-living",
    price: 1500,
    image: "https://m.media-amazon.com/images/I/51b+zX6iV4L._AC_SL1000_.jpg",
    shortDescription: "Under-cabinet jar and bottle opener",
    description:
      "Mounts under the cabinet, allowing for one-handed opening of stubborn jars and bottles. Ideal for individuals with limited hand strength or dexterity.",
    specifications: {
      installation: "Adhesive or screws",
      material: "Durable plastic",
      color: "White",
      compatibility: "Various lid sizes",
    },
    sellerId: 2,
    reviews: [
      {
        id: 12,
        userId: 112,
        rating: 5,
        comment: "A simple tool that makes a huge difference!",
      },
    ],
  },
  {
    id: 12,
    name: "Vibrating Alarm Clock",
    category: "hearing",
    price: 4200,
    image: "https://m.media-amazon.com/images/I/71R2cZ5b6EL._AC_SL1500_.jpg",
    shortDescription: "Loud alarm clock with bed shaker for heavy sleepers/deaf",
    description:
      "This alarm clock combines a loud audible alarm with a powerful bed shaker, perfect for individuals with hearing impairments or heavy sleepers. Features snooze function and adjustable brightness.",
    specifications: {
      alarmType: "Audio, Vibration",
      power: "AC adapter with battery backup",
      display: "LED",
      color: "Black",
    },
    sellerId: 3,
    reviews: [
      {
        id: 13,
        userId: 113,
        rating: 5,
        comment: "Finally, an alarm that can wake me up!",
      },
    ],
  },
  {
    id: 13,
    name: "Reacher Grabber Tool",
    category: "daily-living",
    price: 2800,
    image: "https://m.media-amazon.com/images/I/61k1qP1YfEL._AC_SL1500_.jpg",
    shortDescription: "Long-handled grabber for extended reach",
    description:
      "A lightweight and durable reacher tool with an ergonomic handle and rotating jaw. Helps individuals pick up items from the floor or high shelves without bending or stretching.",
    specifications: {
      length: "81 cm (32 inches)",
      material: "Aluminum, plastic",
      grip: "Rubberized jaw",
      foldable: "No",
    },
    sellerId: 1,
    reviews: [
      {
        id: 14,
        userId: 114,
        rating: 4,
        comment: "Very useful for everyday tasks, especially for seniors.",
      },
    ],
  },
  {
    id: 14,
    name: "Tactile Watch",
    category: "vision",
    price: 9500,
    image: "https://m.media-amazon.com/images/I/61n-h3M+1jL._AC_SL1500_.jpg",
    shortDescription: "Watch with raised markers for blind individuals",
    description:
      "A stylish and functional watch designed for the visually impaired. Features raised tactile markers and a hinged crystal that opens to allow touch-reading of the time.",
    specifications: {
      movement: "Quartz",
      material: "Stainless steel case, leather strap",
      display: "Tactile",
      waterResistant: "Yes",
    },
    sellerId: 2,
    reviews: [
      {
        id: 15,
        userId: 115,
        rating: 5,
        comment: "Beautiful and practical, a truly empowering product.",
      },
    ],
  },
  {
    id: 15,
    name: "Wheelchair Ramp (Portable)",
    category: "mobility",
    price: 25000,
    image: "https://m.media-amazon.com/images/I/71r6T12T2LL._AC_SL1500_.jpg",
    shortDescription: "Lightweight folding ramp for wheelchair access",
    description:
      "A portable and lightweight ramp designed for easy wheelchair access over steps or thresholds. Folds compactly for transport and storage.",
    specifications: {
      length: "90 cm (3 ft)",
      material: "Aluminum",
      maxCapacity: "272 kg",
      foldable: "Yes",
    },
    sellerId: 3,
    reviews: [
      {
        id: 16,
        userId: 116,
        rating: 4,
        comment: "Essential for accessible entryways, very sturdy.",
      },
    ],
  },
];