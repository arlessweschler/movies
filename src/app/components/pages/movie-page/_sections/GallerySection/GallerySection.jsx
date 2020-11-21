import './GallerySection.scss';

import React from 'react';
import PT from 'prop-types';
import ImageGallery from 'react-image-gallery';
import { withTranslation } from 'react-i18next';

import { asyncShape } from '@/types';
import { TMDB_IMAGE_URL } from '@/settings/tmdb';
import { Section } from '@/markup';

function GallerySection({ t, images = {} }) {
  const { data } = images;

  if (!data || data.length < 1) return null;

  const items = data.map((img) => ({
    original: TMDB_IMAGE_URL.original + img.file_path,
    thumbnail: TMDB_IMAGE_URL.small + img.file_path
  }));

  return (
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
          items={items}
          lazyLoad={true}
        />
      </div>
    </Section>
  );
}

GallerySection.propTypes = {
  t: PT.func.isRequired,
  images: asyncShape('array')
};

export default withTranslation()(GallerySection);