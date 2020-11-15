import './GallerySection.scss';

import React from 'react';
import PT from 'prop-types';
import ImageGallery from 'react-image-gallery';
import { withTranslation } from 'react-i18next';

import { TMDB_IMAGE_URL } from '@/settings/tmdb';
import { isNotEmpty } from '@/services/UtilsService';
import { withMDetailsContext } from '@/contexts';
import { Section } from '@/markup';

function GallerySection({ t, context }) {
  const { images } = context;

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
        <ImageGallery {...{ items }} />
      </div>
    </Section>);
}

GallerySection.propTypes = {
  t: PT.func.isRequired,

  context: PT.shape({
    images: PT.array.isRequired
  }).isRequired
};

export default withTranslation()(withMDetailsContext(GallerySection));