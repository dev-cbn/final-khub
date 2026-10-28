
import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Search, CheckCircle2 } from 'lucide-react';
import styles from './ServicesPage.module.css';
import serviceImage from './assets/service.jpg';

const providers = [
  {
    id: 1,
    title: 'Brand identity by Ada Studio',
    category: 'Design',
    seller: 'Ada Okafor',
    location: 'Lagos',
    delivery: 'Remote',
    rating: 4.9,
    reviews: 28,
    price: 45000,
    verified: true,
    advertised: false,
    available: true,
    image: serviceImage,
    label: 'IDENTITY VERIFIED',
    description: 'Brand strategy, logos and visual identity for growing businesses.'
  },
  {
    id: 2,
    title: 'Launch-ready website',
    category: 'Technology',
    seller: 'Tunde Webworks',
    location: 'Abuja',
    delivery: 'Remote',
    rating: 4.8,
    reviews: 41,
    price: 120000,
    verified: true,
    advertised: true,
    available: true,
    label: 'WEB / BUILD',
    description: 'Your next chapter, online.'
  },
  {
    id: 3,
    title: 'Product photography',
    category: 'Photography',
    seller: 'Frame House',
    location: 'Lekki, Lagos',
    delivery: 'On-site',
    rating: 4.7,
    reviews: 19,
    price: 35000,
    verified: true,
    advertised: false,
    available: true,
    label: 'FRAME / SHOOT',
    description: 'The details, beautifully seen.'
  },
  {
    id: 4,
    title: 'Home electrical repair',
    category: 'Home & repairs',
    seller: 'Chidi Technical',
    location: 'Port Harcourt',
    delivery: 'On-site',
    rating: 4.8,
    reviews: 62,
    price: 15000,
    verified: false,
    advertised: false,
    available: false,
    label: 'HOME / REPAIR',
    description: 'Skilled hands. A safer home.'
  }
];

const categories = [
  'All services',
  'Design',
  'Technology',
  'Home & repairs',
  'Photography'
];

const formatPrice = value => `₦${value.toLocaleString('en-NG')}`;

export default function ServicesPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All services');
  const [location, setLocation] = useState('All cities');
  const [budget, setBudget] = useState('₦15,000 – ₦150,000');
  const [available, setAvailable] = useState(true);
  const [rated, setRated] = useState(true);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [delivery, setDelivery] = useState('Remote & on-site');
  const [sort, setSort] = useState('Recommended');
  const [applied, setApplied] = useState(null);
  const [selected, setSelected] = useState(null);
  const [requestSent, setRequestSent] = useState(false);

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();

    let list = providers.filter(provider => {
      const matchesSearch = [
        provider.title,
        provider.category,
        provider.seller,
        provider.location,
        provider.description
      ].join(' ').toLowerCase().includes(search);

      const matchesCategory =
        category === 'All services' || provider.category === category;

      if (!applied) {
        return matchesSearch && matchesCategory;
      }

      const min = applied.budget === 'Any budget'
        ? 0
        : Number(applied.budget.match(/[\d,]+/g)?.[0]?.replace(/,/g, '') || 0);

      const max = applied.budget === 'Any budget'
        ? Infinity
        : Number(applied.budget.match(/[\d,]+/g)?.[1]?.replace(/,/g, '') || Infinity);

      const matchesLocation =
        applied.location === 'All cities' ||
        provider.location.includes(applied.location);

      const matchesBudget = provider.price >= min && provider.price <= max;
      const matchesDelivery =
        applied.delivery === 'Remote & on-site' ||
        provider.delivery === applied.delivery;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesBudget &&
        matchesDelivery &&
        (!applied.available || provider.available) &&
        (!applied.rated || provider.rating >= 4) &&
        (!applied.verifiedOnly || provider.verified)
      );
    });

    if (sort === 'Price: low to high') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === 'Price: high to low') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sort === 'Top rated') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [query, category, applied, sort]);

  const applyFilters = () => {
    setApplied({
      location,
      budget,
      available,
      rated,
      verifiedOnly,
      delivery
    });
  };

  const clearFilters = () => {
    setQuery('');
    setCategory('All services');
    setLocation('All cities');
    setBudget('₦15,000 – ₦150,000');
    setAvailable(false);
    setRated(false);
    setVerifiedOnly(false);
    setDelivery('Remote & on-site');
    setSort('Recommended');
    setApplied(null);
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.intro}>
          <h1>Good people. Great work.</h1>
          <div className={styles.eyebrow}>04 Services / Services search</div>
          <p>
            Find skilled local providers with clear packages and real project
            context.
          </p>

          <label className={styles.search}>
            <Search size={17} aria-hidden="true" />
            <input
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder={'Search services\nBrand design, websites, home repairs...'}
              aria-label="Search services"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')}>
                Clear
              </button>
            )}
          </label>
        </header>

        <nav className={styles.tabs} aria-label="Service categories">
          {categories.map(item => (
            <button
              key={item}
              className={category === item ? styles.activeTab : ''}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className={styles.rule} />

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <h2>Refine your results</h2>

            <label className={styles.field}>
              <span>Location</span>
              <select
                value={location}
                onChange={event => setLocation(event.target.value)}
              >
                <option>All cities</option>
                <option>Lagos</option>
                <option>Abuja</option>
                <option>Port Harcourt</option>
              </select>
            </label>

            <label className={styles.field}>
              <span>Budget range</span>
              <select
                value={budget}
                onChange={event => setBudget(event.target.value)}
              >
                <option>₦15,000 – ₦150,000</option>
                <option>₦15,000 – ₦50,000</option>
                <option>₦50,000 – ₦150,000</option>
                <option>Any budget</option>
              </select>
            </label>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={available}
                onChange={event => setAvailable(event.target.checked)}
              />
              <span>Available this week</span>
            </label>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={rated}
                onChange={event => setRated(event.target.checked)}
              />
              <span>Rated 4 stars &amp; above</span>
            </label>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={event => setVerifiedOnly(event.target.checked)}
              />
              <span>Identity verified only</span>
            </label>

            <label className={styles.field}>
              <span>Delivery mode</span>
              <select
                value={delivery}
                onChange={event => setDelivery(event.target.value)}
              >
                <option>Remote &amp; on-site</option>
                <option>Remote</option>
                <option>On-site</option>
              </select>
            </label>

            <button className={styles.apply} onClick={applyFilters}>
              Apply filters
            </button>

            <button className={styles.clear} onClick={clearFilters}>
              Clear filters
            </button>
          </aside>

          <section className={styles.results} aria-label="Service providers">
            <div className={styles.resultsBar}>
              <span>
                Showing {results.length} curated providers · Illustrative results
              </span>

              <label className={styles.sort}>
                <span>Sort:</span>
                <select
                  value={sort}
                  onChange={event => setSort(event.target.value)}
                  aria-label="Sort services"
                >
                  <option>Recommended</option>
                  <option>Top rated</option>
                  <option>Price: low to high</option>
                  <option>Price: high to low</option>
                </select>
              </label>
            </div>

            <div className={styles.grid}>
              {results.map(provider => (
                <article className={styles.card} key={provider.id}>
                  <div className={styles.artwork}>
                    {provider.id === 1 ? (
                      <img src={provider.image} alt="Creative professional working on a design project" />
                    ) : (
                      <div className={styles.artworkPlaceholder}>
                        <strong>{provider.label}</strong>
                        <span>{provider.description}</span>
                      </div>
                    )}
                  </div>

                  <div className={styles.cardContent}>
                    <div
                      className={
                        provider.verified
                          ? styles.verified
                          : styles.pending
                      }
                    >
                      {provider.verified ? (
                        <CheckCircle2 size={12} />
                      ) : (
                        <span aria-hidden="true">◷</span>
                      )}
                      {provider.advertised
                        ? 'Advertised · Identity verified'
                        : provider.verified
                          ? 'Identity verified'
                          : 'Verification pending'}
                    </div>

                    <h2>{provider.title}</h2>

                    <p className={styles.meta}>
                      {provider.seller} · {provider.location}
                      {provider.delivery === 'Remote' ? ' / Remote' : ''}
                    </p>

                    <p className={styles.rating}>
                      ★ {provider.rating.toFixed(1)} · {provider.reviews} reviews
                    </p>

                    <strong className={styles.price}>
                      From {formatPrice(provider.price)}
                    </strong>

                    <button
                      className={styles.view}
                      onClick={() => {
                        setSelected(provider);
                        setRequestSent(false);
                      }}
                    >
                      View service <ArrowUpRight size={14} />
                    </button>
                  </div>
                </article>
              ))}

              {results.length === 0 && (
                <div className={styles.empty}>
                  No services match these filters. Try another search or clear
                  your filters.
                </div>
              )}
            </div>

            <div className={styles.status}>
              <span>State example · Loading providers</span>
              <p>
                Refreshing availability. Your filters stay in place; provider
                cards remain readable.
              </p>
            </div>
          </section>
        </div>
      </div>

      <footer className={styles.footer}>
        <span>© KHUB · Services · Illustrative marketplace content</span>
        <span>Trust &amp; safety / Contact support</span>
      </footer>

      {selected && (
        <div
          className={styles.overlay}
          onMouseDown={event => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <section
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-detail-title"
          >
            <button
              className={styles.modalClose}
              onClick={() => setSelected(null)}
              aria-label="Close service details"
            >
              ×
            </button>

            {selected.id === 1 ? (
              <img
                className={styles.modalImage}
                src={selected.image}
                alt="Creative professional working"
              />
            ) : (
              <div className={styles.modalArtwork}>
                <strong>{selected.label}</strong>
                <span>{selected.description}</span>
              </div>
            )}

            <div className={styles.eyebrow}>SERVICES / PROVIDER DETAILS</div>
            <h2 id="service-detail-title">{selected.title}</h2>
            <p>
              {selected.seller} · {selected.location} · {selected.delivery}
            </p>
            <p>{selected.description}</p>
            <p className={styles.modalRating}>
              ★ {selected.rating.toFixed(1)} · {selected.reviews} reviews
              {selected.verified ? ' · Identity verified' : ''}
            </p>
            <strong className={styles.modalPrice}>
              From {formatPrice(selected.price)}
            </strong>

            {requestSent ? (
              <div className={styles.requestSuccess}>
                Your enquiry has been prepared. This demo does not send it to
                the provider yet.
              </div>
            ) : (
              <button
                className={styles.apply}
                onClick={() => setRequestSent(true)}
              >
                Contact provider
              </button>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
