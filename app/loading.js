export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFCF7] dark:bg-[#121211] transition-colors duration-300">
      <div className="relative flex items-center justify-center">
        {/* Background track */}
        <div className="w-10 h-10 rounded-full border-2 border-[#E5E3DB] dark:border-[#2C2C2A]"></div>
        
        {/* Spinning animated indicator */}
        <div className="absolute w-10 h-10 rounded-full border-2 border-transparent border-t-[#824D3B] border-r-[#824D3B] dark:border-t-[#D4A373] dark:border-r-[#D4A373] animate-spin"></div>
      </div>
      
      <p className="mt-8 text-xs font-mono font-bold tracking-[0.2em] text-[#AC9E85] dark:text-[#666665] uppercase animate-pulse flex items-center space-x-2">
        <span>Loading</span>
        <span className="w-1 h-1 rounded-full bg-[#824D3B] dark:bg-[#D4A373] animate-bounce"></span>
        <span className="w-1 h-1 rounded-full bg-[#824D3B] dark:bg-[#D4A373] animate-bounce" style={{ animationDelay: '0.1s' }}></span>
        <span className="w-1 h-1 rounded-full bg-[#824D3B] dark:bg-[#D4A373] animate-bounce" style={{ animationDelay: '0.2s' }}></span>
      </p>
    </div>
  );
}
