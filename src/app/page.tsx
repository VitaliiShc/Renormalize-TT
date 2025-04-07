import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl">Hello, Next.js!</h1>
      <p>This is my basic Next.js coding skill challenge</p>
      <h2>The task was assigned:</h2>
      <ul>
        <li>need to make a table and add a light/dark theme switch.</li>
        <li>
          Pagination/count per page/ search/row delete should be working items*.
        </li>
        <li>
          Search can be only by the name of the product. If you wish, you can
          also search the entire line* (not completed at the moment).
        </li>
      </ul>
      <p>
        do NOT need the edit action for the row and the &ldquo;Add a
        customer&rdquo; button!
      </p>
      <p>
        Be sure to use <span>Next + TailwindCSS</span>, everything else is
        optional.
      </p>
      <p>The layout and necessary data (list of orders) were provided</p>
      <p>
        * - This means it is optional but it will be great if it is done
        fully/partially
      </p>

      <Link href="/orders">Task accomplished</Link>
    </main>
  );
}
