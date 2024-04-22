import Head from 'next/head'

interface DocumentHeaderProps {
  title?: string
  iconPath?: string
  description?: string
  ogType?: string
  ogImage?: string
}

const DocumentHeader: React.FC<DocumentHeaderProps> = ({
  title,
  iconPath,
  description,
  ogType,
  ogImage,
}) => {
  const url = typeof window !== 'undefined' ? window.location.href : ''
  return (
    <Head>
      <title>{title || 'Play Jeopardy'}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <link rel="icon" href={iconPath || '/j.png'} />

      {/* Open Graph tags */}
      <meta property="og:title" content={title || 'Play Jeopardy'} />
      <meta property="og:type" content={ogType || 'website'} />
      <meta property="og:url" content={url} />
      <meta
        property="og:image"
        content={ogImage || iconPath || '/j.png'}
      />
      <meta property="og:description" content={description || 'Play Jeopardy'} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="Play Jeopardy" />
      <meta name="twitter:title" content={title || 'Play Jeopardy'} />
      <meta name="twitter:description" content={description || 'Play Jeopardy'} />
      <meta
        name="twitter:image"
        content={ogImage || iconPath || '/j.png'}
      />
    </Head>
  )
}

export default DocumentHeader
