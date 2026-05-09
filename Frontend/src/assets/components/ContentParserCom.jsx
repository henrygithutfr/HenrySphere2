const ContentParser = ({ content }) => {
    return ( 
        <>
        <div dangerouslySetInnerHTML={{ __html: content}} />
        </>
    )
}

export default ContentParser;