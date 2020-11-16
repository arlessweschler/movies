import './GallerySection.scss';

import React from 'react';
import PT from 'prop-types';
import ImageGallery from 'react-image-gallery';
import { withTranslation } from 'react-i18next';

import { TMDB_IMAGE_URL } from '@/settings/tmdb';
import { isNotEmpty } from '@/services/UtilsService';
import { Section } from '@/markup';

function GallerySection({ t, images }) {
  if (!images || images.length < 1) return null;

  const items = images.map((img) => ({
    original: TMDB_IMAGE_URL.original + img.file_path,
    thumbnail: TMDB_IMAGE_URL.small + img.file_path
  }));

  return (isNotEmpty(images) &&
    <Section
      cls="border-top pt-3"
      transparent={false}
    >
      <div className="row">
        <h2>
          {t('movie_details.images.section_label')}
          {':'}
        </h2>
      </div>

      <div className="row">
        <ImageGallery
          {...{ items }}
          lazyLoad={true}
        />
      </div>
    </Section>);
}

GallerySection.propTypes = {
  t: PT.func.isRequired,
  images: PT.array.isRequired
};

export default withTranslation()(GallerySection);