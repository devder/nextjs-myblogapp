import Image from "next/image";
import classes from "./hero.module.css";

export default function Hero() {
	return (
		<section className={classes.hero}>
			{/* still need width and height style from css that matches closely */}
			<div className={classes.image}>
				<Image
					src="/images/site/derick.jpg"
					alt="An image showing Derick"
					width={300}
					height={300}
				/>
			</div>
			<h1>Hi I am Derick</h1>
			<p>
				I blog about web development - especially frameworks like ReactJS and
				NextJS
			</p>
		</section>
	);
}
