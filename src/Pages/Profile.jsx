import { useEffect, useState } from "react";
import { User, X, Edit3 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import axios from "axios";
import { setUser } from "../reducers/userSlice";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.photoUrl || null);
  const [name, setName] = useState("");

  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

  useEffect(() => {
    if (user) {
      setName(user?.username || "");
      setPreviewUrl(user?.photoUrl || null);
    }
  }, [user]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleEdit = async () => {
  let photoUrl = user?.photoUrl || null;
  setLoading(true);
  try {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("cloud_name", CLOUD_NAME);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      photoUrl = response.data.secure_url;
    }
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, {
      username: name,
      photoUrl,
    });

    // **Update Redux store with correct keys to trigger re-render everywhere**
    dispatch(
      setUser({
        ...user,
        username: name,
        photoUrl,
      })
    );

    setIsModalOpen(false);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};


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
          {previewUrl ? (
            <img
              src={previewUrl}
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

          {/* Edit Profile Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 sm:mt-6 px-4 py-2 bg-white text-black hover:bg-white/90 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <Edit3 size={14} />
            Edit Profile
          </button>
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-4">
          <div className="bg-black rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8 relative border border-white/20">
            {/* Close Button */}
            <button
              className="absolute cursor-pointer top-4 sm:top-6 right-4 sm:right-6 text-white/60 hover:text-white transition-colors"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={20} className="sm:size-6" />
            </button>

            <h3 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8 text-white">
              Edit Profile
            </h3>

            {/* Form */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm text-white/60 mb-2 sm:mb-3 uppercase tracking-wider">
                  Username
                </label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  name="name"
                  className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl bg-white/5 text-white border border-white/10 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-white/60 mb-2 sm:mb-3 uppercase tracking-wider">
                  Profile Photo
                </label>
                <div className="space-y-4">
                  {previewUrl && (
                    <div className="flex justify-center">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white/20"
                      />
                    </div>
                  )}
                  <div>
                    <label className="cursor-pointer bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium inline-block">
                      Choose File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <button
                onClick={handleEdit}
                type="button"
                className="w-full cursor-pointer py-2 sm:py-3 bg-white text-black hover:bg-white/90 rounded-xl font-semibold transition-all duration-200 mt-6 sm:mt-8 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
