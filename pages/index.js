import { bundleMDX } from "mdx-bundler";
import {getMDXComponent} from 'mdx-bundler/client'
import {useMemo} from 'react'
import path from 'path'

if (process.platform === 'win32') {
  process.env.ESBUILD_BINARY_PATH = path.join(
    process.cwd(),
    'node_modules',
    'esbuild',
    'esbuild.exe',
  )
} else {
  process.env.ESBUILD_BINARY_PATH = path.join(
    process.cwd(),
    'node_modules',
    'esbuild',
    'bin',
    'esbuild',
  )
}

export const getStaticProps = async ({ params }) => {
  const mdxSource = `

${Array(1000).fill(0).map((_, index) => {
  return `<h2 id="${index}">${index}</h2>`
})}

`.trim();

  const result = await bundleMDX(mdxSource);

  const { code } = result;
  return {
    props: { code }, // will be passed to the page component as props
  };
};

export default function Post({ code }) {
  const Component = useMemo(
    () => getMDXComponent(code))
  return (
    <div>
      <Component />
    </div>
  );
}
