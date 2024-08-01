/* eslint-disable indent */
import { useSelector } from 'react-redux';
import {
    FaSquareInstagram,
    FaSquareYoutube,
    FaSquareXTwitter,
    FaFacebook,
} from 'react-icons/fa6';
import { selectCurrentArtistInfo } from '../CurrentArtist/store/currentArtistSlice';

import './CurrentArtistAbout.scss';

const CurrentArtistAbout = () => {
    const artistInfo = useSelector(selectCurrentArtistInfo);

    const renderContent = () => {
        const { about, social } = artistInfo[0];

        return (
            <div className="artist-about">
                <h1 className="artist-about__title">About the Artist</h1>
                <p className="artist-about__text">
                    {about ? about : 'there is no information yet'}
                </p>
                <div className="artist-about__social">
                    <h2 className="artist-about__social-title">Social media</h2>
                    <ul className="artist-about__social-list">
                        {social
                            ? social.map((socialJSON, i) => {
                                  const parseSocialJSON =
                                      JSON.parse(socialJSON);
                                  const socialName =
                                      Object.keys(parseSocialJSON)[0];
                                  const socialLink =
                                      parseSocialJSON[socialName];

                                  switch (socialName) {
                                      case 'instagram':
                                          return (
                                              <li
                                                  className="artist-about__social-item"
                                                  key={i}
                                                  title="Instagram"
                                              >
                                                  <a
                                                      className="artist-about__social-link"
                                                      href={socialLink}
                                                  >
                                                      <FaSquareInstagram />
                                                  </a>
                                              </li>
                                          );
                                      case 'facebook':
                                          return (
                                              <li
                                                  className="artist-about__social-item"
                                                  key={i}
                                                  title="Facebook"
                                              >
                                                  <a
                                                      className="artist-about__social-link"
                                                      href={socialLink}
                                                  >
                                                      <FaFacebook />
                                                  </a>
                                              </li>
                                          );
                                      case 'x':
                                          return (
                                              <li
                                                  className="artist-about__social-item"
                                                  key={i}
                                                  title="X"
                                              >
                                                  <a
                                                      className="artist-about__social-link"
                                                      href={socialLink}
                                                  >
                                                      <FaSquareXTwitter />
                                                  </a>
                                              </li>
                                          );
                                      case 'youtube':
                                          return (
                                              <li
                                                  className="artist-about__social-item"
                                                  key={i}
                                                  title="Youtube"
                                              >
                                                  <a
                                                      className="artist-about__social-link"
                                                      href={socialLink}
                                                  >
                                                      <FaSquareYoutube />
                                                  </a>
                                              </li>
                                          );
                                  }
                              })
                            : 'there is no social media yet'}
                    </ul>
                </div>
            </div>
        );
    };

    return artistInfo && renderContent();
};

export default CurrentArtistAbout;
