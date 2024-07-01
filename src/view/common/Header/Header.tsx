// './assets/react.svg'
import logo from '/src/image/logo.svg';
import fb from '/src/image/facebook-logo.svg';
import inster from '/src/image/instragram-logo.svg';
import twitter from '/src/image/twitter-logo.svg';
import {Link} from "react-router-dom";
import buttonArrow from "../../../image/button-arrow.png";

function Header() {
	return (
		<header className='flex flex-wrap place-content-between item-center p-5 fixed w-[100%] bg-[#F9F5E4] z-20 top-0 shadow'>

			<a href="" className='inline' >
				<img src={logo} alt="logo" />
			</a>

			<nav className='flex gap-4'>
				<a className='nave-list' href="">Home</a>
				<a className='nave-list' href="">About</a>
				<a className='nave-list' href="">find</a>
				<a className='nave-list' href="">complanint</a>
				<a className='nave-list' href="">Contact</a>
				<Link to='donation'>
					<a className='nave-list' href="">Donation</a>
				</Link>
			</nav>

			<div className='flex gap-4 item-center'>

				<button>
					<Link to="/signin"
						  className='
						flex
						flex-wrap
						p-1 gap-4
						bg-[#FFE66F]
						items-center
						p-2
						pr-4 pl-4
						rounded-[8px]
						drop-shadow-lg'
					>

						<span className='font-bold text-[18px]'>Sign in</span>
						{/*<img className='h-[40px] rotate-180' src={buttonArrow} alt=""/>*/}
					</Link>
				</button>

				<button>
					<Link to="/register"
						  className='
						flex
						flex-wrap
						p-1 gap-4
						bg-[#FFE66F]
						items-center
						p-2
						pr-4 pl-4
						rounded-[8px]
						drop-shadow-lg'
					>

						<span className='font-bold text-[18px]'>Sign up</span>
						{/*<img className='h-[40px] rotate-180' src={buttonArrow} alt=""/>*/}
					</Link>
				</button>

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