import { Link } from 'react-router-dom';
import '../styles/Oferta.css';

const Oferta = () => {
	return (
		<section className='oferta contenedor'>
			<div className='oferta__left'>
				<img
					width='200px'
					height='300px'
					src='/img/c2.jpeg'
					alt='calzado'
				/>
			</div>
			<div className='oferta__center'>
				<h3>Ropa y Moda</h3>
				<h2>
					SOLO EN <span className='sky'> CAPIBARA STORE </span> LA MEJOR TIENDA DE ROPA
				</h2>
				<p className='mb-1'>Sientete comodo y compra lo que te guste.</p>
				<Link to={'/productos'} className='boton boton--claro px-4 uppercase'>
					Ver productos
				</Link>
			</div>
			<div className='oferta__right'>
				<img
					width='200px'
					height='300px'
					src='/img/c3.jpeg'
					alt='calzado'
				/>
			</div>
		</section>
	);
};

export default Oferta;
