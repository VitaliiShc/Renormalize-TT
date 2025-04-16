export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-24 text-center gap-4">
      <h1 className="text-3xl font-semibold">Hello, Next.js!</h1>

      <p className="italic text-[#666]">
        This is my basic Next.js coding skill challenge.
      </p>

      <h2 className="self-start text-xl font-semibold text-[#e69138]">
        The task was assigned:
      </h2>

      <ul className="list-disc list-outside text-left pl-8">
        <li>Need to make a table and add a light/dark theme switch.</li>

        <li>
          Pagination/count per page/ search/row delete should be working items*.
        </li>

        <li>
          Search can be only by the name of the product. If you wish, you can
          also search the entire line* (not completed at the moment).
        </li>
      </ul>

      <p className="font-semibold self-start">
        Do NOT need the edit action for the row and the &ldquo;Add a
        customer&rdquo; button!
      </p>

      <p className="self-start">
        Be sure to use <span className="font-semibold">Next + TailwindCSS</span>
        , everything else is optional.
      </p>

      <p className="self-start">
        The layout and necessary data (list of orders) were provided.
      </p>

      <p className="self-start">
        * - This means it is optional but it will be great if it is done
        fully/partially.
      </p>

      <a
        className="font-semibold px-6 py-2 bg-[#624de3] text-white rounded-lg hover:bg-[#4338ca] transition"
        href="/orders"
      >
        Task accomplished
      </a>
    </main>
  );
}
