
import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Heart,
  Search,
  SlidersHorizontal,
  ShoppingBag,
  X
} from 'lucide-react';

import styles from './ShopPage.module.css';

import chair from './assets/chair.jpg';
import headphones from './assets/headphones.jpg';
import lamp from './assets/lamp.jpg';
import camera from './assets/camera.jpg';

const items = [
  {
    id: 1,
    title: 'The Lekki lounge chair',
    category: 'Furniture & home',
    location: 'Lekki, Lagos',
    city: 'Lagos',
    condition: 'New',
    price: 145000,
    image: chair,
    seller: 'Studio Nook',
    verified: false,
    availableToday: true
  },
  {
    id: 2,
    title: 'Wireless headphones',
    category: 'Electronics',
    location: 'Ikeja, Lagos',
    city: 'Lagos',
    condition: 'New',
    price: 58000,
    image: headphones,
    seller: 'Sound House',
    verified: true,
    availableToday: true
  },
  {
    id: 3,
    title: 'Walnut bedside lamp',
    category: 'Furniture & home',
    location: 'Wuse II, Abuja',
    city: 'Abuja',
    condition: 'Handmade',
    price: 32000,
    image: lamp,
    seller: 'Wood & Light',
    verified: true,
    availableToday: false
  },
  {
    id: 4,
    title: 'Lounge chair · Natural',
    category: 'Furniture & home',
    location: 'Port Harcourt',
    city: 'Port Harcourt',
    condition: 'New',
    price: 135000,
    image: chair,
    seller: 'Local maker',
    verified: false,
    availableToday: true
  },
  {
    id: 5,
    title: 'Creator camera kit',
    category: 'Electronics',
    location: 'Yaba, Lagos',
    city: 'Lagos',
    condition: 'Like new',
    price: 420000,
    image: camera,
    seller: 'Creator Supply',
    verified: false,
    availableToday: false
  },
  {
    id: 6,
    title: 'Studio headphones',
    category: 'Electronics',
    location: 'Lagos',
    city: 'Lagos',
    condition: 'New',
    price: 62000,
    image: headphones,
    seller: 'Sound House',
    verified: true,
    availableToday: true
  }
];

const categories = [
  'All products',
  'Furniture',
  'Electronics',
  'Fashion',
  'Home & living'
];

const sidebarCategories = [
  'Furniture & home',
  'Electronics',
  'Creative services',
  'Rentals',
  'Jobs'
];

const money = value => `₦${Number(value).toLocaleString('en-NG')}`;

function matchesCategory(product, category) {
  if (category === 'All products') return true;

  if (category === 'Furniture' || category === 'Home & living') {
    return product.category === 'Furniture & home';
  }

  return product.category === category;
}

export default function ShopPage({ onHome, onRent }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All products');
  const [location, setLocation] = useState('All locations');
  const [minPrice, setMinPrice] = useState('10000');
  const [maxPrice, setMaxPrice] = useState('250000');
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [availableToday, setAvailableToday] = useState(false);
  const [checkedCategories, setCheckedCategories] = useState([
    'Furniture & home'
  ]);
  const [sortBy, setSortBy] = useState('Recommended');
  const [saved, setSaved] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const filtered = useMemo(() => {
    const searchText = query.trim().toLowerCase();
    const lowerPrice = Number(minPrice) || 0;
    const upperPrice = maxPrice === '' ? Infinity : Number(maxPrice);

    let result = items.filter(product => {
      const matchesSearch = [
        product.title,
        product.category,
        product.location,
        product.seller,
        product.condition
      ].join(' ').toLowerCase().includes(searchText);

      const matchesSelectedCategory = matchesCategory(product, category);

      const matchesSidebarCategory =
        checkedCategories.length === 0 ||
        checkedCategories.includes(product.category) ||
        (checkedCategories.includes('Home & living') &&
          product.category === 'Furniture & home');

      const matchesLocation =
        location === 'All locations' || product.city === location;

      const matchesPrice =
        product.price >= lowerPrice &&
        product.price <= upperPrice;

      const matchesVerified = !verifiedOnly || product.verified;
      const matchesAvailability =
        !availableToday || product.availableToday;

      return (
        matchesSearch &&
        matchesSelectedCategory &&
        matchesSidebarCategory &&
        matchesLocation &&
        matchesPrice &&
        matchesVerified &&
        matchesAvailability
      );
    });

    if (sortBy === 'Price: low to high') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: high to low') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Newest first') {
      result = [...result].sort((a, b) => b.id - a.id);
    }

    return result;
  }, [
    query,
    category,
    location,
    minPrice,
    maxPrice,
    verifiedOnly,
    availableToday,
    checkedCategories,
    sortBy
  ]);

  const toggleSave = id => {
    setSaved(current =>
      current.includes(id)
        ? current.filter(savedId => savedId !== id)
        : [...current, id]
    );
  };

  const toggleSidebarCategory = name => {
    setCheckedCategories(current =>
      current.includes(name)
        ? current.filter(item => item !== name)
        : [...current, name]
    );
  };

  const clearFilters = () => {
    setQuery('');
    setCategory('All products');
    setLocation('All locations');
    setMinPrice('10000');
    setMaxPrice('250000');
    setVerifiedOnly(false);
    setAvailableToday(false);
    setCheckedCategories([]);
    setSortBy('Recommended');
    setPageNumber(1);
  };

  const chooseCategory = name => {
    setCategory(name);
    setCheckedCategories([]);
    setPageNumber(1);
  };

  const applyFilters = () => {
    setPageNumber(1);
    setShowFilters(false);
  };

  const goToPage = nextPage => {
    setPageNumber(Math.max(1, Math.min(22, nextPage)));
    document.querySelector(`.${styles.main}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className={styles.page}>
      

      <main className={styles.main}>
        <div className={styles.eyebrow}>
          03 / SHOPPING / PRODUCT LISTINGS
        </div>

        <h1>Thoughtful finds. Local prices.</h1>

        <p className={styles.subtitle}>
          Furniture, technology and everyday essentials from Nigerian sellers.
        </p>

        <label className={styles.search}>
          <Search size={18} aria-hidden="true" />
          <input
            value={query}
            onChange={event => {
              setQuery(event.target.value);
              setPageNumber(1);
            }}
            placeholder="Search products"
            aria-label="Search products"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </label>

        <div className={styles.categories} aria-label="Product categories">
          {categories.map(name => (
            <button
              key={name}
              onClick={() => chooseCategory(name)}
              className={
                category === name ? styles.selectedCategory : ''
              }
              aria-pressed={category === name}
            >
              {name}
            </button>
          ))}
        </div>

        <div className={styles.shopLayout}>
          <aside className={styles.filters}>
            <h2>Refine your results</h2>

            <label className={styles.filterField}>
              <span>Location</span>
              <select
                value={location}
                onChange={event => {
                  setLocation(event.target.value);
                  setPageNumber(1);
                }}
              >
                <option value="All locations">All locations</option>
                <option value="Lagos">Lagos, Nigeria</option>
                <option value="Abuja">Abuja, Nigeria</option>
                <option value="Port Harcourt">Port Harcourt</option>
              </select>
            </label>

            <div className={styles.filterField}>
              <span>Price range (₦)</span>
              <div className={styles.priceRange}>
                <input
                  type="number"
                  min="0"
                  value={minPrice}
                  onChange={event => {
                    setMinPrice(event.target.value);
                    setPageNumber(1);
                  }}
                  aria-label="Minimum price"
                />
                <span className={styles.priceDash}>—</span>
                <input
                  type="number"
                  min="0"
                  value={maxPrice}
                  onChange={event => {
                    setMaxPrice(event.target.value);
                    setPageNumber(1);
                  }}
                  aria-label="Maximum price"
                />
              </div>
            </div>

            <div className={styles.categoryFilters}>
              <h3>Category</h3>
              {sidebarCategories.map((name, index) => (
                <label className={styles.check} key={name}>
                  <input
                    type="checkbox"
                    checked={checkedCategories.includes(name)}
                    onChange={() => toggleSidebarCategory(name)}
                  />
                  <span>{name}</span>
                </label>
              ))}
            </div>

            <div className={styles.filterDivider} />

            <label className={styles.check}>
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={event => {
                  setVerifiedOnly(event.target.checked);
                  setPageNumber(1);
                }}
              />
              <span>Identity-verified sellers</span>
            </label>

            <label className={styles.check}>
              <input
                type="checkbox"
                checked={availableToday}
                onChange={event => {
                  setAvailableToday(event.target.checked);
                  setPageNumber(1);
                }}
              />
              <span>Available today</span>
            </label>

            <label className={styles.filterField}>
              <span>Sort by</span>
              <select
                value={sortBy}
                onChange={event => setSortBy(event.target.value)}
              >
                <option>Recommended</option>
                <option>Price: low to high</option>
                <option>Price: high to low</option>
                <option>Newest first</option>
              </select>
            </label>

            <button className={styles.apply} onClick={applyFilters}>
              Apply filters
            </button>

            <button className={styles.clear} onClick={clearFilters}>
              Clear all
            </button>
          </aside>

          <section className={styles.productArea} aria-label="Shop products">
            <div className={styles.resultsBar}>
              <span>
                {filtered.length} products in Lagos · {sortBy}
              </span>
              <button
                className={styles.mobileFilterButton}
                onClick={() => setShowFilters(value => !value)}
              >
                <SlidersHorizontal size={15} />
                Filter &amp; sort
              </button>
            </div>

            {showFilters && (
              <div className={styles.mobileFilterNotice}>
                Use the filter panel to refine your products.
                <button onClick={() => setShowFilters(false)}>Close</button>
              </div>
            )}

            <div className={styles.grid}>
              {filtered.map(product => (
                <article className={styles.card} key={product.id}>
                  <div className={styles.photo}>
                    <img src={product.image} alt={product.title} />

                    <button
                      className={styles.heart}
                      onClick={() => toggleSave(product.id)}
                      aria-label={
                        saved.includes(product.id)
                          ? 'Remove saved item'
                          : 'Save item'
                      }
                    >
                      <Heart
                        size={18}
                        fill={
                          saved.includes(product.id)
                            ? 'currentColor'
                            : 'none'
                        }
                      />
                    </button>
                  </div>

                  <div className={styles.cardBody}>
                    <h3>{product.title}</h3>

                    <p>
                      {product.verified ? 'Identity verified' : 'Advertised'}
                      {' · '}
                      {product.location}
                      {' · '}
                      {product.condition}
                      {' · '}
                      {product.seller}
                    </p>

                    <strong>{money(product.price)}</strong>

                    <div className={styles.links}>
                      <button onClick={() => setSelected(product)}>
                        View details <ArrowUpRight size={14} />
                      </button>

                      <button onClick={() => toggleSave(product.id)}>
                        <Heart
                          size={14}
                          fill={
                            saved.includes(product.id)
                              ? 'currentColor'
                              : 'none'
                          }
                        />
                        {saved.includes(product.id) ? 'Saved' : 'Save'}
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              {filtered.length === 0 && (
                <div className={styles.empty}>
                  No products match your search. Try another keyword or clear
                  your filters.
                </div>
              )}
            </div>

            <div className={styles.pagination}>
              <p>
                Showing {filtered.length} of {filtered.length} available demo
                listings · Page {pageNumber} of 22
              </p>

              <div className={styles.pageControls}>
                {pageNumber > 1 && (
                  <button onClick={() => goToPage(pageNumber - 1)}>
                    <ArrowLeft size={14} /> Previous page
                  </button>
                )}
                <button
                  onClick={() => goToPage(pageNumber + 1)}
                  disabled={pageNumber >= 22}
                >
                  Next page <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className={styles.note}>
          A deposit is not a fee. Any applicable delivery costs and seller terms
          should be reviewed before checkout.
        </div>
      </main>

      <footer className={styles.footer}>
        <span>
          © KHUB · Privacy · Terms · Illustrative marketplace content
        </span>
        <span>Trust &amp; safety　/　Contact support</span>
      </footer>

      {selected && (
        <div
          className={styles.overlay}
          onMouseDown={event => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <section
            className={styles.detail}
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-detail-title"
          >
            <button
              className={styles.back}
              onClick={() => setSelected(null)}
            >
              <ArrowLeft size={16} /> Back to products
            </button>

            <img src={selected.image} alt={selected.title} />

            <span className={styles.eyebrow}>
              SHOPPING / PRODUCT DETAIL
            </span>

            <h2 id="product-detail-title">{selected.title}</h2>

            <p>
              {selected.category} · {selected.location}
            </p>

            <strong className={styles.detailPrice}>
              {money(selected.price)}
            </strong>

            <p>
              Seller: {selected.seller}. Contact the seller to confirm
              availability, delivery options and product details before
              purchasing.
            </p>

            <button
              className={styles.apply}
              onClick={() => {
                setSelected(null);
                window.alert(
                  'Demo only: checkout is not connected yet.'
                );
              }}
            >
              <ShoppingBag size={15} /> Add to cart
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
