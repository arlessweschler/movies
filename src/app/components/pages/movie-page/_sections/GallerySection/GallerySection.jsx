import './GallerySection.scss';

import React from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';
import ImageGallery from 'react-image-gallery';

import { withTranslation } from 'react-i18next';
import { withMDetailsContext } from 'app_contexts';
import { TMDB_IMAGE_URL } from 'app_config';
import { isNotEmpty } from 'app_services/UtilsService';
import { Section } from 'app_components/pages/movie-page/_sections';

function GallerySection({ t, transparent = false, context }) {
  const { images, cls_base } = context;
  // console.warn('-- GallerySection, images:', images);

  if (!images || images.length < 1) return null;

  const b = b_.B({ modSeparator: '--' }).with(cls_base);

  const imagesForGallery = images.map(img => ({
    original: TMDB_IMAGE_URL.original + img.file_path,
    thumbnail: TMDB_IMAGE_URL.small + img.file_path
  }));

  return (isNotEmpty(images) &&
    <Section
      cls="border-top pt-3"
      {...{ transparent }}
    >
      <div className="row">
        <h2>
          {t('movie_details.images.section_label')}
          {':'}
        </h2>
      </div>

      <div className={cn(b('gallery'), 'row')}>
        {/*               {images.map((image, index) => (
        <img
          key={index}
          className="gallery-image"
          src={`${TMDB_IMAGE_URL.small + image.file_path}`}
        />
      ))} */}
        <ImageGallery items={imagesForGallery} />
      </div>
    </Section>);
}

GallerySection.propTypes = {
  t: PT.func.isRequired,
  transparent: PT.bool,

  context: PT.shape({
    cls_base: PT.string.isRequired,
    images: PT.array.isRequired
  }).isRequired
};

export default withTranslation()(withMDetailsContext(GallerySection));