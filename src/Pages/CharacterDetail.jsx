import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCharacterDetails } from "../utils/api";
import { setCharacterDetail } from "../reducers/animeSlice";
import Load from "../Components/Load";
import Back from "../Components/Back";

const CharacterDetail = () => {
  const dispatch = useDispatch();
  const { characterDetail } = useSelector((store) => store.anime);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const fetchDetails = async () => {
    try {
      const response = await fetchCharacterDetails(id);
      dispatch(setCharacterDetail(response));
    } catch (err) {
      setError("Something went wrong while fetching character details.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1c1c1c] text-white px-4 sm:px-6 md:px-10 py-8 mt-16">
      <div className="max-w-7xl mx-auto">
        <Back />

        {loading ? (
          <Load value="character details" />
        ) : error ? (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg mt-6">
            <p>{error}</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-10 bg-black/70 border border-gray-700 p-6 rounded-2xl shadow-xl mt-6">
            {/* Character Image */}
            <div className="md:w-1/3 w-full">
              {characterDetail.images?.jpg?.image_url && (
                <img
                  src={characterDetail.images.jpg.image_url}
                  alt={characterDetail.name}
                  className="w-full h-auto max-h-[500px] rounded-xl shadow-md object-cover"
                />
              )}
              <div className="mt-4 p-3 rounded-md flex items-center gap-2 text-sm text-blue-300">
                <span className="text-pink-400 text-lg">♥</span>
                {characterDetail.favorites?.toLocaleString() || 0} favorites
              </div>
            </div>

            {/* Character Info */}
            <div className="md:w-2/3 w-full">
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                {characterDetail.name}
              </h1>
              {characterDetail.name_kanji && (
                <p className="text-lg text-gray-400 mt-1">
                  {characterDetail.name_kanji}
                </p>
              )}

              {characterDetail.nicknames?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-blue-400 text-lg font-semibold mb-2">
                    Nicknames
                  </h3>
                  <ul className="list-disc list-inside text-gray-300 text-sm">
                    {characterDetail.nicknames.map((nick, idx) => (
                      <li key={idx}>{nick}</li>
                    ))}
                  </ul>
                </div>
              )}

              {characterDetail.about && (
                <div className="mt-6">
                  <h3 className="text-blue-400 text-lg font-semibold mb-2">
                    About
                  </h3>
                  <p className="text-gray-300 whitespace-pre-line leading-relaxed text-sm">
                    {characterDetail.about}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterDetail;
