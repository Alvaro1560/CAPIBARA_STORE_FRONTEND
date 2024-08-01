/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CuentaOpciones from './CuentaOpciones';
import PreviaCarrito from './Carrito/PreviaCarrito';
import Footer from './Footer';
import Unirte from './Unirte';
import Busqueda from './Busqueda';
import { overflowBody } from '../helpers';
import useAuth from '../hooks/useAuth';
import {
	UserIcon,
	HeartIcon,
	Bars3Icon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import '../styles/Header.css';
import useColecciones from '../hooks/useColecciones';

const Header = ({ subHeader }) => {
	// Estados
	const [menu, setMenu] = useState(false);
	const [cuenta, setCuenta] = useState(false);
	const [mostrarCarrito, setMostrarCarrito] = useState(false);

	// useColecciones
	const { colecciones, favoritos } = useColecciones();

	// useAuth
	const { usuario, autenticado } = useAuth();

	// autenticado¡
	const auth = autenticado();

	//  useLocation
	const { pathname } = useLocation();

	// Efectos
	useEffect(() => {
		overflowBody(menu);
	}, [menu]);

	// Mostrar el menu
	const handleCuenta = () => {
		setMostrarCarrito(false);
		setCuenta(!cuenta);
	};

	// Mostrar el carrito
	const handleMostrarCarrito = () => {
		setMostrarCarrito(!mostrarCarrito);
		setCuenta(false);
	};

	// Mostrar el menu de navegacion
	const handleMenu = () => {
		setMenu(!menu);
	};
	return (
		<>
			<header className='header'>
				<section className='contenedor'>
					<section className='header__top'>
						<button className='header__menu' title='Menu' onClick={handleMenu}>
							<Bars3Icon />
						</button>

						<div className='header__left'>
							<Link className='header__logo' to='/' title='Ecommerce'>
							<svg class="feather feather-slack" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/></svg>
								<span>CAPIBARA STORE</span>
							</Link>
							<nav className='header__navegacion'>
								{colecciones.length > 0 ? (
									colecciones.map(({ _id, nombre, url }) => (
										<Link key={_id} to={`/colecciones/${url}?id=${_id}`}>
											{nombre}
										</Link>
									))
								) : (
									<>
										<div className='loader-item'></div>
										<div className='loader-item'></div>
										<div className='loader-item'></div>
										<div className='loader-item'></div>
										<div className='loader-item'></div>
									</>
								)}
								<Link to={`/ofertas`} className='header__oferta'>
									Ofertas
								</Link>
							</nav>
						</div>

						<div className='header__right'>
							{usuario.rol && usuario.rol !== 'usuario' && (
								<span className='header__rol'>{usuario.rol}</span>
							)}

							<Link
								to={auth ? `/cuenta/favoritos` : `/cuenta/iniciar-sesion`}
								title='Favoritos'
								className='itemLink header__favoritos PreviaCarrito__cantidad'
							>
								{auth && favoritos.length > 0 ? (
									<HeartIconSolid style={{ color: 'var(--red-1)' }} />
								) : (
									<HeartIcon />
								)}
								{auth && favoritos.length > 0 && (
									<span>{favoritos.length}</span>
								)}
							</Link>
							<PreviaCarrito
								mostrar={mostrarCarrito}
								handleMostrar={handleMostrarCarrito}
							/>
							<CuentaOpciones cuenta={cuenta} handleCuenta={handleCuenta} />
						</div>
					</section>
				</section>
			</header>

			{subHeader && (
				<section className='subHeader'>
					<div className='contenedor'>
						<div className='subHeader__bottom'>
							<div className='subHeader__auth'>
								{!pathname?.includes('/cuenta') && !auth && (
									<>
										<Link to={`/cuenta/iniciar-sesion`} title='Iniciar Sesión'>
											Iniciar Sesión
										</Link>
										<Link to={`/cuenta/crear-cuenta`} title='Registrate'>
											Crear Cuenta
										</Link>
									</>
								)}
							</div>
							<Busqueda />
						</div>
					</div>
				</section>
			)}

			<section className={`${menu ? 'active' : ''} menu`}>
				<div className='menu__top'>
					{auth ? (
						<Link
							title='Cuenta'
							to={'/cuenta'}
							className='menu__login'
							onClick={handleMenu}
						>
							{auth ? (
								<div className='itemLink itemLink--usuario itemLink--ml0'>
									<div>
										<img
											src={usuario?.imagen?.secure_url}
											alt={usuario?.nombre}
										/>
									</div>
								</div>
							) : (
								<UserIcon />
							)}
							<span>{usuario?.nombre}</span>
						</Link>
					) : (
						<Link
							to={'/cuenta/iniciar-sesion'}
							className='menu__login'
							onClick={handleMenu}
						>
							<UserIcon />
							<span>Iniciar Sesión</span>
						</Link>
					)}
					<div className='menu__botones'>
						<Link to={`/ofertas`} className='menu__oferta' onClick={handleMenu}>
							Ofertas
						</Link>
						<Link
							to={`/cuenta/favoritos`}
							title='Favoritos'
							className='itemLink PreviaCarrito__cantidad'
							onClick={handleMenu}
						>
							{auth && favoritos.length > 0 ? (
								<HeartIconSolid style={{ color: 'var(--red-1)' }} />
							) : (
								<HeartIcon />
							)}
							{auth && favoritos.length > 0 && <span>{favoritos.length}</span>}
						</Link>
						<button className='itemLink' onClick={handleMenu}>
							<XMarkIcon />
						</button>
					</div>
				</div>
				<nav className='menu__navegacion'>
					{colecciones.length > 0 ? (
						colecciones.map(({ _id, nombre, url }) => (
							<Link
								key={_id}
								to={`/colecciones/${url}?id=${_id}`}
								onClick={handleMenu}
							>
								{nombre}
							</Link>
						))
					) : (
						<>
							<div
								className='loader-item'
								style={{ width: 200, height: 20 }}
							></div>
							<div
								className='loader-item'
								style={{ width: 300, height: 20 }}
							></div>
							<div
								className='loader-item'
								style={{ width: 230, height: 20 }}
							></div>
							<div
								className='loader-item'
								style={{ width: 400, height: 20 }}
							></div>
							<div
								className='loader-item'
								style={{ width: 100, height: 20 }}
							></div>
						</>
					)}
				</nav>
				<div className='menu__unirse'>
					<Unirte handleMenu={handleMenu} />
				</div>
				<div className='menu__destacados'></div>
				<div className='menu__ayuda'>
					<h2>¿Necesitas ayuda?</h2>
					<a href='#'>+51 982938293</a>
					<p>
						Te brindaremos mas información sobre nosotros, no dudes en
						contactarnos
					</p>
				</div>
				<Footer handleMenu={handleMenu} />
			</section>
		</>
	);
};

Header.defaultProps = {
	subHeader: true,
};
export default Header;
