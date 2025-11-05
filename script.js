async function initRating() {
    const placeId = 'ChIJuySUo6Nqu0cRomuCVcPdK80';
    const { Place } = await google.maps.importLibrary('places');
    const ratingScore = document.querySelector('#ratingScore');
    const ratingCount = document.querySelector('#ratingCount');
    const ratingContainer = document.querySelector('.rating');
    if (!ratingContainer || !ratingScore || !ratingCount) return;
  
    try {
      const place = new Place({
        id: placeId,
      });
  
      await place.fetchFields({
        fields: ['rating', 'userRatingCount', 'googleMapsURI', 'displayName'],
      });
  
      const rating = place.rating ?? 0;
      const count = place.userRatingCount ?? 0;
  
      // Zahlen formatiert (4,9 statt 4.9)
      const nf = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 });
      ratingScore.textContent = nf.format(rating);
      ratingCount.textContent = String(count);
  
      // CSS-Variable für Sternfüllung (★★★★★)
      ratingContainer.style.setProperty('--rating', String(rating));
  
      // Klick öffnet Google
      ratingContainer.addEventListener('click', () => {
        const url =
          place.googleMapsURI ||
          `https://www.google.com/maps/search/?api=1&query_place_id=${placeId}`;
        window.open(url, '_blank', 'noopener');
      });
    } catch (err) {
      console.error('Fehler beim Laden der Bewertung:', err);
    }
  }
  
window.addEventListener('load', initRating);