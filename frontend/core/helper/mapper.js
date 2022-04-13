export const postMapper = post => (
    {
        ...post,
        content: post.description,
        _id: post.id,
        media: post.images.map(image => (
            {
                ...image,
                _id : image.id,
                url: `/images/${image.link}`
            }
        ))
    }
);