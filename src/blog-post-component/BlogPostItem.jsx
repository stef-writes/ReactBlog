import { Link } from 'react-router-dom';  // Client-side navigation component
import styles from './BlogPostItem.module.css';  // Scoped CSS -> prevents style conflicts

const BlogPostItem = ({ id, title, summary, date }) => {  // Destructured props from BlogPostList
    const formattedDate = new Date(date).toLocaleDateString('en-US', {  // Format ISO date -> readable string
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });  

  return (
    <article className={styles.blogPostItem}>  {/* Semantic HTML -> better accessibility */}
      <Link to={`/post/${id}`} className={styles.titleLink} aria-label={`Read full article: ${title}`}>  {/* No-reload navigation */}
        <h2 className={styles.title}>{title}</h2>
      </Link>
      <p className={styles.summary}>{summary}</p>
      <time className={styles.date} dateTime={date}>Published on {formattedDate}</time>  {/* Semantic time -> machine readable */}
    </article>
  );
};

export default BlogPostItem;