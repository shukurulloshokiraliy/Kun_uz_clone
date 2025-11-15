import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/posts?limit=50')
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container py-8">
        <div className="text-center">Yuklanmoqda...</div>
      </div>
    );
  }

  const mainPost = posts[0];
  const leftColumnPosts = posts.slice(1, 7);
  const rightColumnPosts = posts.slice(7, 20);
  const dolzarbPosts = posts.slice(20, 24);
  const maqolalarPosts = posts.slice(24, 32);

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

  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
        <div className="lg:col-span-4 space-y-6">
          {mainPost && (
            <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img
                src={getImageUrl(mainPost, 600, 400)}
                alt={mainPost.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <span className="text-blue-600 font-semibold">{getCategory(mainPost, 0)}</span>
                  <span>|</span>
                  <span>{getPostDate(mainPost)}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors mb-3 leading-tight">
                  {mainPost.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">{mainPost.body}</p>
              </div>
            </article>
          )}

          {leftColumnPosts.map((post, index) => (
            <article key={post.id} className="border-b border-gray-200 pb-5">
              {index === 0 && (
                <div className="mb-3">
                  <img
                    src={getImageUrl(post, 400, 250)}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors mb-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {getCategory(post, index)} | {getPostDate(post)}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-5">
          {posts.slice(7, 13).map((post, index) => (
            <article key={post.id} className="flex gap-4 pb-5 border-b border-gray-200">
              <img
                src={getImageUrl(post, 150, 100)}
                alt={post.title}
                className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors mb-2 leading-tight line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                  {post.body.substring(0, 80)}...
                </p>
                <p className="text-xs text-gray-500">
                  {getCategory(post, index)} | {getPostDate(post)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="lg:col-span-4">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900">So'nggi yangiliklar</h2>
          </div>

          <div className="space-y-4">
            {rightColumnPosts.map((post, index) => (
              <article key={post.id} className="pb-4 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors mb-2 leading-snug">
                  {post.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  {index % 3 === 0 && (
                    <span className="flex items-center gap-1 text-blue-600 font-medium">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                      </svg>
                      {getCategory(post, index)}
                    </span>
                  )}
                  {index % 3 === 1 && (
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                      </svg>
                      {getCategory(post, index)}
                    </span>
                  )}
                  <span className="ml-auto">{getPostDate(post)}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <section className="mb-10">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Dolzarb xabarlar</h2>
          <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dolzarbPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img
                src={getImageUrl(post, 400, 250)}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {getPostDate(post)}
                  </span>
                </div>
                <h3 className="text-base font-bold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors leading-tight line-clamp-3">
                  {post.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Maqolalar</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {maqolalarPosts.map((post, index) => (
            <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="relative">
                <img
                  src={getImageUrl(post, 300, 200)}
                  alt={post.title}
                  className="w-full h-40 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold text-gray-900 hover:text-blue-600 transition-colors leading-tight mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span className="flex items-center gap-1 text-blue-600 font-medium">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="8"/>
                    </svg>
                    {getCategory(post, index)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;