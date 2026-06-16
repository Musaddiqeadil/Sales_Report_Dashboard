import profileImg from "../../assets/profile.jpg";

const Header = () => {
  return (
    <header className="bg-slate-900 text-white px-4 md:px-6 py-3 md:py-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl md:text-3xl font-bold">
            SALES EXECUTIVE VISIT REPORTING
          </h1>

          <p className="text-xs sm:text-sm text-slate-300">All-in-One Reporting System</p>
        </div>

        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <img
            src={profileImg}
            alt="Profile"
            className="w-9 h-9 md:w-12 md:h-12 rounded-full object-cover border-2 border-red-200"
          />

          <div className="hidden sm:block">
            <h3 className="font-semibold text-sm md:text-base">Rahul Kumar</h3>

            <p className="text-xs md:text-sm text-slate-300">Sales Executive</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
