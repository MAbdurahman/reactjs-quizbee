import React from 'react';

export default function Loader() {
	return (
		<div id='loading-container' className='container loading'>
			<div className='lds-dual-ring'></div>
			<h4>L o a d i n g . . .</h4>
		</div>
	);
}
