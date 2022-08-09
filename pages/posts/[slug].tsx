import Head from "next/head";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";
import { InferGetStaticPropsType } from "next";

export async function getStaticPaths() {
	const paths = allPosts.map((post) => post.url);
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
	return {
		props: {
			post,
		},
	};
}

const PostLayout = ({
	post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const {
		title,
		date,
		body: { html },
		postType,
	} = post;
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<article className="mx-auto max-w-2xl py-16">
				<div className="mb-6 text-center">
					<Link href="/">
						<a className="text-center text-sm font-bold uppercase text-blue-700">
							Home
						</a>
					</Link>
				</div>
				<div className="mb-6 text-center">
					<h1 className="mb-1 text-3xl font-bold">{title}</h1>
					<time dateTime={date} className="text-sm text-slate-600">
						{format(parseISO(date), "LLLL d, yyyy")}
					</time>
				</div>
				<div
					className="cl-post-body"
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			</article>
		</>
	);
};

export default PostLayout;
