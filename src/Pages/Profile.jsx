import { User } from "lucide-react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white px-4">
        <p className="text-base sm:text-lg text-center">
          No profile data found. Please log in.
        </p>
      </div>
    );
  }

  return (
    <div className="relative py-8 sm:py-12 mt-16 sm:mt-20 px-4 sm:px-6 bg-black text-white">
      <div className="max-w-md mx-auto rounded-3xl shadow-2xl overflow-hidden border border-white/10 bg-black">
        {/* Profile Header */}
        <div className="flex flex-col items-center p-6 sm:p-8 border-b border-white/10">
          {user?.photoUrl ? (
            <img
              src={user.photoUrl}
              alt={user?.username}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-xl"
            />
          ) : (
            <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center rounded-full bg-white/5 border-4 border-white shadow-xl">
              <User size={40} className="text-white" />
            </div>
          )}
          <h2 className="mt-4 sm:mt-6 text-xl sm:text-2xl font-bold text-white">
            {user?.username}
          </h2>
          <p className="text-white/60 text-sm sm:text-base mt-1">
            {user?.email}
          </p>
        </div>

        {/* User Info */}
        <div className="p-6 sm:p-8 space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between py-2 sm:py-3 border-b border-white/5">
            <span className="text-white/60 text-xs sm:text-sm uppercase tracking-wider">
              Username
            </span>
            <span className="font-semibold text-white text-sm sm:text-base">
              {user?.username}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 sm:py-3 border-b border-white/5">
            <span className="text-white/60 text-xs sm:text-sm uppercase tracking-wider">
              Email
            </span>
            <span className="font-semibold text-white text-sm sm:text-base">
              {user?.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
