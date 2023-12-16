// './assets/react.svg'
import logo from '/src/image/logo.svg';
import fb from '/src/image/facebook-logo.svg';
import inster from '/src/image/instragram-logo.svg';
import twitter from '/src/image/twitter-logo.svg';

function Header() {
	return (
		<header className='flex flex-wrap place-content-between p-5 fixed w-[100%] bg-[#F9F5E4] z-20 top-0 shadow'>

			<a href="" className='inline' >
				<img src={logo} alt="logo" />
			</a>

			<nav className='flex gap-4'>
				<a className='nave-list' href="">Home</a>
				<a className='nave-list' href="">About</a>
				<a className='nave-list' href="">find</a>
				<a className='nave-list' href="">complanint</a>
				<a className='nave-list' href="">Contact</a>
			</nav>

			<div className='flex gap-4'>
				<a href="" className='inline' >
					<img src={fb} alt="ddd" />
				</a>
				<a href="" className='inline' >
					<img src={inster} alt="ddd" />
				</a>
				<a href="" className='inline' >
					<img src={twitter} alt="ddd" />
				</a>
			</div>


		</header>
	)
}

export default Header;