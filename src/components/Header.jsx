import React from 'react'
import logo from './../img/logo.svg';

export default function Header({children}) {
   return (
		<div className='app'>
			<header className='app-header'>
				<img src={logo} className='app-logo' alt='logo' />
				<h3>ReactJS - Quiz</h3>
			</header>
         {children}
		</div>
	);
}
