// Speciality Component Data
export const speciality = [
    {
        img: "/Images/dish-2.png",
        title: "Indian Cusine",
        description: "Indian cuisine is a rich tapestry of flavors, spices, and aromas. Known for its diverse regional specialties, it features aromatic curries, tandoori-cooked meats, and an array of vegetarian dishes such as dal and paneer. The use of spices like cumin, coriander, and turmeric creates a symphony of taste, making Indian cuisine a delightful and culturally significant culinary experience."
    },
    {
        img: "/Images/dish-2.png",
        title: "Italian Cusine",
        description: "Italian cuisine is a celebration of simplicity and quality ingredients. Renowned for its pasta, pizza, and olive oil-infused dishes, it captures the essence of Mediterranean flavors. From rich risottos to flavorful sauces like marinara and pesto, Italian cooking emphasizes fresh produce, herbs, and cheeses. With a focus on family-style dining, it creates a warm and inviting culinary experience."
    },
    {
        img: "/Images/dish-2.png",
        title: "Mexican Cusine",
        description: "Mexican cuisine is a vibrant fusion of bold flavors and spices. Known for its diverse dishes, such as tacos, enchiladas, and guacamole, it incorporates ingredients like chili peppers, cilantro, and lime. The cuisine showcases a perfect balance of sweet, savory, and spicy elements, creating a lively and satisfying dining experience. "
    },
];

// Instructs Of Scan The Menu
export const instructions = [
    {
        img: "/Images/Scanner.png",
        title: "Scan the QR Code:",
        description: {
            l1: "Open your phone's camera",
            l2: "Scan the QR code on your table"
        }
    },
    {
        img: "/Images/BrowseMenu.webp",
        title: "Browse the Menu",
        description: {
            l1: "A link will appear after scanning",
            l2: "Tap to view the digital menu"
        }
    },
    {
        img: "/Images/PlaceOrder.webp",
        title: "Place Your Order:",
        description: {
            l1: "Add to your cart and place the order",
            l2: "Pay Online Or Wait For The Waiter"
        }
    },
    {
        img: "/Images/Family.jpg",
        title: "Wait for Your Order:",
        description: {
            l1: "Relax while our team prepares your delicious meal",
            l2: "And All Set"
        }
    },
]

// Register Credentials
export const registerCredentials = [
    {
        name: "email",
        type: 'email',
        id: 'email',
        heading: 'Email Id'
    },
    {
        name: "fullName",
        type: 'text',
        id: 'first',
        heading: 'Full Name'
    },
    {
        name: "password",
        type: 'text',
        id: 'password',
        heading: 'Password'
    },
    {
        name: "cPassword",
        type: 'password',
        id: 'cPassword',
        heading: 'Confirm Password'
    },
];


// Login Credentials
export const loginCredentials = [
    {
        name: "email",
        type: 'email',
        id: 'email',
        heading: 'Email Id'
    },
    {
        name: "password",
        type: 'password',
        id: 'password',
        heading: 'Password'
    },
];


// Contact Credentials
export const contactCredentials = [
    {
        name: "Name",
        type: 'text',
        id: 'Name',
        heading: 'Name'
    },
    {
        name: "phone",
        type: 'text',
        id: 'phone',
        heading: 'Phone Number'
    },
];


// Contact Cart Credentials
export const contactCard = [
    {
        icon: "FaPhoneVolume",
        title: "Call",
        description: "+91 7559428838"
    },
    {
        icon: "FaEnvelope",
        title: "Email",
        description: "tejasdhodi77@gmail.com"
    },
    {
        icon: "FaLocationArrow",
        title: "Address",
        description: "Maharashtra, Dahanu 401602"
    },
];


// Price Range Credentials
export const priceRange = [
    {
        label: 'Less than $50',
        price: [0, 50]
    },
    {
        label: '$50 - $100',
        price: [50, 100]
    },
    {
        label: '$100 - $150',
        price: [100, 150]
    },
    {
        label: '$150 - $250',
        price: [150, 250]
    },
    {
        label: 'More than $250',
        price: [250, Infinity]
    }
];


// Menu Page Carouser Categorization Credentials
export const filteration = [
    {
        title: 'Vegiterian Dishes',
        type: 'type',
        name: 'veg',
    },
    {
        title: 'Non-Vegiterian Dishes',
        type: 'type',
        name: 'nonveg'
    },
    {
        title: 'Indian Cusine',
        type: 'cusine',
        name: 'Indian',
    },
    {
        title: 'Italian Cusine',
        type: 'cusine',
        name: 'Italian',
    },
    {
        title: 'Mexican Cusine',
        type: 'cusine',
        name: 'Mexican',
    },
    {
        title: 'Chinese Cusine',
        type: 'cusine',
        name: 'Chinese',
    },
]

export const tableNumberData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]