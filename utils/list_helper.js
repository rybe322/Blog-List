const dummy = (blogs) => {
  return 1
}

const totalLikes = (blog) => {
  return blog.likes
}


// Takes an array of blogs and returns the blog with the most likes
const mostLikes = (blogs) => {
  let mostLiked = blogs[0]
  blogs.forEach(blog => {
    mostLiked = mostLiked.likes > blog.likes ? mostLiked : blog
  })
  return mostLiked
}

module.exports = { dummy, totalLikes, mostLikes }