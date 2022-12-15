const _offers = [
    {
        id: 1,
        title: "60% OFF up to Rs120",
        description: "Use code ZCRICKET",
        icon: require('../assets/ThemeImages/discount.png')
    },
    {
        id: 2,
        title: "60% OFF up to Rs120",
        description: "Use code ZCRICKET",
        icon: require('../assets/ThemeImages/discount.png')
    },
    {
        id: 3,
        title: "60% OFF up to Rs120",
        description: "Use code ZCRICKET",
        icon: require('../assets/ThemeImages/discount.png')
    },
    {
        id: 4,
        title: "60% OFF up to Rs120",
        description: "Use code ZCRICKET",
        icon: require('../assets/ThemeImages/discount.png')
    },
];
const _categories = [
    {
        id: 1,
        title: "Rice",
        image: require('../assets/CategoryImages/rice.png')
    },
    {
        id: 2,
        title: "Tea",
        image: require('../assets/CategoryImages/tea.png')
    },
    {
        id: 3,
        title: "Drink",
        image: require('../assets/CategoryImages/drinks.png')
    },
    {
        id: 4,
        title: "Others",
        image: require('../assets/CategoryImages/others.png')
    },
];
const _rice = [
    {
        id: "R1",
        item_name: "Mogra Rice",
        sale_price: "₹200/kg",
        original_price: "₹250",
        offer_tag: "-20%",
        image: require('../assets/ProductImages/rice_1.png'),
        price_for_calculations: 200,
        offer: true
    },
    {
        id: "R2",
        item_name: "Brown Rice",
        sale_price: "₹200/kg",
        original_price: "₹250",
        offer_tag: "-20%",
        price_for_calculations: 200,
        image: require('../assets/ProductImages/rice_2.png'),
        offer: false
    },
    {
        id: "R3",
        item_name: "Wild Rice",
        sale_price: "₹200/kg",
        original_price: "₹250",
        offer_tag: "-20%",
        price_for_calculations: 200,
        image: require('../assets/ProductImages/rice_3.png'),
        offer: true
    },
    {
        id: "R4",
        item_name: "Jasmine Rice",
        sale_price: "₹200/kg",
        original_price: "₹250",
        offer_tag: "-20%",
        price_for_calculations: 200,
        image: require('../assets/ProductImages/rice_4.png'),
        offer: true
    },
    {
        id: "R5",
        item_name: "Mogra Rice",
        sale_price: "₹200/kg",
        original_price: "₹250",
        offer_tag: "-20%",
        price_for_calculations: 200,
        image: require('../assets/ProductImages/rice_1.png'),
        offer: true
    },
    {
        id: "R6",
        item_name: "Jasmine Rice",
        sale_price: "₹200/kg",
        original_price: "₹250",
        offer_tag: "-20%",
        price_for_calculations: 200,
        image: require('../assets/ProductImages/rice_4.png'),
        offer: true
    },
];

const _cart_timeline = [
    {
        id:1,
        time:"Morning",
        timeline:"10AM to 11AM",
        icon:"sunny-outline"
    },
    {
        id:2,
        time:"Evening",
        timeline:"2PM to 3PM",
        icon:"moon-outline"
    },
    {
        id:3,
        time:"Evening",
        timeline:"6PM to 7PM",
        icon:"moon-outline"
    },
]

const dummyDB = {
    offers: _offers,
    categories: _categories,
    rice: _rice,
    cartTimeline: _cart_timeline,
};

export default dummyDB;
