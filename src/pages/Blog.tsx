import React, { useEffect, useState } from "react";
import "../../public/css/style.css";
import BlogPostItem from "../components/BlogPostItem";
import RecentPostItem from "../components/RecentPostItem";
import axios from "axios"; // Import the auth instance

import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { IoSearch } from "react-icons/io5";
import { auth } from "../utils/configur";

interface Data {
  id: number;
  title: string;
  image: string;
  category: string;
  author: string;
  authorPic: string;
  published_date: string;
  reading_time: string;
  content: string;
  tags: string[];
}

const Blog: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [filteredData, setFilteredData] = useState<Data[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const postsPerPage = 3;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/blogs`
        );
        setData(response.data);
        setFilteredData(response.data);
      } catch (err) {
        setError("Failed to fetch blogs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((blog) =>
        blog.author.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const filterBlogs = () => {
    let filtered = data;

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((blog) =>
        blog.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((blog) => blog.category === selectedCategory);
    }

    if (selectedTag) {
      filtered = filtered.filter((blog) => blog.tags.includes(selectedTag));
    }

    setFilteredData(filtered);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category); // Toggle category filter
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag); // Toggle tag filter
  };

  useEffect(() => {
    filterBlogs();
  }, [searchQuery, selectedCategory, selectedTag]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Sign in with Google
  const handleSignIn = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in", error);
    }
  };

  // Sign out user
  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {/* Breadcrumb Area */}
      <section
        className="breadcrumb-area breadcrumb-bg"
        style={{ backgroundImage: "url(img/bg/breadcrumb_bg.jpg)" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "relative",
            bottom: "150px",
            right: "20px",
          }}
        >
          <li className="header-btn">
            {user ? (
              <button onClick={handleSignOut} className="btn">
                Sign Out
              </button>
            ) : (
              <button onClick={handleSignIn} className="btn">
                Sign In
              </button>
            )}
          </li>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-content">
                <h2 className="title">New Blogs</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item active">Blog Page</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Area */}
      <section
        className="blog-area blog-bg"
        style={{ backgroundImage: "url(img/bg/blog_bg.jpg)" }}
      >
        <div className="container">
          <div className="row">
            {/* Blog Posts */}
            <div className="col-lg-8">
              {currentPosts.map((blog) => (
                <BlogPostItem
                  id={blog.id}
                  imgSrc={blog.image}
                  date={blog.published_date}
                  title={blog.title}
                  description={blog.content.slice(0, 100) + "..."}
                  author={blog.author}
                  likes={Math.floor(Math.random() * 100)} // Replace with actual data if available
                  comments={Math.floor(Math.random() * 50)} // Replace with actual data if available
                />
              ))}

              {/* Pagination */}
              <div className="pagination-wrap mt-60">
                <nav>
                  <ul>
                    {/* Previous Button */}
                    {currentPage > 1 && (
                      <li style={{ cursor: "pointer" }}>
                        <a onClick={() => paginate(currentPage - 1)}>
                          Previous
                        </a>
                      </li>
                    )}

                    {/* Current Page */}
                    <li className="active">
                      <a onClick={() => paginate(currentPage)}>{currentPage}</a>
                    </li>

                    {/* Next Button */}
                    {currentPage < Math.ceil(data.length / postsPerPage) && (
                      <li style={{ cursor: "pointer" }}>
                        <a onClick={() => paginate(currentPage + 1)}>Next</a>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <aside className="blog-sidebar">
                <div className="widget blog-widget">
                  <div className="widget-title mb-30">
                    <h5 className="title">Search Blogs</h5>
                  </div>
                  <form action="#" className="sidebar-search">
                    <input
                      type="text"
                      placeholder="Search by author..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                    <button type="button">
                      <i className="fas fa-search">
                        <IoSearch size={25} />
                      </i>
                    </button>
                  </form>
                </div>
                <div className="widget blog-widget">
                  <div className="widget-title mb-30">
                    <h5 className="title">Categories</h5>
                  </div>
                  <div className="sidebar-cat">
                    <ul>
                      {Array.from(
                        new Set(data.map((item) => item.category))
                      ).map((category, index) => (
                        <li
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignContent: "center",
                            cursor: "pointer",
                            marginTop: "10px",
                            padding: "0",
                          }}
                          key={index}
                        >
                          <p
                            className={
                              category === selectedCategory ? "active" : ""
                            }
                            onClick={() => handleCategoryClick(category)}
                          >
                            {category}
                          </p>
                          <span>
                            {
                              data.filter((item) => item.category === category)
                                .length
                            }
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="widget blog-widget">
                  <div className="widget-title mb-30">
                    <h5 className="title">Recent Posts</h5>
                  </div>
                  <div className="rc-post">
                    <ul>
                      {data.slice(0, 3).map((recent) => (
                        <RecentPostItem
                          postId={recent.id}
                          imgSrc={recent.image}
                          title={recent.title}
                          date={recent.published_date}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="widget blog-widget">
                  <div className="widget-title mb-30">
                    <h5 className="title">Tag Post</h5>
                  </div>
                  <div className="tag-list">
                    <ul>
                      {Array.from(
                        new Set(data.flatMap((item) => item.tags))
                      ).map((tag, index) => (
                        <li key={index}>
                          <p
                            className={tag === selectedTag ? "active" : ""}
                            onClick={() => handleTagClick(tag)}
                          >
                            {tag}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
