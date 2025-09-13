import localFont from "next/font/local";
import { DM_Sans, Bricolage_Grotesque } from "next/font/google";
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
export default function Home() {
  return (
    <>
      <div className="px-10 mt-10">
        <h1
          className={`text-5xl font-bold ${bricolageGrotesque.className} text-center `}
        >
          How's the sky looking today?
        </h1>
      </div>
      <form className="flex justify-center gap-3 w-full  mt-12 flex-col sm:flex-row px-5 max-w-3xl m-auto">
        <input type="text" className="bg-neutral-800 rounded-xl sm:w-[70%] w-[100%] bg-search  placeholder:text-neutral-200 px-12 p-3 " placeholder="Search for a place" />
        <input type="submit" className="bg-[#4658D9] rounded-xl sm:w-[30%] w-[100%] p-3" value="Search" />
      </form>
    </>
  );
}
