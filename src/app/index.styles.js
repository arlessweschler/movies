// CSS Framework (first, for easy overriding if need to)
import '@/assets/css/bootstrap/index.scss';

// Common app styles
import '@/assets/css/common.scss';

// Misc. styles for vendor packages 
import '@react-image-gallery/styles/css/image-gallery.css';

/* Preventing FOUC for Server-side rendering.
This ensures that the icon CSS is loaded immediately before attempting to render icons*/
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

/* Prevent fontawesome from dynamically adding its css since we did it manually above */
config.autoAddCss = false;