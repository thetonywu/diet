import './ProductRecs.css'

function ProductRecs({ products }) {
  if (!products?.length) return null

  return (
    <div className="product-recs">
      {products.map((p) => (
        <a
          key={p.url}
          className="product-card"
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {p.image_url && (
            <img className="product-img" src={p.image_url} alt={p.name} />
          )}
          <div className="product-info">
            <div className="product-name">{p.name}</div>
            <div className="product-why">{p.why_relevant}</div>
            <div className="product-price">${p.price_usd.toFixed(2)}</div>
          </div>
        </a>
      ))}
    </div>
  )
}

export default ProductRecs
