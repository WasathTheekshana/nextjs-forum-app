import Link from "next/link"

function Nav() {
  return (
   <nav className="flex justify-between items-center py-5">
      <Link href={"/"}>
        <button className="text-lg font-semibold">Forum</button>
      </Link>
      <ul className="flex items-center gap-10">
        <Link href={"/auth/Login"}>
          <button className="py-2 px-4 text-sm bg-cyan-500 text-white rounded-lg font-medium ml-8">Join Now</button>
        </Link>
      </ul>
   </nav>
  )
}

export default Nav