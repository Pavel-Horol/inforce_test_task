import {FC} from "react";

interface CommentProps {
    description: string
    createdAt: Date
}

const Comment:FC<CommentProps> = ({description, createdAt}) => {
    return (
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
            <p className="text-gray-800 mb-2">{description}</p>
            <span className="text-sm text-gray-500">
        {new Date(createdAt).toLocaleDateString()}
      </span>
        </div>
    );
};

export default Comment;