import LoaderIcon from "@/components/icons/LoaderIcon";


const Loader = () => {
  return (
    <div className="text-xl md:text-7xl font-bold flex items-center justify-center  dark:text-white h-[50vh] ">
      
    
      <LoaderIcon className="animate-spin w-[5rem] h-[5rem] dark:fill-white" />
      Loading . . .

    </div>
  );
}

export default Loader
