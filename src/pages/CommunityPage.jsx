import { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { useContext } from "react";
import { AccessibilityContext } from "../context/AccessibilityContext";
import { FaHeart, FaReply, FaEllipsisH, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { communityPosts } from "../data/community";

export default function CommunityPage() {
  const { t } = useTranslation();
  const { textSize, highContrast } = useContext(AccessibilityContext);
  const [posts, setPosts] = useState(communityPosts);
  const [newPost, setNewPost] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  const textSizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
    xlarge: "text-xl",
  };

  const contrastClasses = highContrast
    ? "bg-black text-white"
    : "bg-white text-gray-800";

  const buttonClasses = highContrast
    ? "bg-white text-black hover:bg-gray-200"
    : "bg-indigo-600 text-white hover:bg-indigo-700";

  const secondaryButtonClasses = highContrast
    ? "bg-gray-800 text-white hover:bg-gray-700"
    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200";

  const textGradient = highContrast
    ? "text-yellow-300"
    : "text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500";

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      const post = {
        id: Date.now(),
        content: newPost,
        author: "Current User",
        avatar: "/images/user-avatar.png",
        date: new Date().toISOString(),
        likes: 0,
        comments: [],
      };
      setPosts([post, ...posts]);
      setNewPost("");
    }
  };

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleReply = (postId, commentId = null) => {
    if (replyContent.trim()) {
      const newComment = {
        id: Date.now(),
        content: replyContent,
        author: "Current User",
        avatar: "/images/user-avatar.png",
        date: new Date().toISOString(),
        likes: 0,
        replies: [],
        parentId: commentId,
      };

      setPosts(
        posts.map((post) => {
          if (post.id !== postId) return post;

          if (commentId) {
            // Find the parent comment and add reply
            const addReplyToComment = (comments) => {
              return comments.map((comment) => {
                if (comment.id === commentId) {
                  return {
                    ...comment,
                    replies: [...comment.replies, newComment],
                  };
                }
                if (comment.replies) {
                  return {
                    ...comment,
                    replies: addReplyToComment(comment.replies),
                  };
                }
                return comment;
              });
            };
            return { ...post, comments: addReplyToComment(post.comments) };
          } else {
            // Add new top-level comment
            return { ...post, comments: [...post.comments, newComment] };
          }
        })
      );

      setReplyContent("");
      setReplyingTo(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderComments = (comments, depth = 0) => {
    return comments.map((comment) => (
      <motion.div
        key={comment.id}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className={`pl-${depth * 4} mt-4`}
        style={{ marginLeft: `${depth * 1.5}rem` }}
      >
        <div
          className={`p-4 rounded-lg ${
            highContrast ? "bg-gray-900" : "bg-gray-50"
          }`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-3">
              {comment.avatar ? (
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-10 h-10 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{comment.author}</h4>
                  <p className="text-xs text-gray-500">
                    {formatDate(comment.date)}
                  </p>
                </div>
                <button
                  className={`p-1 rounded-full ${
                    highContrast ? "hover:bg-gray-700" : "hover:bg-gray-200"
                  }`}
                  aria-label="More options"
                >
                  <FaEllipsisH className="text-sm" />
                </button>
              </div>
              <p className="mt-2">{comment.content}</p>
              <div className="flex items-center mt-3 space-x-4">
                <button
                  onClick={() => handleLike(comment.id)}
                  className={`flex items-center text-sm ${
                    highContrast ? "text-yellow-300" : "text-indigo-600"
                  }`}
                >
                  <FaHeart className="mr-1" />
                  <span>{comment.likes || t("like")}</span>
                </button>
                <button
                  onClick={() => setReplyingTo(comment.id)}
                  className={`flex items-center text-sm ${
                    highContrast ? "text-yellow-300" : "text-indigo-600"
                  }`}
                >
                  <FaReply className="mr-1" />
                  <span>{t("reply")}</span>
                </button>
              </div>
            </div>
          </div>

          {replyingTo === comment.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3"
            >
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className={`w-full p-3 border rounded mb-2 ${
                  highContrast ? "bg-white text-black" : "bg-white"
                }`}
                rows="2"
                placeholder={t("writeReply")}
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setReplyingTo(null)}
                  className={`px-3 py-1 rounded ${secondaryButtonClasses}`}
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={() => handleReply(comment.id)}
                  className={`px-3 py-1 rounded ${buttonClasses}`}
                >
                  {t("postReply")}
                </button>
              </div>
            </motion.div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3">
              {renderComments(comment.replies, depth + 1)}
            </div>
          )}
        </div>
      </motion.div>
    ));
  };

  return (
    <div
      className={`min-h-screen py-8 ${textSizes[textSize]} ${contrastClasses}`}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className={`text-4xl font-bold mb-2 ${textGradient}`}>
            {t("communityForum")}
          </h1>
          <p className="text-lg">{t("communityDescription")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-8 p-6 rounded-lg ${
            highContrast
              ? "bg-gray-900 border border-white"
              : "bg-white shadow-lg"
          }`}
        >
          <h2 className="text-xl font-bold mb-4">{t("createNewPost")}</h2>
          <form onSubmit={handleSubmitPost}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className={`w-full p-4 border rounded-lg mb-4 ${
                highContrast ? "bg-white text-black" : "bg-white"
              }`}
              rows="4"
              placeholder={t("postPlaceholder")}
              aria-label={t("postPlaceholder")}
            ></textarea>
            <div className="flex justify-end">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-2 rounded-lg font-semibold ${buttonClasses}`}
              >
                {t("post")}
              </motion.button>
            </div>
          </form>
        </motion.div>

        <div className="space-y-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-lg ${
                highContrast
                  ? "bg-gray-900 border border-white"
                  : "bg-white shadow-lg"
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  {post.avatar ? (
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{post.author}</h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(post.date)}
                      </p>
                    </div>
                    <button
                      className={`p-1 rounded-full ${
                        highContrast ? "hover:bg-gray-700" : "hover:bg-gray-200"
                      }`}
                      aria-label="More options"
                    >
                      <FaEllipsisH />
                    </button>
                  </div>
                  <p className="mt-3 mb-4">{post.content}</p>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center ${
                        highContrast ? "text-yellow-300" : "text-indigo-600"
                      }`}
                    >
                      <FaHeart className="mr-1" />
                      <span>
                        {post.likes || t("like")}{" "}
                        {post.likes > 0 && `(${post.likes})`}
                      </span>
                    </button>
                    <button
                      onClick={() => setReplyingTo(`post-${post.id}`)}
                      className={`flex items-center ${
                        highContrast ? "text-yellow-300" : "text-indigo-600"
                      }`}
                    >
                      <FaReply className="mr-1" />
                      <span>{t("comment")}</span>
                    </button>
                  </div>

                  {replyingTo === `post-${post.id}` && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4"
                    >
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className={`w-full p-3 border rounded mb-2 ${
                          highContrast ? "bg-white text-black" : "bg-white"
                        }`}
                        rows="2"
                        placeholder={t("writeComment")}
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setReplyingTo(null)}
                          className={`px-3 py-1 rounded ${secondaryButtonClasses}`}
                        >
                          {t("cancel")}
                        </button>
                        <button
                          onClick={() => handleReply(post.id)}
                          className={`px-3 py-1 rounded ${buttonClasses}`}
                        >
                          {t("postComment")}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {post.comments.length > 0 && (
                    <div className="mt-6 pt-4 border-t">
                      <h4 className="font-medium mb-3">{t("comments")}</h4>
                      {renderComments(post.comments)}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
