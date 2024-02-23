export default function restBox(rest: number) {
  return (
    /* html */
    `<button class="rest-box flex justify-center items-center bg-blue-400 active:text-gray-400 text-white px-2 py-3 w-full duration-100 outline-none">
      Rest ${rest} seconds
    </button>`
  );
}