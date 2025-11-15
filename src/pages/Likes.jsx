import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import heart_active from "../assets/images/heart_active.svg";

const Likes = () => {
  const [likedNews, setLikedNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLikes = localStorage.getItem('likedNews');
    if (savedLikes) {
      setLikedNews(JSON.parse(savedLikes));
    }
  }, []);

  const removeLike = (newsId) => {
    const updatedLikes = likedNews.filter(item => item.id !== newsId);
    setLikedNews(updatedLikes);
    localStorage.setItem('likedNews', JSON.stringify(updatedLikes));
  };

  const handlePostClick = (postId) => {
    navigate(`/detail/${postId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Saralangan yangiliklar</h1>
      
      {likedNews.length === 0 ? (
        <div className="text-center py-12">
          <img src={heart_active} alt="heart" className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="text-gray-500 text-lg">Hozircha saralangan yangiliklar yo'q</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {likedNews.map((news) => (
            <article 
              key={news.id} 
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img
                  src={news.image}
                  alt={news.title}
                  onClick={() => handlePostClick(news.id)}
                  className="w-full h-48 object-cover cursor-pointer"
                />
                <button
                  onClick={() => removeLike(news.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
                >
                  <img src={heart_active} alt="unlike" className="w-5 h-5" />
                </button>
              </div>
              <div 
                className="p-4 cursor-pointer"
                onClick={() => handlePostClick(news.id)}
              >
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <span className="text-blue-600 font-semibold">{news.category}</span>
                  <span>|</span>
                  <span>{news.date}</span>
                </div>
                <h3 className="text-base font-bold text-gray-900 hover:text-blue-600 transition-colors mb-2 leading-tight line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">{news.body}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Likes;