import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from 'next/router';

interface IProduct {
    id: string;
    title: string;
}

interface ICategory {
    id: string;
    title: string;
}

interface CategoriesProps {
    products: IProduct[];
}

export default function Categories({ products }: CategoriesProps) {
    const router = useRouter();

    if (router.isFallback) {
        return <p>Carregando...</p>
    }

    return (
        <div>
            <h1>Categories</h1>

            <h2>{router.query.slug}</h2>
            <ul>
                {products.map(product => {
                    return (
                        <li key={product.id}>
                            {product.title}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

// para páginas dinâmicas, precisamos do GetStaticPaths onde deverá ser informado todos os possíveis slugs disponíveis.
export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch(`http://localhost:3333/categories`);
    const categories = await response.json() as ICategory[];

    const paths = categories.map(category => {
        return {
            params: { slug: category.id }
        }
    })

    return {
        paths,
        fallback: true,
    }
};

// Cria páginas estáticas, ótimo para conteúdos que sofrem poucas alterações
export const getStaticProps: GetStaticProps<CategoriesProps> = async (context) => {
    const { slug } = context.params;

    const response = await fetch(`http://localhost:3333/products?category_id=${slug}`);
    const products = await response.json();

    return {
        props: {
            products,
        },
        revalidate: 60,
    }
}