import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DetailPage = () => {
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [recommendedPosts, setRecommendedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const postId = window.location.pathname.split('/').pop() || '1';

    Promise.all([
      fetch(`https://dummyjson.com/posts/${postId}`).then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      }),
      fetch('https://dummyjson.com/posts?limit=10').then(res => res.json())
    ])
      .then(([postData, relatedData]) => {
        setPost(postData);
        setRelatedPosts(relatedData.posts.slice(0, 3));
        setRecommendedPosts(relatedData.posts.slice(3, 6));
        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
        setTimeout(() => navigate('/404', { replace: true }), 1500);
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Yuklanmoqda...</div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="text-center">
          <div className="mb-4">
            <svg className="w-20 h-20 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Post topilmadi</h2>
          <p className="text-sm text-gray-500">404</p>
        </div>
      </div>
    );
  }

  const getImageUrl = (postId, w = 800, h = 500) =>
    `https://picsum.photos/${w}/${h}?random=${postId}`;

  const getCategory = () => {
    const categories = ['O\'zbekiston', 'Jahon', 'Jamiyat', 'Avto', 'Jamiyat'];
    return categories[post.id % categories.length];
  };

  const handleRelatedPostClick = (id) => {
    window.location.href = `/detail/${id}`;
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          <div className="lg:col-span-1">
            <button
              onClick={() => window.history.back()}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors sticky top-6"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
          </div>

          <div className="lg:col-span-7">
            <article>
              <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
                <span className="font-semibold">{getCategory()}</span>
                <span>|</span>
                <span>16:22 / 14.11.2025</span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  10225
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  18 daqiqa o'qiladi
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              <p className="text-lg text-gray-800 font-medium mb-6 leading-relaxed">
                {post.body}
              </p>

              <div className="mb-6">
                <img
                  src={getImageUrl(post.id)}
                  alt={post.title}
                  className="w-full rounded-lg"
                />
                <p className="text-xs text-gray-500 mt-2">Foto: Mudofaa vazirligi</p>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-800 leading-relaxed mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </article>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-6 space-y-6">

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Tavsiya etamiz</h3>
                <div className="space-y-4">
                  {relatedPosts.map((r, i) => (
                    <article
                      key={r.id}
                      onClick={() => handleRelatedPostClick(r.id)}
                      className="pb-4 border-b border-gray-200 last:border-0 cursor-pointer"
                    >
                      <h4 className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2 leading-tight">
                        {r.title}
                      </h4>
                      <div className="text-xs text-gray-500">
                        {i === 0 ? 'Jahon' : i === 1 ? 'O\'zbekiston' : 'Avto'} |
                        {18 - i}:{25 + i * 5} / 14.11.2025
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">So'nggi yangiliklar</h3>
                <div className="space-y-4">
                  {recommendedPosts.map((r, i) => (
                    <article
                      key={r.id}
                      onClick={() => handleRelatedPostClick(r.id)}
                      className="pb-4 border-b border-gray-200 last:border-0 cursor-pointer"
                    >
                      <h4 className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2 leading-tight">
                        {r.title}
                      </h4>
                      <div className="text-xs text-gray-500">
                        Jamiyat | {11 + i}:{59 - i * 10} / 14.11.2025
                      </div>
                    </article>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetailPage;

