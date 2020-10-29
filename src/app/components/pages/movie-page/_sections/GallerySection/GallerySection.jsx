import './GallerySection.scss';

import React, { Fragment } from 'react';
import PT from 'prop-types';
import b_ from 'b_';
import cn from 'classnames';

import { withTranslation } from 'react-i18next';
import { withMDetailsContext } from 'app_contexts';
import { TMDB_IMAGE_URL } from 'app_config';
import { isNotEmpty } from 'app_services/UtilsService';

function GallerySection({ t, cls_base, transparent, context }) {
  const { images } = context;
  // console.warn('-- GallerySection, images:', images);

  if (!images || images.length < 1) return null;

  const b = b_.B({ modSeparator: '--' }).with(cls_base);

  return (
    <Fragment>
      {
        isNotEmpty(images)
          ?
          <section className={cn(b('section', { "is-transparent": transparent }), 'border-top pt-3')}>
            <div className="row">
              <h2>
                {t('movie_details.images.section_label')}:
              </h2>
            </div>

            <div className={cn(b('gallery'), 'row')}>
              {images.map((image, index) => (
                <img
                  key={index}
                  className="gallery-image"
                  src={`${TMDB_IMAGE_URL.small + image.file_path}`}
                />
              ))}
            </div>
          </section>
          : ''
      }

    </Fragment>
  );
};

GallerySection.propTypes = {
  t: PT.func.isRequired,
  cls_base: PT.string.isRequired,
  transparent: PT.bool.isRequired,

  context: PT.shape({
    images: PT.array.isRequired
  }).isRequired
};

export default
  withTranslation()
    (withMDetailsContext(GallerySection));