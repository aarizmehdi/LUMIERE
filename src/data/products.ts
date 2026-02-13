export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    description: string;
    category: 'Electronics' | 'Fashion' | 'Home' | 'Gaming';
    rating: number;
    reviews: number;
    images: string[];
    specs?: Record<string, string>;
    stock: number;
    colors?: string[];
    collections?: string[]; // New field for curated collections
}

export const products: Product[] = [
    // Premium Selection (Sorted)
    {
        id: '4',
        name: 'Aether Runner',
        price: 189,
        description: 'Defy gravity. The Aether Runner combines reactive foam technology with a breathable knit upper for unparalleled comfort.',
        category: 'Fashion',
        rating: 4.7,
        reviews: 310,
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
        ],
        stock: 50,
        colors: ['#ff0000', '#000000', '#ffffff'],
        collections: ['Urban'],
    },
    {
        id: '18',
        name: 'Pro Stream Deck',
        price: 149,
        description: 'Control your content. 15 custom LCD keys give you instant access to unlimited actions.',
        category: 'Gaming',
        rating: 4.9,
        reviews: 210,
        images: [
            'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80',
        ],
        stock: 18,
        collections: ['Tech'],
    },
    {
        id: '5',
        name: 'The Weekend Voyager',
        price: 345,
        description: 'Built for the spontaneous getaway. Durable canvas meets premium leather in a bag designed to go wherever you do.',
        category: 'Fashion',
        rating: 4.9,
        reviews: 65,
        images: [
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80', // Backpack
        ],
        stock: 10,
        colors: ['#8B4513', '#000000'],
        collections: ['Leather', 'Urban'],
    },
    {
        id: '24',
        name: 'Oxford Leather Satchel',
        price: 289,
        description: 'Heritage meets function. Full-grain leather construction that ages beautifully with every journey.',
        category: 'Fashion',
        rating: 4.9,
        reviews: 42,
        images: [
            'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80', // Leather bag
        ],
        stock: 15,
        colors: ['#8B4513', '#000000'],
        collections: ['Leather', 'Urban'],
    },
    {
        id: '13',
        name: 'Omni Soundbar',
        price: 249,
        originalPrice: 299,
        description: 'Cinematic sound in a sleek package. Dolby Atmos support fills your room with rich, immersive audio.',
        category: 'Electronics',
        rating: 4.7,
        reviews: 89,
        images: [
            'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80', // Soundbar
        ],
        stock: 22,
        collections: ['Minimalist', 'Tech'],
    },
    {
        id: '14',
        name: 'ZenBuds Pro',
        price: 159,
        description: 'Focus on what matters. Industry-leading transparency mode and all-day comfort for the busy professional.',
        category: 'Electronics',
        rating: 4.8,
        reviews: 320,
        images: [
            'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80', // Earbuds
        ],
        stock: 40,
        colors: ['#000000', '#ffffff'],
        collections: ['Minimalist', 'Tech'],
    },
    {
        id: '3',
        name: 'Lumina 4K Drone',
        price: 899,
        originalPrice: 1200,
        description: 'Capture the world from above.',
        category: 'Electronics',
        rating: 5.0,
        reviews: 42,
        images: ['https://images.unsplash.com/photo-1506947411487-a56738267384?w=800&q=80'],
        stock: 5,
        collections: ['Tech'],
    },
    {
        id: '2',
        name: 'Hyperion Smart Watch',
        price: 299,
        description: 'The future on your wrist.',
        category: 'Electronics',
        rating: 4.8,
        reviews: 86,
        images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80'],
        stock: 24,
        colors: ['#000000', '#C0C0C0'],
        collections: ['Urban', 'Tech'],
    },
    {
        id: '7',
        name: 'Phantom Mechanical',
        price: 149,
        description: 'Precision gaming.',
        category: 'Gaming',
        rating: 4.8,
        reviews: 500,
        images: ['https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80'],
        stock: 100,
        collections: ['Tech'],
    },
    {
        id: '8',
        name: 'Titan Gaming Chair',
        price: 450,
        description: 'Ergonomic perfection.',
        category: 'Gaming',
        rating: 4.9,
        reviews: 215,
        images: ['https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&q=80'],
        stock: 20,
        collections: ['Leather'],
    },
    {
        id: '9',
        name: 'Retro Pocket Console',
        price: 120,
        description: 'Nostalgia in your pocket.',
        category: 'Gaming',
        rating: 4.9,
        reviews: 340,
        images: ['https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=800&q=80'],
        stock: 15,
        collections: ['Tech'],
    },
    {
        id: '1',
        name: 'Nebula X1 Wireless',
        price: 399,
        originalPrice: 499,
        description: 'Experience audio like never before with the Nebula X1. Featuring active noise cancellation tailored to your environment and 50-hour battery life.',
        category: 'Electronics',
        rating: 4.9,
        reviews: 128,
        images: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', // Headphones on Blue
            'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80', // Headphones on Pink
        ],
        specs: {
            'Battery Life': '50 Hours',
            'Connectivity': 'Bluetooth 5.3',
            'Weight': '250g',
        },
        stock: 15,
        colors: ['#000000', '#E5E5E5', '#D4AF37'],
        collections: ['Tech'], // Removed Minimalist (too busy)
    },
    {
        id: '21',
        name: 'Transparent Audio Brick',
        price: 450,
        description: 'Sound seen and heard. A transparent speaker that delivers crystal clear audio while blending seamlessly into any interior.',
        category: 'Electronics',
        rating: 5.0,
        reviews: 12,
        images: [
            'https://images.unsplash.com/photo-1558742569-fe6d39d05837?w=800&q=80', // Abstract/Tech Speaker vibe
        ],
        stock: 5,
        collections: ['Minimalist', 'Tech'],
    },
    {
        id: '15',
        name: 'Urban Denim Jacket',
        price: 120,
        description: 'A modern classic. Distressed details and a tailored fit make this the ultimate layering piece.',
        category: 'Fashion',
        rating: 4.5,
        reviews: 98,
        images: [
            'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80', // Denim Jacket
        ],
        stock: 25,
        colors: ['#000080', '#000000'],
        collections: ['Urban'],
    },
    {
        id: '26',
        name: 'Classic Aviator Jacket',
        price: 450,
        description: 'The icon of cool. Premium sheepskin leather with a tailored fit that never goes out of style.',
        category: 'Fashion',
        rating: 4.8,
        reviews: 89,
        images: [
            'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80', // Leather jacket
        ],
        stock: 8,
        collections: ['Leather', 'Urban'],
    },
    {
        id: '22',
        name: 'Techwear Cargo Pants',
        price: 185,
        description: 'Function first. Water-resistant fabric with multiple secured pockets for the urban explorer.',
        category: 'Fashion',
        rating: 4.7,
        reviews: 56,
        images: [
            'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=800&auto=format&fit=crop', // Dark cargo pants fashion
        ],
        stock: 15,
        collections: ['Urban', 'Tech'],
    },
    {
        id: '10',
        name: 'Nordic Analog Clock',
        price: 45,
        description: 'Time in its purest form. A silent sweep movement housed in a matte finish case that adds a touch of modern minimalism.',
        category: 'Home',
        rating: 4.5,
        reviews: 156,
        images: [
            'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&q=80',
        ],
        stock: 45,
        collections: ['Minimalist'],
    },
    {
        id: '25',
        name: 'Chesterfield Armchair',
        price: 1250,
        description: 'A timeless classic. Deep button tufting and rich antique leather make this a statement piece for any room.',
        category: 'Home',
        rating: 5.0,
        reviews: 18,
        images: [
            'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80', // Centered Leather chair
        ],
        stock: 4,
        collections: ['Leather', 'Home'],
    },
    {
        id: '6',
        name: 'Chronos Aviator',
        price: 150,
        description: 'Timeless style.',
        category: 'Fashion',
        rating: 4.6,
        reviews: 112,
        images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80'],
        stock: 30,
        collections: ['Urban'],
    },
    {
        id: '12',
        name: 'Sculptural Ceramic Vase',
        price: 65,
        description: 'Organic forms.',
        category: 'Home',
        rating: 4.8,
        reviews: 92,
        images: ['https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80'],
        stock: 25,
        collections: ['Minimalist'],
    },
    {
        id: '16',
        name: 'Luxe Silk Scarf',
        price: 85,
        description: 'Elegance in every fold.',
        category: 'Fashion',
        rating: 4.9,
        reviews: 45,
        images: ['https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?w=800&q=80'],
        stock: 12,
        collections: ['Urban'],
    },
    {
        id: '19',
        name: 'Geometric Planter',
        price: 35,
        description: 'Nature meets geometry.',
        category: 'Home',
        rating: 4.6,
        reviews: 78,
        images: ['https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80'],
        stock: 60,
        collections: ['Minimalist'],
    },
    {
        id: '20',
        name: 'Calm Weighted Blanket',
        price: 129,
        description: 'Embrace the calm.',
        category: 'Home',
        rating: 4.9,
        reviews: 412,
        images: ['https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80'],
        stock: 15,
        collections: ['Home', 'Minimalist'],
    },
];
