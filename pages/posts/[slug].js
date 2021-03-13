import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/posts-util";
import Head from "next/head";

export default function PostDetailPage({ post }) {
	return (
		<>
			<Head>
				<title>{post.title}</title>
				<meta name="description" content={post.excerpt} />
			</Head>
			<PostContent post={post} />
		</>
	);
}

//in dynamic pages, get getStaticProps will not work on its own
export function getStaticProps(ctx) {
	const { params } = ctx;
	const { slug } = params;

	const postData = getPostData(slug);

	return {
		props: { post: postData },
		revalidate: 600,
	};
}

export function getStaticPaths() {
	const postFilenames = getPostsFiles();
	const slugs = postFilenames.map((filename) => filename.replace(/\.md$/, ""));

	return {
		//this method we explicitly define all paths in advance
		// paths: [
		// 	{params: {slug: 'getting-started-with-nextjs'}}
		// ],
		//above same as below but mapped

		paths: slugs.map((slug) => ({ params: { slug: slug } })),
		fallback: false,

		//when using fallback true, we need to set a component up that it shows while loading with if(!data){...}
		//when using fallback 'blocking', the page waits to load all data before displaying anything
		// paths: [],
		// fallback: true
	};
}
