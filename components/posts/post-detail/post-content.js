import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
// import { Prism as ReactSyntaxHighlighter } from "react-syntax-highlighter";
//code was too big for export bc i imported everything
import { PrismLight as ReactSyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";

ReactSyntaxHighlighter.registerLanguage("js", js);
ReactSyntaxHighlighter.registerLanguage("css", css);

function PostContent({ post }) {
	const imagePath = `/images/posts/${post.slug}/${post.image}`;

	//renderers props makes it have exceptions for files that will be rendred
	//customRenderers for the markdown file
	//image.src is the file name that was stored in the md file
	const customRenderers = {
		// image(image) {
		// 	return (
		// 		<Image
		// 			src={`/images/posts/${post.slug}/${image.src}`}
		// 			alt={image.alt}
		// 			width={600}
		// 			height={300}
		// 		/>
		// 	);
		// },

		// this line is used to overrride the div inside <p/> in image to avoid console errors
		paragraph(paragraph) {
			const { node } = paragraph;

			if (node.children[0].type === "image") {
				const image = node.children[0];
				return (
					<div className={classes.image}>
						<Image
							src={`/images/posts/${post.slug}/${image.url}`}
							alt={image.alt}
							width={600}
							height={300}
						/>
					</div>
				);
			}

			return <p>{paragraph.children}</p>;
		},

		code(code) {
			const { value, language } = code;
			return (
				<ReactSyntaxHighlighter
					style={atomDark}
					language={language}
					children={value}
				/>
			);
		},
	};

	return (
		<article className={classes.content}>
			<PostHeader title={post.title} image={imagePath} />
			<ReactMarkdown renderers={customRenderers}>{post.content}</ReactMarkdown>
		</article>
	);
}

export default PostContent;
