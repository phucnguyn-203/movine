import React from 'react';

import './cast.scss';
import '../../scss/grid.scss';

const Cast = ({ cast }) => {
    return (
        <div className="col l-2-4 m-4 c-6">
            <div className="cast">
                <div className="cast__profile-path">
                    <img src={`${process.env.REACT_APP_IMAGE_ENDPOINT}${cast?.profile_path}`} alt="profile_image" />
                </div>
                <div className="cast__info">
                    <p className="cast__name">{cast?.original_name}</p>
                    <p className="cast__character">{cast?.character}</p>
                </div>
            </div>
        </div>
    );
};

export default Cast;
