import { useParams } from "react-router-dom";
import RecentPostItem from "../components/RecentPostItem";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaQuoteRight,
  FaRegUser,
  FaTags,
  FaTwitter,
} from "react-icons/fa";
import { LuClock4 } from "react-icons/lu";

interface Blog {
  id: any;
  title: string;
  content: string;
  author: string;
  tags: string[];
  reading_time: string;
  published_date: string;
  category: string;
  image: string;
  authorPic: string;
}

export default function BlogDetails() {
  const { id } = useParams<{ id: any }>();
  console.log(id);
  const [data, setData] = useState<Blog[]>([]);
  const [blogData, setBlogData] = useState<Blog | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<Blog[]>([]);

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

  useEffect(() => {
    // Simulated API call to fetch blog data by blogId
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/blogs/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch blog data");
        const data = await response.json();
        setBlogData(data[0]);
        console.log(data);
      } catch (error) {
        setError("Failed to fetch blogs");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id]);

  const filterBlogs = () => {
    let filtered = data;

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
  }, [selectedCategory, selectedTag]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!blogData) return <p>Blog not found</p>;

  return (
    <>
      <section
        className="breadcrumb-area breadcrumb-bg"
        style={{ backgroundImage: "url(img/bg/breadcrumb_bg.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-content">
                <h2 className="title">{blogData.author}</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item active">Author</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="blog-area blog-bg"
        style={{ backgroundImage: "url(img/bg/blog_bg.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-post-item blog-details-wrap">
                <div className="blog-post-thumb">
                  <a href="blog-details.html">
                    <img
                      style={{ height: "400px", width: "740px" }}
                      src={blogData.image}
                      alt="Blog Thumbnail"
                    />
                  </a>
                </div>
                <div className="blog-post-content">
                  <div className="blog-details-top-meta">
                    <span
                      className="user"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "5px",
                      }}
                    >
                      <i className="far fa-user">
                        <FaRegUser />
                      </i>{" "}
                      <div style={{ marginTop: "2px" }}>by</div>
                      <p>{blogData.author}</p>
                    </span>
                    <span className="date">
                      <i className="far fa-clock">
                        <LuClock4 />
                      </i>{" "}
                      {blogData.published_date}
                    </span>
                  </div>
                  <h2 className="title">{blogData.title}</h2>
                  <p>{blogData.content}</p>

                  <blockquote>
                    <i className="fas fa-quote-right">
                      <FaQuoteRight />
                    </i>
                    <p>
                      Welcome to our Blog App, where creativity meets community!
                      Whether you're a passionate writer eager to share your
                      thoughts or an avid reader looking for inspiring stories,
                      this is the perfect platform for you. With a clean,
                      user-friendly interface and powerful features, our app
                      makes it easy to publish, discover, and connect.
                    </p>
                    <figure>
                      <span>{blogData.author}</span> AUTHOR
                    </figure>
                  </blockquote>
                  <div className="blog-img-wrap">
                    <div className="row">
                      <div className="col-sm-6">
                        <img
                          src="img/blog/blog_details_img01.jpg"
                          alt="Blog Details 1"
                        />
                      </div>
                      <div className="col-sm-6">
                        <img
                          src="img/blog/blog_details_img02.jpg"
                          alt="Blog Details 2"
                        />
                      </div>
                    </div>
                  </div>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s.
                  </p>
                  <div className="blog-post-meta">
                    <div className="blog-details-tags">
                      <ul>
                        <li>
                          <i className="fas fa-tags">
                            <FaTags />
                          </i>{" "}
                          <span>Tags :</span>
                        </li>
                        {blogData.tags.map((tag, index) => (
                          <li key={index}>
                            <p> {tag}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="blog-post-share">
                      <a href="#">
                        <i className="fab fa-facebook-f">
                          <FaFacebookF />
                        </i>
                      </a>
                      <a href="#">
                        <i className="fab fa-twitter">
                          <FaTwitter />
                        </i>
                      </a>
                      <a href="#">
                        <i className="fab fa-pinterest-p">
                          <FaPinterestP />
                        </i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* <AuthorSection />
              
            <CommentsSection />
            <CommentForm /> */}
              <div className="avatar-post mt-40 mb-80">
                <div className="post-avatar-img">
                  <img src="avatar.png" alt="Author Avatar" />
                </div>
                <div className="post-avatar-content">
                  <h5>{blogData.author}</h5>
                  <p>
                    Printing and typetting industry. Lorem Ipsum has been the
                    instry standrd the dummy text ever since the, when an
                    unknown printer took a galley.
                  </p>
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fab fa-facebook-f">
                          {" "}
                          <FaFacebookF />
                        </i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-twitter">
                          {" "}
                          <FaTwitter />
                        </i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-instagram">
                          <FaInstagram />
                        </i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <aside className="blog-sidebar">
                {/* <div className="widget blog-widget">
                  <div className="widget-title mb-30">
                    <h5 className="title">Search Objects</h5>
                  </div>
                  <form action="#" className="sidebar-search">
                    <input type="text" placeholder="Search..." />
                    <button>
                      <i className="fas fa-search"></i>
                    </button>
                  </form>
                </div> */}
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

            {/* Blog Posts */}

            {/* Sidebar */}
          </div>
        </div>
      </section>
    </>
  );
}
