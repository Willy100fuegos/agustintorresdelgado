import { Link } from 'react-router-dom';

interface Post {
  id: number;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  is_published: boolean;
}

interface NoticiaCardProps {
  post: Post;
  formattedDate: string;
}

export default function NoticiaCard({ post, formattedDate }: NoticiaCardProps) {
  return (
    <div className="bg-zinc-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group">
      <Link to={`/noticias/${post.id}`} className="block">
        <div className="w-full aspect-[16/9] overflow-hidden bg-zinc-800">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover object-[center_20%] group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <i className="ri-calendar-line text-orange-500"></i>
            <span className="text-gray-400 text-sm">{formattedDate}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 min-h-[56px]">
            {post.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-3">
            {post.content.substring(0, 150)}...
          </p>
          <span className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-colors whitespace-nowrap cursor-pointer">
            Leer más
          </span>
        </div>
      </Link>
    </div>
  );
}