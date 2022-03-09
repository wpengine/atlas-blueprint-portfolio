const PUBLISH_DATE_FORMAT = { year: 'numeric', month: 'long', day: 'numeric'};

export default function PostInfo({className, author, date}) {
    if ( ! date && ! author ) {
        return null;
    }

    const postedAt = new Date(date)?.toLocaleDateString("en-US", PUBLISH_DATE_FORMAT) ?? undefined;

    return (
        <div className={ className }>
            { date && <time dateTime={date}>{postedAt}</time> }
            { ( date && author ) && <>&nbsp;</> }
            { author && <span>By {author}</span> }
        </div>
    );
}