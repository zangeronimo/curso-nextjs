import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';

const AddToCartModal = dynamic(
    () => import('@/components/AddToCartModal'),
    { 
        loading: () => <p>Loading...</p>
    }
);

export default function Product() {
    const router = useRouter();
    const [isAddToCartModalVisible, setIsddToCartModalVisible] = useState(false);

    const handleAddToCart = useCallback(() => {
        setIsddToCartModalVisible(true);
    }, []);

    return (
        <div>
            <h1>{router.query.slug}</h1>

            <button onClick={handleAddToCart}>Add to cart</button>

            { isAddToCartModalVisible && <AddToCartModal /> }
        </div>
    )
}