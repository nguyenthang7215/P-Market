import { Card, CardContent, CardHeader } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Star, ThumbsDown } from 'lucide-react';

export default function ReviewCard({ review }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-3 pb-2">
        <Avatar src="/avatar.png" />
        <div>
          <h4 className="font-semibold">{review.author}</h4>
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill={i < review.rating ? 'currentColor' : 'none'} />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{review.comment}</p>
        {!review.isVerified && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700">
            <ThumbsDown size={16} />
            <p className="text-sm">
              <strong>Đã trừ điểm:</strong> {review.reason}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}