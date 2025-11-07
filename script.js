async function initRating() {
    if (!window.google || !google.maps || !google.maps.importLibrary) {
      setTimeout(initRating, 100);
      return;
    }
  
    const placeId = 'ChIJuySUo6Nqu0cRomuCVcPdK80';
    const { Place } = await google.maps.importLibrary('places');
    const ratingScore = document.querySelector('#ratingScore');
    const ratingCount = document.querySelector('#ratingCount');
    const ratingContainer = document.querySelector('.rating');
    if (!ratingContainer) return;
  
    try {
      const place = new Place({
        id: placeId,
        requestedLanguage: 'de',
      });
  
      await place.fetchFields({
        fields: ['rating', 'userRatingCount', 'googleMapsURI'],
      });
  
      const rating = place.rating ?? 0;
      const count  = place.userRatingCount ?? 0;
  
      // Zahlen hübsch formatieren (z. B. 4,9)
      const nf1 = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 });
      const nf0 = new Intl.NumberFormat('de-DE');
  
      ratingScore.textContent = nf1.format(rating);
      ratingCount.textContent = nf0.format(count);
  
      // Sterne füllen
      ratingContainer.style.setProperty('--rating', rating);
  
      // Bei Klick → Google Maps Seite
      ratingContainer.addEventListener('click', () => {
        const url = place.googleMapsURI ||
          `https://www.google.com/maps/search/?api=1&query_place_id=${placeId}`;
        window.open(url, '_blank');
      });
  
    } catch (e) {
      console.error("Fehler beim Rating:", e);
    }
  }
  
  window.addEventListener('load', initRating);
  

  function initMarquee() {
    const track = document.getElementById('marqueeTrack');
    if (!track) return;
  
    // Erste Serie der Bilder holen
    const originals = Array.from(track.children);
  
    // Kopien der Bilder erstellen und anhängen
    originals.forEach(img => {
      track.appendChild(img.cloneNode(true));
    });
  
    // Warten bis alle Bilder geladen sind
    const images = track.querySelectorAll('img');
    let loadedCount = 0;
  
    images.forEach(img => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.addEventListener('load', () => {
          loadedCount++;
          if (loadedCount === images.length) {
            startMarquee(track, originals);
          }
        });
      }
    });
  
    // Falls alle Bilder schon geladen
    if (loadedCount === images.length) {
      startMarquee(track, originals);
    }
  }
  
  function startMarquee(track, originals) {
    // Abstand (Gap) aus CSS auslesen
    const gap = parseFloat(getComputedStyle(track).getPropertyValue('--gap')) || 0;
  
    // Breite der ersten Serie berechnen
    let seriesWidth = 0;
    originals.forEach(el => {
      seriesWidth += el.getBoundingClientRect().width;
    });
    seriesWidth += gap * (originals.length - 1);
  
    // CSS-Variablen für Animation setzen
    track.style.setProperty('--marquee-end', `${-seriesWidth}px`);
  
    // Geschwindigkeit in Pixel pro Sekunde → Einfach ein Wert!
    const pxPerSec = 30;
    const duration = seriesWidth / pxPerSec;
  
    track.style.setProperty('--marquee-duration', `${duration}s`);
  }
  
  window.addEventListener('load', initMarquee);
  