import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import heart from "../assets/images/heart.svg";
import heart_active from "../assets/images/heart_active.svg";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();


  useEffect(() => {
    fetch('https://dummyjson.com/posts?limit=50')
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts);
        setLoading(false);
      })
      .catch(() => setLoading(false));


    const savedLikes = localStorage.getItem('likedNews');
    if (savedLikes) {
      setLikedPosts(JSON.parse(savedLikes));
    }
  }, []);


  const isLiked = (postId) => {
    return likedPosts.some(item => item.id === postId);
  };


  const toggleLike = (e, post) => {
    e.stopPropagation(); 
    
    let updatedLikes;
    
    if (isLiked(post.id)) {
  
      updatedLikes = likedPosts.filter(item => item.id !== post.id);
    } else {
    
      const newsData = {
        id: post.id,
        title: post.title,
        body: post.body,
        image: getImageUrl(post),
        category: getCategory(post, 0),
        date: getPostDate(post)
      };
      updatedLikes = [...likedPosts, newsData];
    }
    
    setLikedPosts(updatedLikes);
    localStorage.setItem('likedNews', JSON.stringify(updatedLikes));
  };

  const handlePostClick = (postId) => {
    navigate(`/detail/${postId}`);
  };

  const getImageUrl = (post, width = 600, height = 400) => {
    if (post.image) return post.image;
    return `https://picsum.photos/${width}/${height}?random=${post.id}`;
  };

  const getPostDate = (post) => {
    if (post.date) return post.date;
    if (post.createdAt) return new Date(post.createdAt).toLocaleDateString('uz-UZ');
    return `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, '0')} / 14.11.2025`;
  };

  const getCategory = (post, index) => {
    if (post.category) return post.category;
    const categories = ['Sport', 'Jahon', 'Jamiyat', 'Iqtisod', 'Texnologiya', 'Madaniyat', 'O\'zbekiston', 'Moliya'];
    return categories[index % categories.length];
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="text-center">Yuklanmoqda...</div>
      </div>
    );
  }

  const mainPost = posts[0];
  const leftColumnPosts = posts.slice(1, 2);
  const rightColumnPosts = posts.slice(7, 16);
  const dolzarbPosts = posts.slice(20, 24);


  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
      
        <div className="lg:col-span-4 space-y-6">
          {mainPost && (
            <article 
              onClick={() => handlePostClick(mainPost.id)}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer relative"
            >
              <img
                src={getImageUrl(mainPost, 600, 400)}
                alt={mainPost.title}
                className="w-full h-64 object-cover"
              />
            
              <button
                onClick={(e) => toggleLike(e, mainPost)}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:bg-red-500"
              >
                <img 
                  src={isLiked(mainPost.id) ? heart_active : heart} 
                  alt="like" 
                  className="w-6 h-6"
                />
              </button>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <span className="text-blue-600 font-semibold">{getCategory(mainPost, 0)}</span>
                  <span>|</span>
                  <span>{getPostDate(mainPost)}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors mb-3 leading-tight">
                  {mainPost.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">{mainPost.body}</p>
              </div>
            </article>
          )}

          {leftColumnPosts.map((post, index) => (
            <article 
              key={post.id} 
              onClick={() => handlePostClick(post.id)}
              className="border-b border-gray-200 pb-5 cursor-pointer relative bg-white rounded-2xl "
            >
              {index === 0 && (
                <div className="mb-3 relative">
                  <img
                    src={getImageUrl(post, 400, 250)}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
               
                  <button
                    onClick={(e) => toggleLike(e, post)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:bg-red-500"
                  >
                    <img 
                      src={isLiked(post.id) ? heart_active : heart} 
                      alt="like" 
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              )}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 hover:text-blue-600 transition-colors mb-2 leading-snug">
                    {post.title}
                  </h3>
                </div>
      
                {index !== 0 && (
                  <button
                    onClick={(e) => toggleLike(e, post)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <img 
                      src={isLiked(post.id) ? heart_active : heart} 
                      alt="like" 
                      className="w-5 h-5"
                    />
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

     
        <div className="lg:col-span-4 space-y-5">
          {posts.slice(7, 13).map((post, index) => (
            <article 
              key={post.id} 
              onClick={() => handlePostClick(post.id)}
              className="flex gap-4 pb-5 border-b border-gray-200 cursor-pointer bg-white p-4 rounded-2xl"
            >
              <img
                src={getImageUrl(post, 150, 100)}
                alt={post.title}
                className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors mb-2 leading-tight line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                  {post.body.substring(0, 80)}...
                </p>
              </div>
           
              <button
                onClick={(e) => toggleLike(e, post)}
                className="p-1 hover:scale-110 transition-transform self-start"
              >
                <img 
                  src={isLiked(post.id) ? heart_active : heart} 
                  alt="like" 
                  className="w-5 h-5"
                />
              </button>
            </article>
          ))}
        </div>
        <div className="lg:col-span-4">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900">{t('home.latest_news')}</h2>
          </div>

          <div className="space-y-6">
            {rightColumnPosts.map((post, index) => (
              <article 
                key={post.id} 
                onClick={() => handlePostClick(post.id)}
                className="pb-4 border-b border-gray-200 cursor-pointer flex items-start gap-2 bg-white border-2 rounded-lg p-2 flex"
              >
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2 leading-snug">
                    {post.title}
                  </h3>
                 
                </div>
                <button
                  onClick={(e) => toggleLike(e, post)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <img 
                    src={isLiked(post.id) ? heart_active : heart} 
                    alt="like" 
                    className="w-5 h-5"
                  />
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{t('home.current posts')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dolzarbPosts.map((post) => (
            <article 
              key={post.id} 
              onClick={() => handlePostClick(post.id)}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer relative"
            >
              <img
                src={getImageUrl(post, 400, 250)}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
           
              <button
                onClick={(e) => toggleLike(e, post)}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform hover:bg-red-500"
              >
                <img 
                  src={isLiked(post.id) ? heart_active : heart} 
                  alt="like" 
                  className="w-5 h-5"
                />
              </button>
              <div className="p-4">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                </div>
                <h3 className="text-base font-bold text-gray-900 hover:text-blue-600 transition-colors leading-tight line-clamp-3">
                  {post.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
export default HomePage;