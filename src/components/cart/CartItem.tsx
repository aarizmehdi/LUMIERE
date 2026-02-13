import { FiMinus, FiPlus, FiX } from 'react-icons/fi';
import { type CartItem as CartItemType, useShop } from '../../context/ShopContext';
import { motion } from 'framer-motion';

interface CartItemProps {
    item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const { updateQuantity, removeFromCart } = useShop();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="flex gap-4 py-4 border-b border-glass-border"
        >
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
            </div>

            <div className="flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="text-text-primary font-medium text-sm line-clamp-1">{item.name}</h4>
                        <p className="text-text-secondary text-xs mt-1 capitalize">{item.category}</p>
                    </div>
                    <button
                        onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)}
                        className="text-text-secondary hover:text-text-primary transition-colors"
                    >
                        <FiX size={16} />
                    </button>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-3 bg-secondary rounded-full px-2 py-1">
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                            className="text-gray-400 hover:text-white disabled:opacity-50"
                            disabled={item.quantity <= 1}
                        >
                            <FiMinus size={14} />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                            className="text-gray-400 hover:text-white"
                        >
                            <FiPlus size={14} />
                        </button>
                    </div>
                    <p className="text-primary font-bold text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default CartItem;
