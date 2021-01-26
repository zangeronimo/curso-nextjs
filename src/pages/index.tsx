
import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { Title } from '@/styles/pages/Home';
import SEO from '@/components/SEO';

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {

  // Carregamento no client (não indexa nos motores de busca)
  // useEffect(() => {
  //   fetch('http://localhost:3333/recommended').then(response => {
  //     response.json().then(data => {
  //       setRecommendedProducts(data);
  //     });
  //   });
  // }, []);

  async function handleSum() {
    // import dinâmico =  so vai carregar quanto utilizar.
    const math = (await import('../lib/math')).default;
    alert(math.sum(3, 5));
  }

  return (
    <div>
      <SEO 
        title="DevCommer, your best ecommerce!" 
        shouldExcludeTitleSuffix 
        image="pao.jpg"
      />
      <Title>Hello World</Title>

      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                {recommendedProduct.title}
              </li>
            )
          })}
        </ul>
      </section>

      <p>
        <Link href="/catalog/products/camisetas">
          <a>Link com next</a>
        </Link>
      </p>

      <button onClick={handleSum}>Sum!</button>
    </div>
  )
}

// User somente para dados que precisam estar disponíveis ao motores de buscas
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts,
    }
  }
}
